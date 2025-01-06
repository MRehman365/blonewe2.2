const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require('../../modals/userAuthModal');

class UserAuthController {
    register = async (req, res) => {
        try {
            const { name, email, phone, password } = req.body;

            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await UserModel.create({
                name,
                email,
                phone,
                password: hashedPassword
            });

            // Generate token
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET || 'rehmanarshad',
                { expiresIn: '7d' }
            );

            return res.status(201).json({
                message: "Registration successful",
                token,
                user: { id: user.id, name: user.name, phone: user.phone, email: user.email }
            });

        } catch (error) {
            return res.status(500).json({ message: "Server error" });
        }
    }

    login = async (req, res) => {
        const { email, password} = req.body;

        try {
            const user = await UserModel.findOne({ email });
            if(!user){
                return res.status(400).json({ message: "User not found" });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                return res.status(400).json({ message: "Invalid password" });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'rehmanarshad', { expiresIn: '7d' });
            return res.status(200).json({ message: "Login successful", token, user: { id: user.id, name: user.name, phone: user.phone, email: user.email } });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    logout = async (req, res) => {
        res.clearCookie("customerToken");
        return res.status(200).json({ message: "Logout successful" });
    }

    getUserById = async (req, res) => {
        try {
            const { id } = req.body;
            const user = await UserModel.findById(id);
            return res.status(200).json({ message: "User get successfully", user });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new UserAuthController();
