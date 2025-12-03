const express = require("express");
const {handleUserSignup, handleUserLogin, HandleUserLoggdein, handleLogout} = require("../Controllers/user");


const router = express.Router();


// This for APi Products
router.post("/register",handleUserSignup);
router.post("/login",handleUserLogin);

router.get('/check-auth',HandleUserLoggdein);

router.get('/logout', handleLogout);



module.exports = router;


