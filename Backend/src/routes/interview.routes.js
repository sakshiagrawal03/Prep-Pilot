const express=require('express');
const authMiddleware=require('../middlewares/auth.middleware');
const interviewController=require('../controllers/interview.controller');
const upload = require('../middlewares/file.middleware');

const interviewRouter=express.Router();


/**
 * @route POST /api/interview/
 * @description Generates an interview report based on the candidate's resume pdf, self-description, and the job description.
 * @access Private
 */

interviewRouter.post('/',authMiddleware.authUser, upload.single("resume"), interviewController.generateInterviewReportController)

/**
 * @route GET /api/interview/report/:interviewId
 * @description Retrieves the interview report by interview ID.
 * @access Private
     **/

interviewRouter.get('/report/:interviewId', authMiddleware.authUser, interviewController.getInterviewReportByIdController)

/** 
 * @route GET /api/interview/
 * @description Retrieves all interview reports of logged in user.
 * @access Private
*/

interviewRouter.get('/', authMiddleware.authUser, interviewController.getAllInterviewReportsController)

/**
 * @route POST /api/interview/resume/pdf
 * @description Generates a resume PDF based on the candidate's resume, self-description, and the job description.
 * @access Private
 */

interviewRouter.post('/resume/pdf/:interviewReportId', authMiddleware.authUser, interviewController.generateResumePdfController)

/**
 * @route DELETE /api/interview/:interviewId
 * @description Deletes an interview report by ID.
 * @access Private
 */

interviewRouter.delete('/:interviewId', authMiddleware.authUser, interviewController.deleteInterviewReportController)





module.exports=interviewRouter;