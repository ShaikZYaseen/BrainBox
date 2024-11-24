import { Request, Response, NextFunction } from 'express';
import { User } from '../Models/user';

// Login Controller
 const loginController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        res.status(400).json({ message: "Please provide both email and password." });
        return;
    }

    try {
        const user = await User.findOne({ email }).exec();
        if (!user) {
            res.status(401).json({ message: "Invalid credentials." });
            return;
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid credentials." });
            return;
        }

        const token = user.getJWTToken();

        res.setHeader("Authorization", `Bearer ${token}`);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
        });
    } catch (error) {
        return res.status(500).json({message:"Internal server error"});
    }
};

// Signup controller
const signupController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { username, email, phone, password, image } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({ message: "Please provide username, email, and password." });
        return;
    }

    try {
        const userExists = await User.findOne({ $or: [{ email }, { phone }] }).exec();
        if (userExists) {
            res.status(400).json({ message: "Email or phone number already exists." });
            return;
        }

        // Create new user
        const newUser = new User({
            username,
            email,
            phone,
            password, // Password will be hashed before saving
            image,
        });

        // Save the new user
        await newUser.save();

        // Generate JWT token
        const token = newUser.getJWTToken();

        res.setHeader("Authorization", `Bearer ${token}`);

        // Respond with success message and token
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
        });
    } catch (error) {
        return res.status(500).json({message:"Internal server error"});
    }
};


export {
    loginController,
    signupController
}