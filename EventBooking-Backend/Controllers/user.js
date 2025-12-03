const Users = require("../Models/user");
const { setUser , getUser} = require("../Service/auth");

async function handleUserSignup(req, res) {
    try {
      const { FullName, Email, Password } = req.body;

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
  
    const user = getUser(token); // your token decoder function
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
  

module.exports={

    handleUserSignup,
    handleUserLogin,
    HandleUserLoggdein,
    handleLogout
}

