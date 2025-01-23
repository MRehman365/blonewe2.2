const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminAuthModal = require("../../modals/adminAuthModal");

class AdminsAuthController {
    admin_register = async(req, res) => {
        try {
            const { name, email, phone, password } = req.body;

            const existingUser = await adminAuthModal.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await adminAuthModal.create({
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

    admin_login = async (req, res) => {
        const { email, password} = req.body;

        try {
            const user = await adminAuthModal.findOne({ email });
            if(!user){
                return res.status(400).json({ message: "User not found" });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                return res.status(400).json({ message: "Invalid password" });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'rehmanarshad', { expiresIn: '7d' });
            return res.status(200).json({ message: "Login successful", success: true, token, user: { id: user.id, name: user.name, phone: user.phone, email: user.email } });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    admin_logout = async (req, res) => {
        res.clearCookie("customerToken");
        return res.status(200).json({ message: "Logout successful", success: true });
    }

    getadminById = async (req, res) => {
        try {
            const { id } = req.body;
            const user = await adminAuthModal.findById(id);
            return res.status(200).json({ message: "User get successfully", user });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new AdminsAuthController()