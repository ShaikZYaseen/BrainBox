import { Request, Response, NextFunction } from 'express';
import { User } from '../Models/user';
import jwt from 'jsonwebtoken'; // Ensure you have this imported

// Login Controller
const loginController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { email, password } = req.body;

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
            user,
            message: "Login successful",
            token,
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Signup Controller
const signupController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({ message: "Please provide username, email, and password." });
        return;
    }

    try {
        const userExists = await User.findOne({ email }).exec();
        if (userExists) {
            res.status(400).json({ message: "Email already exists." });
            return;
        }

        const newUser = new User({
            username,
            email,
            password,
        });

        const user = await newUser.save();

        const token = newUser.getJWTToken();

        res.setHeader("Authorization", `Bearer ${token}`);

        res.status(201).json({
            success: true,
            user,
            message: "User registered successfully",
            token,
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Check if logged in
 const isLoggedin = async (req: Request, res: Response): Promise<any> => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

        const user = await User.findById(decoded.id).exec();
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized: Invalid token." });
        }

        // Respond with success
        return res.status(200).json({ success: true, user: { id: user.id, email: user.email } });
    } catch (error) {
        console.error("Error in isLoggedin middleware:", error);
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token or expired session." });
    }
};



const logoutController = (req: Request, res: Response): void => {
    try {
        // Clear the Authorization header or cookies depending on implementation
        res.setHeader("Authorization", ""); // Clear Authorization header
        res.clearCookie("token", { httpOnly: true, secure: true }); // Clear token cookie if used

        res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export {
    loginController,
    signupController,
    isLoggedin,
    logoutController
};
