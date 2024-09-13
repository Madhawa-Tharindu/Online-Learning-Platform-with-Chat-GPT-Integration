import pkg from 'jsonwebtoken'; 
const { sign } = pkg;
import User from '../models/user.model.js';

// Register new users
export async function signup(req, res) {
    const { firstName, lastName, username, email, password, role } = req.body;

    try {
        const user = new User({ firstName, lastName, username, email, password, role });
        await user.save();

        // Generate JWT token
        const token = sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Login existing users
export async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT token
        const token = sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Logout users
export async function logout(req, res) {
    try {
        res.cookie("jwt", "", { maxAge: 0 });   // Clear the JWT cookie
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

