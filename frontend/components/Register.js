import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Dialog } from "@mui/material";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    gender: "",
    bloodgroup: "",
    mobile: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [bloodDialogOpen, setBloodDialogOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCaptchaChange = (value) => setCaptchaValue(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaValue) {
      setError("Please complete the CAPTCHA.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("https://blood-wrh1.onrender.com/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, captcha: captchaValue }), // ✅ Sending reCAPTCHA token
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      setSuccess(true);
      setFormData({ firstname: "", lastname: "", age: "", gender: "", bloodgroup: "", mobile: "", email: "", address: "" });
      setCaptchaValue(null); // ✅ Reset CAPTCHA
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#fef0ef", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Registration Form</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        {Object.keys(formData).map((key) => (
          key !== "bloodgroup" && (
            <div key={key} style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", color: "#333" }}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input type={key === "age" || key === "mobile" ? "number" : "text"} name={key} value={formData[key]} onChange={handleChange} required style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }} />
            </div>
          )
        ))}

        {/* Blood Group Selection */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#333" }}>Blood Group</label>
          <input type="text" name="bloodgroup" value={formData.bloodgroup} readOnly onClick={() => setBloodDialogOpen(true)} required style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd", cursor: "pointer", backgroundColor: "#f9f9f9" }} placeholder="Select Blood Group" />
        </div>

        {/* Google reCAPTCHA */}
        <div style={{ marginBottom: "15px", textAlign: "center" }}>
          {process.env.REACT_APP_CAPTCHA_SITE_KEY ? (
            <ReCAPTCHA sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY} onChange={handleCaptchaChange} />
          ) : (
            <p style={{ color: "red", textAlign: "center" }}>CAPTCHA site key is missing</p>
          )}
        </div>

        <button type="submit" disabled={loading} style={{ width: "100%", padding: "10px", backgroundColor: "#ff6b6b", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          {loading ? "Registering..." : "Register"}
        </button>

        {error && <div style={{ color: "#ff6b6b", textAlign: "center", marginTop: "10px" }}>Error: {error}</div>}
        {success && <div style={{ color: "#4CAF50", textAlign: "center", marginTop: "10px" }}>Registration successful!</div>}
      </form>

      {/* Blood Group Dialog */}
      <Dialog open={bloodDialogOpen} onClose={() => setBloodDialogOpen(false)}>
        <div style={{ padding: "20px" }}>
          <h3>Select Blood Group</h3>
          {bloodGroups.map((group) => (
            <div key={group} onClick={() => { setFormData({ ...formData, bloodgroup: group }); setBloodDialogOpen(false); }} style={{ padding: "10px", cursor: "pointer", borderBottom: "1px solid #ddd" }}>
              {group}
            </div>
          ))}
        </div>
      </Dialog>
    </div>
  );
};

export default Register;
