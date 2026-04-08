const pdfParse = require('pdf-parse');
const  {generateInterviewReport,generateResumePdf} = require('../services/ai.service');
const interviewReportModel= require('../models/interviewReport.model');



/**
 * @desc Generates an interview report based on the candidate's resume, self-description, and the job description
 **/


async function generateInterviewReportController(req, res) {

     const  resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
     const { selfDescription, jobDescription } = req.body;

     const interViewReportByAi= await generateInterviewReport({
          resume:resumeContent.text,
          selfDescription,
          jobDescription
})

  const interviewReport= await interviewReportModel.create({
     user:req.user._id,
     resume:resumeContent.text,
     selfDescription,
     jobDescription,
     ...interViewReportByAi
})
     res.status(201).json({
          message:"Interview report generated successfully",
          data: interviewReport
     })

}


/** 
 * @description Controller to get interview report by ID
*/

async function getInterviewReportByIdController(req, res) {
     const { interviewId } = req.params;
     const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user._id });
     if (!interviewReport) {
          return res.status(404).json({ message: 'Interview report not found' });
     }
     res.status(200).json({
          message: 'Interview report retrieved successfully',
          data :interviewReport
     });
}

/**
 * @description Controller to get all interview reports of logged in user
 */

async function getAllInterviewReportsController(req, res) {
     
     const interviewReports = await interviewReportModel.find({ user: req.user._id }).sort({ createdAt: -1 }).select('-resume -selfDescription -jobDescription -__v -technicalQuestions -skillGaps -preparationPlan');

     
     res.status(200).json({
               message: "Interview reports fetched successfully.",
               data : interviewReports
    })
}

/**
 * @description Controller to generate resume PDF based on candidate's self-description, job description and resume content
 */

async function generateResumePdfController(req, res) {
    try {
        const { interviewReportId } = req.params;

    const interviewReport = await interviewReportModel.findOne({
  _id: interviewReportId,
  user: req.user._id
    });
        if (!interviewReport) {
            return res.status(404).json({ message: "Interview report not found" });
        }

        const { resume, selfDescription, jobDescription } = interviewReport;

        const pdfBuffer = await generateResumePdf({
            resume,
            selfDescription,
            jobDescription
        });

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=resume_${interviewReportId}.pdf`,
        });

        res.send(pdfBuffer);

    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({
            message: error.message || "Failed to generate resume PDF"
        });
    }
}

/**
 * @description Controller to delete an interview report by ID
 */

async function deleteInterviewReportController(req, res) {
    try {
        const { interviewId } = req.params;
        const deletedReport = await interviewReportModel.findOneAndDelete({ _id: interviewId, user: req.user._id });
        if (!deletedReport) {
            return res.status(404).json({ message: 'Interview report not found or not authorized to delete' });
        }
        res.status(200).json({
            message: 'Interview report deleted successfully'
        });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({
            message: error.message || "Failed to delete interview report"
        });
    }
}

module.exports={generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController, deleteInterviewReportController}
