import { getAllInterviewReports, generateInterviewReport, getInterviewReportById , generateResumePdf, deleteInterviewReport} from "../services/interview.api"
import { useContext } from "react"
import { InterviewContext } from "../interview.context"

export const useInterview = () => {
    const context = useContext(InterviewContext)

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    // 1. Function to Generate a new report
    const generateReport = async (payload) => {
        setLoading(true);
        try {
            const reportData = await generateInterviewReport(payload);
            setReport(reportData);
            setReports(prev => [reportData, ...(prev || [])]);

            return reportData;
        } catch (error) {
            console.error("Generate Error:", error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // 2. Function to Get a single report by ID
    const getReportById = async (id) => {
        if (report?._id === id) return;

        setLoading(true);
        try {
            const reportData = await getInterviewReportById(id);
            console.log("Setting report state to:", reportData);
            setReport(reportData);
        } catch (error) {
            console.error("Fetch ID error:", error);
        } finally {
            setLoading(false);
        }
    };

    // 3. Function to Get all reports
    const getReports = async () => {
        setLoading(true);
        try {
            const allReports = await getAllInterviewReports();
            setReports(allReports);
            return allReports;
        } catch (error) {
            console.error("Fetch All error:", error);
        } finally {
            setLoading(false);
        }
    };


    // 4. Function to Generate Resume PDF
       const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        let response = null
        try {
            response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    // 5. Function to Delete a report
    const deleteReport = async (id) => {
        setLoading(true);
        try {
            await deleteInterviewReport(id);
            // Remove the deleted report from the reports state
            setReports(prev => prev.filter(report => report._id !== id));
            // If the current report is the one being deleted, clear it
            if (report?._id === id) {
                setReport(null);
            }
        } catch (error) {
            console.error("Delete Error:", error);
        } finally {
            setLoading(false);
        }
    };


    return { 
        loading, 
        report, 
        reports, 
        generateReport, 
        getReportById, 
        getReports ,
        getResumePdf,
        deleteReport
    };
};