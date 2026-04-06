const express= require('express');
const authController= require('../controllers/auth.controller');
const authRouter= express.Router();
const authMiddleware= require('../middlewares/auth.middleware');



/**
 * @route POST /auth/register
 * @descriptiom Register a new user
  *@access Public
 */
authRouter.post('/register',authController.registerUserController );

/**
 * @route POST /api/auth/login
 * @description Login a user with email and password
 * @access Public
 * */

authRouter.post('/login', authController.loginUserController);

/**
 * @route GET /api/auth/logout
 * description  clear token from cookie and add it to blacklist
 * @access Public
*/

authRouter.post('/logout', authMiddleware.authUser, authController.logoutUserController);
/**
 * @route GET /api/auth/get-me
 * description Get the details of the current logged in user
 * @access Private
 * */

authRouter.get('/get-me', authMiddleware.authUser, authController.getMeController);
                

module.exports= authRouter;        