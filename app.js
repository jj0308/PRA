require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const app = express();
const mongoose = require('mongoose');



app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept", "Authorization");
  next();
});
// Logic goes here

// importing user context
const User = require("./model/user");


const admin_auth = require("./middleware/admin_auth");
// Register
app.post("/register", admin_auth, async (req, res) => {

    // Our register logic starts here
    try {
      // Get user input
      const { first_name, last_name, email, password } = req.body;
        
      // Validate user input
      if (!(email && password && first_name && last_name)) {
        return  res.status(400).send("All input is required");
      }
      if (email != `${email}`.toLocaleLowerCase()) {
        return  res.status(400).send("E-mail must be in lowercase!");
      }
      // check if user already exist
      // Validate if user exist in our database

      const oldUser = await User.findOne({ email });

      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
        administrator: false
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
          // save user token
          user.token = token;
      


  
  
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });

// Login
app.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        return res.status(400).send("All input is required");
      }
      // Validate if user exist in our database

      const user = await User.findOne({ email });
      const token_key = user.administrator ? process.env.ADMIN_TOKEN_KEY : process.env.TOKEN_KEY;
      if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            token_key,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          user.token = token;

  
          // user
          res.status(200).json(user);
        }
      else{
        res.status(400).send("Invalid Credentials");
      }
      
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });

const auth = require("./middleware/auth");

const Course = require("./model/course");
app.post("/course", admin_auth, async(req, res) => {

  // Our register logic starts here
  try {
    // Get user input
    const { name, user_id } = req.body;

    // Validate user input
    if (!(name, user_id)) {
      return res.status(400).send("All input is required");
    }
    if (!user_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("User ID is in wrong format");
    }

    const _id = user_id;
    const user = await User.findById({ _id });

    if (!user) {
      return res.status(409).send("ID doesn't match any user!");
    }
    // Create user in our database
    const course = await Course.create({
      name,
      user_id
    });

    // return new user
    res.status(201).json(course);
  } catch (err) {
    console.log(err);
  }
});

const Notification = require("./model/notification");
app.post("/notification", auth, async(req, res) => {
  
 
  // Our register logic starts here
  try {
    // Get user input
    
    const { name, description, date_expired, user_id, course_id } = req.body;
    const date_created = new Date().toLocaleDateString('en-US');

    // Validate user input
    if (!(name, description, date_expired, user_id, course_id)) {
      return res.status(400).send("All input is required");
    }
    if (!user_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("User ID is in wrong format");
    }
    if (!course_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("Course ID is in wrong format");
    }
    if (date_expired < date_created) {
      return res.status(400).send("Expiration date must be a date from today or later!");
    }
    const user = await User.findOne({ "_id" : user_id });

    if (!user) {
      return res.status(409).send("ID doesn't match any user!");
    }

    const course = await Course.findOne({ "_id" : course_id });
    if (!course) {
      return res.status(409).send("ID doesn't match any course!");
    }


    const notification = await Notification.create({
      name,
      description,
      date_created,
      date_expired,
      user_id,
      course_id
    });
    res.status(201).json(notification);
  } catch (err) {
    console.log(err);
  }
});


// app.post("/create_notification_lecturer", auth, async(req, res) => {

//   // Our register logic starts here
//   try {
//     // Get user input
//     const { name, description, date_expired, user_id, course_id } = req.body;
//     const date_created = new Date().toLocaleDateString('en-US');

//     // Validate user input
//     if (!(name, description, date_expired, user_id, course_id)) {
//       return res.status(400).send("All input is required");
//     }
//     if (!user_id.match(/^[0-9a-fA-F]{24}$/)) {
//       return res.status(400).send("User ID is in wrong format");
//     }
//     if (!course_id.match(/^[0-9a-fA-F]{24}$/)) {
//       return res.status(400).send("Course ID is in wrong format");
//     }
//     if (date_expired < date_created) {
//       return res.status(400).send("Expiration date must be a date from today or later!");
//     }
//     const user = await User.findOne({ "_id" : user_id });
//     if (!user) {
//       return res.status(409).send("ID doesn't match any user!");
//     }

//     const course = await Course.findOne({"id" : course_id, "user_id" : user_id});
//     if (!course) {
//       return res.status(409).send("ID doesn't match any course!");
//     }


//     // Create user in our database
//     const notification = await Notification.create({
//       name,
//       description,
//       date_created,
//       date_expired,
//       user_id,
//       course_id
//     });
//     // return new user
//     res.status(201).json(notification);
//   } catch (err) {
//     console.log(err);
//   }
// });

