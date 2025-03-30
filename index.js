const express = require('express');  
const mongoose = require('mongoose'); // importing mongoose library
const app = express(); 
const port = 3000;
const Product = require("./Models/Product"); //! importing the product model page
app.use(express.json());  //importing json (Middleware to parse JSON requests)
const Signup = require("./Models/Signup");  //! importing the signup model page
const bcrypt = require("bcryptjs"); //! For password hashing
const session = require("express-session"); //! session based 


//!========================GET REQUEST===============================
app.get('/', (req, res) => {  
  res.send('Welcome to the Testing Site'); 
})


//!===========================POST REQUEST (API)===============================
app.post("/add_product_data",async (req,res) => {   // defining the route
  try{
    const product = await Product.create(req.body); // Handling the Request (insert data into the database.)
    res.json(product);   // Sending a Response
    console.log("Data Inserted");
  }catch(error){
    res.send("Data not Inserted");
  }
});


//!====================GET API (to fetch data from the database) (GET Request)======================================
app.get("/get_product_data",async (req,res) => {
  try{
    const product = await Product.find({});  // finding the product (find = fetch the data)
    res.json(product);
    console.log("Data Fetched");
  }catch(error){
    res.send("Data not Fetched");
  }
})


//!===========================Users signup POST Request API===============================
app.post("/signup", async (req, res) => {
  try {
    const { name, fatherName, dob, branch, rollNo, section, address, mobileNo, email, password } = req.body;

    // Check if user already exists
    const existingUser = await Signup.findOne({ $or: [{ email }, { mobileNo }] });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with all required fields
    const newUser = await Signup.create({
      name,
      fatherName,
      dob,
      branch,
      rollNo,
      section,
      address,
      mobileNo,
      email,
      password: hashedPassword, // Store hashed password
    });

    res.status(201).json({ message: "User Created Successfully", user: newUser });
    console.log("User Created");
  } catch (error) {
    console.error("Error while creating user:", error);
    res.status(500).json({ error: "User Not Created", details: error.message });
  }
});

//!==================Below Things to do for the login page (login , profile, logout)=================

//! ✅ Session Middleware Configuration
app.use(
  session({
    secret: "my_secret_key", // Change this to a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set `secure: true` if using HTTPS
  })
);


//! ✅ Login API (Session-Based)
app.post("/login", async (req, res) => {
  try {
    const { emailOrMobile, password } = req.body;

    // Find user by email or mobile number
    const user = await Signup.findOne({ 
      $or: [{ email: emailOrMobile }, { mobileNo: emailOrMobile }] 
    });

    if (!user) {
      return res.status(404).json({ error: "User/Password not found" }); //for security 
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "User/Password not found" });
    }

    // Store user session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      mobileNo: user.mobileNo,
    };

    res.status(200).json({ message: "Login successful", user: req.session.user });
    console.log("User Logged In:", req.session.user.email || req.session.user.mobileNo);
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});


//! ✅ Protected Route (Check if User is Logged In)
app.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Unauthorized, please log in" });
  }
  res.status(200).json({ message: "Profile Accessed", user: req.session.user });
});


//! ✅ Logout API (Destroy Session)
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.json({ message: "User logged out successfully" });
  });
});


//!==================starts an Express.js server & listen on port========================================
app.listen(port, () => { 
  console.log(`Example app listening on port ${port}`);
});

//!==========================connect to the mongo database================================
mongoose.connect("mongodb+srv://<username:password@databaseName>.jealatc.mongodb.net/")// change mongodb url 
.then(()=>{
    console.log("connected to MongoDB");  //connected message
}).catch((err)=>{
    console.log("Error connecting to MongoDB",err); //if any error
});

