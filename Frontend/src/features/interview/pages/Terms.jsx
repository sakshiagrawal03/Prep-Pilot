import React from "react";
import { Link } from "react-router";

const Terms = () => {
  return (
    <main className="terms-page">
      <section className="content-shell">
        <h1>Terms of Service</h1>
        <p>
          Welcome to the terms of service page. This page describes the general rules for using the app.
        </p>
        <h2>Use of service</h2>
        <p>
          You may use the platform to generate interview plans and review your saved reports for personal purposes.
        </p>
        <h2>Account responsibility</h2>
        <p>
          Keep your login details secure and do not share access with others. You are responsible for actions taken on your account.
        </p>
        <Link to="/">Back to home</Link>
      </section>
    </main>
  );
};

export default Terms;