app.get("/lecturer/:user_id", admin_auth, async (req, res) => {

  try {
    const user_id = req.params.user_id;
    if (!user_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("User ID is in wrong format");
    }

    const user = await User.findOne({ "_id" : user_id });

    if (!user) {
      return res.status(503).send("No user available");
    }
    // return new user
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

app.get("/lecturers", admin_auth, async (req, res) => {

  // Our register logic starts here
  try {
    
    const users = await User.find({ "administrator" : false });

    if (!users) {
      return res.status(503).send("No lecturers available");
    }
    // return new user
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
});

app.get("/courses", admin_auth, async (req, res) => {

  // Our register logic starts here
  try {
    
    const courses = await Course.aggregate([
      {
        $lookup: {
          from: "users",
          let: { userId: { $toObjectId: "$user_id" } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$userId"] }
              }
            },
            {
              $project: {
                full_name: { $concat: ["$first_name", " ", "$last_name"] }
              }
            }
          ],
          as: "user"
        }
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true
        }
      }
    ])

    if (!courses) {
      return res.status(503).send("No courses available");
    }
    // return new user
    res.status(200).json(courses);
  } catch (err) {
    console.log(err);
  }
});

app.get("/notifications", admin_auth, async (req, res) => {

  // Our register logic starts here
  try {
    
    const notifications = await Notification.aggregate([
      {
        $lookup: {
          from: "users",
          let: { userId: { $toObjectId: "$user_id" } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$userId"] }
              }
            },
            {
              $project: {
                full_name: { $concat: ["$first_name", " ", "$last_name"] }
              }
            }
          ],
          as: "user"
        }
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true
        }
      }
    ])
    if (!notifications) {
      return res.status(503).send("No notifications available");
    }
    // return new user
    res.status(200).json(notifications);
  } catch (err) {
    console.log(err);
  }
});

app.get(`/courses/:user_id`, auth, async (req, res) => {

  // Our register logic starts here
  try {
    const user_id = req.params.user_id;
    if (!user_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("User ID is in wrong format");
    }

    const courses = await Course.aggregate([
      {
        $lookup: {
          from: "users",
          let: { userId: { $toObjectId: "$user_id" } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$userId"] }
              }
            },
            {
              $project: {
                full_name: { $concat: ["$first_name", " ", "$last_name"] }
              }
            }
          ],
          as: "user"
        }
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: {
          "user._id": new mongoose.Types.ObjectId(user_id)
        }
      }
    ]);    

    if (!courses) {
      return res.status(503).send("No courses available");
    }
    // return new user
    res.status(200).json(courses);
  } catch (err) {
    console.log(err);
  }
});

app.get(`/course/:course_id`, auth, async (req, res) => {

  // Our register logic starts here
  try {
    const course_id = req.params.course_id;
    if (!course_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("Course ID is in wrong format");
    }

    const course = await Course.findOne({ "_id" : course_id });

    if (!course) {
      return res.status(503).send("No courses available");
    }
    // return new user
    res.status(200).json(course);
  } catch (err) {
    console.log(err);
  }
});

app.get(`/notifications/:user_id`, auth, async (req, res) => {

  // Our register logic starts here
  try {
    const user_id = req.params.user_id;

    if (!user_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("User ID is in wrong format");
    }

    const notifications = await Notification.aggregate([
      {
        $lookup: {
          from: "users",
          let: { userId: { $toObjectId: "$user_id" } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$userId"] }
              }
            },
            {
              $project: {
                full_name: { $concat: ["$first_name", " ", "$last_name"] }
              }
            }
          ],
          as: "user"
        }
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: {
          "user._id": new mongoose.Types.ObjectId(user_id)
        }
      }
    ]);   
    if (!notifications) {
      return res.status(503).send("No notifications available");
    }
    // return new user
    res.status(200).json(notifications);
  } catch (err) {
    console.log(err);
  }
});

app.get(`/notification/:notification_id`, auth, async (req, res) => {

  // Our register logic starts here
  try {
    const notification_id = req.params.notification_id;

    if (!notification_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("Notification ID is in wrong format");
    }
    const notification = await Notification.findOne({ "id": notification_id });

    if (!notification) {
      return res.status(503).send("No notification available");
    }
    // return new user
    res.status(200).json(notification);
  } catch (err) {
    console.log(err);
  }
});

