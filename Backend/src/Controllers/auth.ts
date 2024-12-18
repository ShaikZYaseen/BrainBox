import { Request, Response, NextFunction } from 'express';
import { User } from '../Models/user';
import jwt from 'jsonwebtoken';

// Login Controller
const loginController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide both email and password."
        });
    }

    try {
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials."
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials."
            });
        }

        const token = user.getJWTToken();

        res.setHeader("Authorization", `Bearer ${token}`);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Signup Controller
const signupController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide username, email, and password."
        });
    }

    try {
        const userExists = await User.findOne({ email }).exec();
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "Email already exists."
            });
        }

        const newUser = new User({
            username,
            email,
            password,
        });

        const user = await newUser.save();

        const token = newUser.getJWTToken();

        res.setHeader("Authorization", `Bearer ${token}`);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Check if logged in
const isLoggedin = async (req: Request, res: Response): Promise<any> => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: No token provided."
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

        const user = await User.findById(decoded.id).exec();
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid token."
            });
        }

        return res.status(200).json({
            success: true,
            user: { id: user.id, email: user.email }
        });
    } catch (error) {
        console.error("Error in isLoggedin middleware:", error);
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Invalid token or expired session."
        });
    }
};

// Logout Controller
const logoutController = async(req: Request, res: Response): Promise<any> => {
    try {
        res.setHeader("Authorization", ""); // Clear Authorization header
        res.clearCookie("token", { httpOnly: true, secure: true }); // Clear token cookie if used

        return res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export {
    loginController,
    signupController,
    isLoggedin,
    logoutController
};
