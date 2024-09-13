import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true }, // Duration in hours
    category: { type: String, required: true },
    content: [
      {
        moduleTitle: { type: String, required: true },
        moduleContent: { type: String, required: true },
      }
    ],
    studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', CourseSchema);

export default Course;
