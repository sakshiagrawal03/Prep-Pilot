import React from "react";
import { Link } from "react-router";

const Privacy = () => {
  return (
    <main className="privacy-page">
      <section className="content-shell">
        <h1>Privacy Policy</h1>
        <p>
          This is privacy policy page. 
        </p>
        <h2>What we collect</h2>
        <ul>
          <li>Resume uploads and job descriptions</li>
          <li>Generated interview plans and usage analytics</li>
          <li>Basic account information when you sign in</li>
        </ul>
        <h2>How we use it</h2>
        <p>
          Data is used only to generate personalized interview recommendations and improve the app experience.
        </p>
        <Link to="/">Back to home</Link>
      </section>
    </main>
  );
};

export default Privacy;