app.delete(`/lecturer/:user_id`, admin_auth, async (req, res) => {

  // Our register logic starts here
  try {
    const user_id = req.params.user_id;
    if (!user_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("User ID is in wrong format");
    }

    const user = await User.findOne({ "_id" : user_id, "administrator" : false });
    if (!user) {
      return res.status(400).send("No lecturer matches ID");
    }

    await Course.updateMany({"user_id" : user_id}, {$set: {"user_id" : null}});
    await Notification.deleteMany({"user_id" : user_id});
    await User.deleteOne({"_id" : user_id, "administrator" : false});

    // return new user
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

app.delete(`/course/:course_id`, admin_auth, async (req, res) => {

  // Our register logic starts here
  try {
    const course_id = req.params.course_id;
    if (!course_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("Course ID is in wrong format");
    }

    const course = await Course.findOne({ "_id" : course_id});
    if (!course) {
      return res.status(400).send("No course matches ID");
    }
    await Notification.deleteMany({"course_id" : course_id});
    await Course.deleteOne({"_id" : course_id});

    // return new user
    res.status(200).json(course);
  } catch (err) {
    console.log(err);
  }
});

app.delete(`/notification/:notification_id`, auth, async (req, res) => {

  // Our register logic starts here
  try {
    const notification_id = req.params.notification_id;


    if (!notification_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("Notification ID is in wrong format");
    }


    const notification = await Notification.findOne({ "_id" : notification_id});
    if (!notification) {
      return res.status(400).send("No notification of specified user matches ID");
    }
    await Notification.deleteOne({"_id" : notification_id});

    // return new user
    res.status(200).json(notification);
  } catch (err) {
    console.log(err);
  }
});

app.put(`/lecturer/:user_id`, admin_auth, async (req, res) => {

  // Our register logic starts here
  try {

    const user_id = req.params.user_id;
    const { first_name, last_name, email, password } = req.body;

    if (!user_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("User ID is in wrong format");
    }


    // Validate user input
    if (!(email && first_name && last_name)) {
      return  res.status(400).send("All input is required");
    }
    if (email != `${email}`.toLocaleLowerCase()) {
      return  res.status(400).send("E-mail must be in lowercase!");
    }
    // check if user already exist
    // Validate if user exist in our database
    const user = await User.findOne({"_id" : user_id, "administrator" : false});
    if (!user) {
      return res.status(400).send("Lecturer doesn't exist");
    }
    let updatedUser;
    //Encrypt user password
    if (password) {
      encryptedPassword = await bcrypt.hash(password, 10);
      updatedUser = await User.updateOne({"_id" : user_id}, {$set : {
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword}});
    }
    else {
      updatedUser = await User.updateOne({"_id" : user_id}, {$set : {
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        }});
    }

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
        // save user token
        user.token = token;
    




    // return new user
    res.status(200).json(updatedUser);


    

  
  } catch (err) {
    console.log(err);
  }
});

app.put(`/course/:course_id`, admin_auth, async (req, res) => {

  // Our register logic starts here
  try {

    const course_id = req.params.course_id;
    const { name, user_id } = req.body;

    if (!course_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("Course ID is in wrong format");
    }

    // Validate user input
    if (!(name, user_id)) {
      return res.status(400).send("All input is required");
    }
    if (!user_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("User ID is in wrong format");
    }
    const course = await Course.findOne({ "_id" : course_id });
    if (!course) {
      return res.status(409).send("ID doesn't match any course!");
    }
    const user = await User.findOne({ "_id" : user_id });
    if (!user) {
      return res.status(409).send("ID doesn't match any user!");
    }


    // Create user in our database
    const updatedCourse = await Course.updateOne({"_id" : course_id}, {$set : {
      "name" : name,
      "user_id" : user_id
    }});

    res.status(200).json(updatedCourse);
  } catch (err) {
    console.log(err);
  }
});

app.put(`/notification/:notification_id`, auth, async (req, res) => {

  // Our register logic starts here
  try {

    const notification_id = req.params.notification_id;
    const { name, description, date_expired, user_id, course_id } = req.body;

    

    // Validate user input
    if (!(name, description, date_expired, user_id, course_id)) {
      return res.status(400).send("All input is required");
    }
    if (!user_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("User ID is in wrong format");
    }
    if (!course_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("Course ID is in wrong format");
    }

    if (!notification_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("Notification ID is in wrong format");
    }

    const user = await User.findOne({ "_id" : course_id });
    if (!user) {
      return res.status(409).send("ID doesn't match any user!");
    }

    const course = await Course.findOne({ "_id" : course_id });
    if (!course) {
      return res.status(409).send("ID doesn't match any course!");
    }
    const notification = await Notification.findOne({ "_id" : notification_id });
    if (!notification) {
      return res.status(409).send("ID doesn't match any notification!");
    }
    if (date_expired < notification["date_created"]) {
      return res.status(400).send("Expiration date must be a more recent date!");
    }


    // Create user in our database
    const updatedNotification = await Course.updateOne({"_id" : course_id}, {$set : {
      "name": name, 
      "description" : description, 
      "date_expired" : date_expired, 
      "user_id" : user_id,
      "course_id" : course_id
    }});

    res.status(200).json(updatedNotification);
  } catch (err) {
    console.log(err);
  }
});

const { API_PORT } = process.env;

const port = process.env.PORT || API_PORT;

// // your code

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
module.exports = app;