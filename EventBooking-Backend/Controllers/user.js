const Users = require("../Models/user");
const { setUser , getUser} = require("../Service/auth");

async function handleUserSignup(req, res) {
    try {
      const { FullName, Email, Password } = req.body;
      const ProfileImage = req.file ? req.file.filename : "";

    // Check if email already exists
    const existingUser = await Users.findOne({ Email });

    if (existingUser) {
        return res
          .json({ success: false, message: "Email already registered. Please use another mailID" });
      }


      await Users.create({
        FullName,
        Email,
        Password,
        ProfileImage,
      });
  
      return res.json({ success: true, message: "User registered successfully" });
    } catch (error) {
      console.error("Error in handleUserSignup:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }

async function handleUserLogin(req, res) {
    try {
      const {Email, Password } = req.body;
      
    // Check if user exists
    const FoundUser = await Users.findOne({ Email,Password });

    if (!FoundUser) {
        return res
          .json({ success: false, message: "uername OR Password is Wrong" });
      }

      const token = setUser(FoundUser);

      res.cookie("uid",token);
      return res.json({ success: true, message: "Logined Successfully" });
    } catch (error) {
      console.error("Error in handleUserSignup:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
}

async function HandleUserLoggdein(req, res)  {

  try {
    const token = req.cookies.uid;

    if (!token) {
      return res.json({ loggedIn: false });
    }
  
    const userData = getUser(token); // your token decoder function
    
    // Fetch full user details including profile image
    const user = await Users.findById(userData._id).select('-Password');
    
    return res.json({ loggedIn: true, user });
  } catch (err) {
    console.log("Error in HandleUserLoggdein",err);
    return res.json({ loggedIn: false });
  }
}

async function handleLogout(req, res)  {

  try {
    res.clearCookie("uid");
    res.json({ success: true });
  } catch (err) {
    console.log("Error in handleLogout",err);
    return res.json({ success: false });
  }
}

// Get all users (Admin)
async function handleGetAllUsers(req, res) {
  try {
    console.log("=== Fetching All Users ===");
    
    const users = await Users.find({}).select('-Password').sort({ createdAt: -1 });
    
    console.log(`✅ Found ${users.length} users`);
    
    res.status(200).json({
      success: true,
      users: users,
      count: users.length
    });
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error",
      error: error.message 
    });
  }
}

// Update user (Admin)
async function handleUpdateUser(req, res) {
  try {
    console.log("=== Updating User ===");
    const { id } = req.params;
    const { FullName, Email } = req.body;

    const updateData = { FullName, Email };

    // Only update profile image if a new one is provided
    if (req.file) {
      updateData.ProfileImage = req.file.filename;
    }

    const updatedUser = await Users.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-Password');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    console.log("✅ User updated successfully:", updatedUser);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("❌ Error updating user:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
}

// Delete users (Admin)
async function handleDeleteUsers(req, res) {
  try {
    console.log("=== Deleting Users ===");
    const { userIds } = req.body;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No user IDs provided"
      });
    }

    console.log("User IDs to delete:", userIds);

    const result = await Users.deleteMany({ _id: { $in: userIds } });

    console.log(`✅ Deleted ${result.deletedCount} users`);

    res.status(200).json({
      success: true,
      message: `Successfully deleted ${result.deletedCount} user(s)`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error("❌ Error deleting users:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
}
  

module.exports={

    handleUserSignup,
    handleUserLogin,
    HandleUserLoggdein,
    handleLogout,
    handleGetAllUsers,
    handleUpdateUser,
    handleDeleteUsers
}

