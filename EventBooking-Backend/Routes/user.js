const express = require("express");
const multer = require("multer");
const {handleUserSignup, handleUserLogin, HandleUserLoggdein, handleLogout, handleGetAllUsers, handleUpdateUser, handleDeleteUsers} = require("../Controllers/user");


const router = express.Router();

// Configure multer for profile image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// User routes
router.post("/register", upload.single("ProfileImage"), handleUserSignup);
router.post("/login",handleUserLogin);

router.get('/check-auth',HandleUserLoggdein);

router.get('/logout', handleLogout);

// Admin routes
router.get('/all', handleGetAllUsers);
router.put('/:id', upload.single("ProfileImage"), handleUpdateUser);
router.delete('/', handleDeleteUsers);



module.exports = router;


