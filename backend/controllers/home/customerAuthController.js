const customerModel = require("../../models/customerModel");
const otpModel = require("../../models/otpModel.js");
const { responseReturn } = require("../../utiles/response");
const { createToken } = require("../../utiles/tokenCreate");
const sellerCustomerModel = require("../../models/chat/sellerCustomerModel");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

class customerAuthController {
  customer_register = async (req, res) => {
    const { name, phone, email, password } = req.body;

    try {
      const customer = await customerModel.findOne({ email });
      if (customer) {
        responseReturn(res, 404, { error: "Email already exits" });
      } else {
        const createCustomer = await customerModel.create({
          name: name.trim(),
          email: email.trim(),
          phone: phone,
          password: await bcrypt.hash(password, 10),
          method: "menualy",
        });
        await sellerCustomerModel.create({
          myId: createCustomer.id,
        });
        const token = await createToken({
          id: createCustomer.id,
          name: createCustomer.name,
          email: createCustomer.email,
          method: createCustomer.method,
        });
        res.cookie("customerToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        responseReturn(res, 201, { message: "Register success", token });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  customer_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const customer = await customerModel
        .findOne({ email })
        .select("+password");
      if (customer) {
        const match = await bcrypt.compare(password, customer.password);
        if (match) {
          const token = await createToken({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            method: customer.method,
          });
          res.cookie("customerToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 201, { message: "Login success", token });
        } else {
          responseReturn(res, 404, { error: "Password wrong" });
        }
      } else {
        responseReturn(res, 404, { error: "Email not found" });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  customer_logout = async (req, res) => {
    res.cookie("customerToken", "", {
      expires: new Date(Date.now()),
    });
    responseReturn(res, 200, { message: "Logout success" });
  };

  sendOtp = async (req, res) => {
    const { email } = req.body;
    // console.log("email", email);
    const user = await customerModel.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    console.log(user.name, 'This is user')

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Save OTP in DB
    await otpModel.findOneAndUpdate(
      { email },
      { otp, createdAt: Date.now() },
      { upsert: true, new: true }
    );

    // Send OTP email
    const mailOptions = {
      to: email,
      from: process.env.EMAIL,
      subject: "Your Password Reset OTP",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #dddddd; border-radius: 5px; background-color: #f9f9f9;">
          <h2 style="color: #1c3058; text-align: center;">Password Reset OTP</h2>
          <p style="font-size: 16px; color: #333333;">Hello, ${user.name}</p>
          <p style="font-size: 16px; color: #333333;">
            You requested a password reset. Please use the following OTP (One-Time Password) to reset your password. 
            <strong style="display: block; font-size: 24px; margin: 20px 0; text-align: center; color: #1c3058;">${otp}</strong>
            This OTP will expire in <strong>2 minutes</strong>.
          </p>
          <p style="font-size: 16px; color: #333333;">If you did not request this change, please ignore this email.</p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="https://yourwebsite.com" style="text-decoration: none; color: #ffffff; background-color: #1c3058; padding: 10px 20px; border-radius: 5px;">Visit Our Website</a>
          </div>
          <p style="font-size: 12px; color: #999999; margin-top: 30px; text-align: center;">
            © ${new Date().getFullYear()} Your Company Name. All rights reserved.
          </p>
        </div>
      `,
    };
    

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Failed to send OTP" });
      } else {
        res.status(200).json({ message: "OTP sent to your email" });
      }
    });
  };
  verifyOtpAndResetPassword = async (req, res) => {
    const { email, otp, npassword } = req.body;
    const otpRecord = await otpModel.findOne({ email: email, otp: otp });
    if (!otpRecord)
      return res.status(400).json({ error: "Invalid or expired OTP" });

    // Update password
    const hashedPassword = await bcrypt.hash(npassword, 10);
    await customerModel.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );

    // Delete the OTP record after successful password reset
    await otpModel.findOneAndDelete({ email, otp });

    responseReturn(res, 200, { message: "Password updated successfully" });
  };
}

module.exports = new customerAuthController();
