import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		role: {
			type: String,
			enum: ["student", "instructor"],
			required: true,
		},
	},
	{ timestamps: true }  // Automatically create createdAt and updatedAt fields
);

// // Hash password before saving
// userSchema.pre("save", async function (next) {
// 	if (!this.isModified("password")) return next();
// 	const salt = await bcrypt.genSalt(10);
// 	this.password = await bcrypt.hash(this.password, salt);
// 	next();
// });

// // Compare hashed password for login
// userSchema.methods.matchPassword = async function (enteredPassword) {
// 	return await bcrypt.compare(enteredPassword, this.password);
// };

const User = mongoose.model("User", userSchema);

export default User;
