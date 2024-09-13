import jwt from "jsonwebtoken";

// Generate JWT Token and set it as an HTTP-only cookie
const generateTokenAndSetCookie = (userId, res) => {
   
	console.log("JWT_SECRET:", process.env.JWT_SECRET);

	const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});

	// Set the token as a cookie (HTTP-only to prevent XSS attacks)
	res.cookie("jwt", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",  // Ensure secure cookies in production
		sameSite: "strict",
		maxAge: 3600000,  // 1 hour
	});

	return token;
};

export default generateTokenAndSetCookie;
