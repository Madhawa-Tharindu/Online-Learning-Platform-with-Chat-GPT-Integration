import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

// User Registration (Signup)
export const signup = async (req, res) => {
	try {
		const { firstName, lastName, username, email, password, confirmPassword, role } = req.body;

		// Check if passwords match
		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords do not match" });
		}

		// Check if username or email already exists
		const existingUser = await User.findOne({ $or: [{ username }, { email }] });
		if (existingUser) {
			return res.status(400).json({ error: "Username or Email already exists" });
		}

		// Hash the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create the new user
		const newUser = new User({
			firstName,
			lastName,
			username,
			email,
			password: hashedPassword,
			role,
		});

		// Save the user to the database
		await newUser.save();

		// Generate JWT token and set in response cookie
		const token = generateTokenAndSetCookie(newUser._id, res);

		// Respond with the newly created user and token
		res.status(201).json({
			token, // return the token here
			_id: newUser._id,
			firstName: newUser.firstName,
			lastName: newUser.lastName,
			username: newUser.username,
			email: newUser.email,
			role: newUser.role,
		});
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// User Login
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Find user by email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ error: "Invalid email or password" });
		}

		// Check if password matches
		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid email or password" });
		}

		// Generate JWT token and set in response cookie
		const token = generateTokenAndSetCookie(user._id, res);

		// Respond with user details and token
		res.status(200).json({
			token,  // include the token in the response
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			username: user.username,
			email: user.email,
			role: user.role,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// Get the logged-in user's profile
export const getProfile = async (req, res) => {
	try {
	  // Since `protect` middleware will attach the user to req.user, we can access the user's ID
	  const user = await User.findById(req.user._id).select('-password'); // Do not return the password field
  
	  if (!user) {
		return res.status(404).json({ message: 'User not found' });
	  }
  
	  res.status(200).json(user);
	} catch (error) {
	  console.log('Error fetching user profile:', error.message);
	  res.status(500).json({ message: 'Server error' });
	}
  };

// User Logout
export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });  // Clear JWT cookie
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};


// extra functions
// Update profile for both user categories (students and instructors)
export const updateProfile = async (req, res) => {
	try {
	  const userId = req.params.id;
	  const { username, password, email } = req.body;
  
	  // Create an object with the fields allowed for update
	  const updates = {};
	  if (username) updates.username = username;
	  if (email) updates.email = email;
	  if (password) {
		// Hash the password before updating
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		updates.password = hashedPassword;
	  }
  
	  // Find the user by ID and update their profile
	  const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
  
	  if (!updatedUser) {
		return res.status(404).json({ message: 'User not found' });
	  }
  
	  res.json({ message: 'Profile updated successfully', user: updatedUser });
	} catch (error) {
	  res.status(500).json({ message: 'Error updating profile', error: error.message });
	}
  };


//to delete student profile  
export const deleteAccount = async (req, res) => {
	try {
	  const userId = req.params.id;
	  const user = await User.findById(userId);
  
	  if (!user) {
		return res.status(404).json({ message: 'User not found' });
	  }
  
	  // Check if the user is a student before allowing deletion
	  if (user.role !== 'student') {
		return res.status(403).json({ message: 'Only students can delete their accounts' });
	  }
  
	  await User.findByIdAndDelete(userId);
	  res.json({ message: 'Account deleted successfully' });
	} catch (error) {
	  res.status(500).json({ message: 'Error deleting account', error: error.message });
	}
};
  