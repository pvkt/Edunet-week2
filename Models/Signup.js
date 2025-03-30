const mongoose = require("mongoose");

const signupSchema = mongoose.Schema({
    name:  { type: String, required: true },
    fatherName: { type: String, required: true },
    dob: { type: String, required: true },
    branch: { type: String, required: true },
    rollNo: { type: String, required: true, unique: true },
    section: { type: String, required: true,
        validate: {
            validator: function(v) {
              return /^[A-Za-z]$/.test(v); // Only allows a single alphabet character (case insensitive)
            },
            message: props => `${props.value} is not a valid section!`
          }
     },
    address: { type: String, required: true },
    mobileNo: { type: Number, required: true },
    email: { type: String, 
        required: true,
        unique: true, // Ensures email uniqueness
        lowercase: true, // Store emails in lowercase for consistency
        trim: true, // Remove leading/trailing whitespace
        match: [
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            'Please provide a valid email address',
          ], // Basic email validation
     },
    password: { type: String, required: true, minlength: 8 },
    createdAt: {type: Date, default: Date.now},
});

const Signup = mongoose.model("Signup", signupSchema);
module.exports = Signup;



