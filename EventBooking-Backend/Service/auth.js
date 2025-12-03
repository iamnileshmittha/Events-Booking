const jwt = require("jsonwebtoken");
const secret ="qwerty@12345";

function setUser(user){

    console.log(user);
    try{
    
    return jwt.sign({
        _id : user._id,
        userName : user.FullName,
    },secret);
}
catch(err){

    console.log(err);
}


}

function getUser(token){

    if(!token) return null;

    return jwt.verify(token,secret);
}

module.exports ={
    setUser,
    getUser,
}