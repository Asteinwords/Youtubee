import User from "../Models/Auth.js";  // Correctly import the User model
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    const { email } = req.body;
    try {
        const existingUser = await User.findOne({ email }); // Corrected variable name
        if (!existingUser) {
            try {
                const newUser = await User.create({ email });
                const token = jwt.sign(
                    { email: newUser.email, id: newUser._id },
                    process.env.JWT_secret,
                    { expiresIn: "1h" }
                );
                res.status(200).json({ result: newUser, token });
            } catch (error) {
                res.status(500).json({ message: "Something went wrong..." });
                return;
            }
        } else {
            const token = jwt.sign(
                { email: existingUser.email, id: existingUser._id },
                process.env.JWT_secret,
                { expiresIn: "1h" }
            );
            res.status(200).json({ result: existingUser, token });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong..." });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Corrected variable name
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
