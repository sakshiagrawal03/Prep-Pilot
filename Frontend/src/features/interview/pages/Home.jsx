import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import React,{useState,useRef,useEffect} from "react";
import { useInterview } from "../hooks/useInterview.js";
import { useAuth } from "../../auth/hooks/useAuth.js";
import { Link, useNavigate } from "react-router"
import "../style/home.scss";


const Home = () => {
 const navigate = useNavigate()

    const { loading, generateReport,reports, getReports, deleteReport } = useInterview()
    const { handleLogout, loading: authLoading } = useAuth()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()
    const [resumeName, setResumeName] = useState("No file chosen");

// 2. Add an onChange handler to the file input
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setResumeName(file.name);
  }
};

useEffect(() => {
  getReports(); 
}, []);
console.log("Reports state:", reports);

const handleLogoutClick = async () => {
  try {
    await handleLogout();
    navigate("/login"); // redirect after logout
  } catch (err) {
    console.log("Logout failed", err);
  }
};

     const handleGenerateReport = async () => {
  // Basic validation
  if (!jobDescription || !resumeInputRef.current.files[0]) {
    alert("Please provide a job description and upload your resume.");
    return;
  }

  try {
    const resumeFile = resumeInputRef.current.files[0];
    
    // This call must return the saved report object from the backend
    const data = await generateReport({ 
      jobDescription, 
      selfDescription, 
      resumeFile 
    });


    console.log("Response data:", data); // Debugging

    // Check if we got a valid ID back
    if (data && (data._id || data.id)) {
      navigate(`/interview/${data._id || data.id}`);
    } else {
      console.error("No ID found in response:", data);
      alert("Report generated but could not find the ID to navigate.");
    }
  } catch (err) {
    console.error("Navigation failed:", err);
    alert("Something went wrong on the server. Check the console.");
  }
};



  return (
    <main className="home">
      <div className="interview-shell">
        <div className="top-bar">
          <button onClick={handleLogoutClick} className="button logout-btn" disabled={authLoading}>
            {authLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
        <section className="hero">
          <p className="eyebrow">Create Your Custom Interview Plan</p>
          <h1>Transform your interview preparation into a strategic advantage.</h1>
          <p>
            Share the job description, your resume, and a short self-description for tailored guidance
            designed to help you prepare with confidence.
          </p>
        </section>

        <section className="workspace">
          <article className="panel job-panel">
            <div className="panel-header">
              <div className="panel-title">
                <span className="panel-icon">📄</span>
                <div>
                  <strong>Target Job Description</strong>
                  <small>Paste the full job description here.</small>
                </div>
              </div>
              <span className="status-chip">Required</span>
            </div>

            <textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here. Include requirements, responsibilities, and company values for better accuracy..."
            />

            <div className="panel-note">
              <span className="note-dot" />
                Maximize your match accuracy by including the 'Preferred Qualifications' from the job description.      
            </div>
          </article>

             

          <aside className="right-column">
            <div className="card profile-card">
              <div className="card-title">
                <div>
                  <strong>Your Profile</strong>
                  <p>Upload your resume and describe your background for smarter recommendations.</p>
                </div>
              </div>

              <label className="upload-card" htmlFor="resume">
                <span className="upload-icon">☁️</span>
                <strong>Upload Resume</strong>
                <p>{resumeName}</p>
                <small>Maximum file size: 5MB</small>
                <input
                  ref={resumeInputRef}
                  hidden
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={handleFileChange}
                  accept=".pdf"
                 
                />
              </label>
            </div>

            <div className="card self-card">
              <div className="card-header">
                <strong>Quick Self-Description</strong>
                <span>Optional</span>
              </div>
              <textarea
                id="selfDescription"
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                placeholder="Tell us about your goals, career gaps, or the skills you want to emphasize..."
              />
            </div>

            <div className="card insight-card">
              <p>
                By combining your resume with the job description, our AI identifies the exact skill gaps an interviewer will probe.
              </p>
            </div>

            <div className="button-row">
              <button 
                className="button primary-button" 
                type="button" 
                disabled={loading}
                onClick={handleGenerateReport}
              >
                {loading ? "Generating..." : "Generate Strategy"}
              </button>
          
            </div>
            
          </aside>
        </section>
        {/* Recent Reports List */}
            {reports.length > 0 && (
                <section className='recent-reports'>
                    <h2>Recent Interview Plans</h2>
                    <ul className='reports-list'>
                        {reports.map(report => (
                            <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                <div className='report-header'>
                                    <h3>{report.title || 'Untitled Position'}</h3>
                                    <button 
                                        className='delete-button' 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (window.confirm('Are you sure you want to delete this report?')) {
                                                deleteReport(report._id);
                                            }
                                        }}
                                        title="Delete report"
                                    >
                                       <FontAwesomeIcon icon={faTrashCan} />
                            
                                    </button>
                                </div>
                                <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>Match Score: {report.matchScore}%</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            {/* Page Footer */}
            <footer className='page-footer'>
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
            </footer>
      </div>
    </main>
    
  )
};

export default Home;
