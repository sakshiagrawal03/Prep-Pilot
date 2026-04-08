const userModel= require('../models/user.model');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const tokenBlacklistModel= require('../models/blacklist.model');
/** 
*@name POST /auth/register
*@description Register a new user, expects username, email and the password in
the request body
*@access Public

*/
async function registerUserController(req, res){

    const {username, email, password}= req.body;

    if(!username || !email || !password){
        return res.status(400).json({message: 'All fields are required'});

}    

const isUserAlreadyExist= await userModel.findOne({
    $or: [{email}, {username}]
})

if(isUserAlreadyExist){
    return res.status(400).json({message: 'User with the same email or username already exists'});
}
 
const hash=await bcrypt.hash(password, 10);

const user=await userModel.create({
    username,
    email,
    password: hash

}) 
 const token= jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
 
 res.cookie('token', token)

 res.status(201).json({
    message: 'User registered successfully',
    user: {
        id: user._id,
        username: user.username,
        email: user.email
    }

})
}

/**
 * @name loginUserController
    * @description Login a user, expects email and password in the request body
    * @access Public
    * 
    */

async function loginUserController(req, res){
    const {email, password}= req.body;

    const user= await userModel.findOne({email})

    if(!user){
        return res.status(400).json({message: 'Invalid email or password'});
    }

    const isPasswordValid= await bcrypt.compare(password, user.password);
    
    if(!isPasswordValid){
        return res.status(400).json({message: 'Invalid email or password'});
}
const token= jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
    res.cookie('token', token, {
    httpOnly: true,
    secure: false,   // true in production (HTTPS)
    sameSite: "lax"
});    res.status(200).json({
        message: 'User logged in successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })                                                              
}

/**
 * @name logoutUserController
 * @description Logout a user by clearing the token cookie and adding the token to blacklist
 * @access Public
 * 
 */

async function logoutUserController(req, res) {
    try {
        const token = req.cookies.token;

        if (token) {
            await tokenBlacklistModel.create({ token });
        }

        res.clearCookie('token', {
            httpOnly: true,
            secure: false, // true in production
            sameSite: "lax"
        });

        return res.status(200).json({
            message: 'User logged out successfully'
        });

    } catch (err) {
        return res.status(500).json({ message: "Logout failed" });
    }
}


/**
 * @name getMeController 
 * @description Get the details of the current logged in user.
 * @access Private
 * */
async function getMeController(req, res){

const user=await userModel.findById(req.user._id)
res.status(200).json({
    message: 'User details fetched successfully',
    user: {
        id: user._id,
        username: user.username,
        email: user.email
    }
})
}


module.exports= {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}
