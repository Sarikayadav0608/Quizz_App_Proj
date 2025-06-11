import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import {
  FaUserGraduate,
  FaCode,
  FaChalkboardTeacher,
  FaQuestionCircle,
  FaTrophy,
  FaUsers,
} from "react-icons/fa";
import AOS from "aos";

const AboutUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const groupMembers = [
    { name: "Sarika Yadav", role: "Frontend Developer", img: "/sarika photo .jpg" },
    { name: "Nidhi Navandar", role: "Backend Developer", img: "/nidhi.jpg" },
    { name: "Darshan Madnaik", role: "Frontend Developer", img: "/Darshan.jpg" },
  ];

  const quizFeatures = [
    { icon: <FaQuestionCircle size={40} />, title: "Diverse Quizzes", description: "Test your knowledge with quizzes from various topics." },
    { icon: <FaTrophy size={40} />, title: "Leaderboard", description: "Compete with others and see your ranking." },
    { icon: <FaUserGraduate size={40} />, title: "Progress Tracking", description: "Track your quiz attempts and improvements." },
    { icon: <FaChalkboardTeacher size={40} />, title: "Learn & Improve", description: "Get explanations and learn from your mistakes." },
    { icon: <FaUsers size={40} />, title: "Community", description: "Join a community of quiz enthusiasts." },
    { icon: <FaCode size={40} />, title: "Easy to Use", description: "Simple and intuitive interface for everyone." },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    else if (form.name.length > 20) newErrors.name = "Name must not exceed 20 characters.";
    if (!form.email.includes("@gmail.com")) newErrors.email = "Only Gmail addresses are accepted.";
    if (form.message.length < 10) newErrors.message = "Message must be at least 10 characters.";
    else if (form.message.length > 200) newErrors.message = "Message must not exceed 200 characters.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setSuccess(false);
    } else {
      setErrors({});
      setSuccess(true);
      alert("Feedback submitted successfully!");
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, #f8f9ff, #dce3f7)",
        minHeight: "100vh",
        color: "#0a1c3f",
        paddingTop: "3rem",
        paddingBottom: "3rem",
      }}
    >
      <style>
        {`
          .hover-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
          }

          .hover-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
          }

          .gradient-card {
            background: linear-gradient(135deg, #eaf0ff, #f1f5ff);
          }

          .fade-glow {
            transition: box-shadow 0.4s ease;
          }

          .fade-glow:focus {
            box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.25);
          }
        `}
      </style>

      <div className="container">
        <h1 className="text-center mb-4 fw-bold" data-aos="fade-down">
          About Quiz Online
        </h1>
        <p className="text-center mb-5 fs-4 fw-medium" data-aos="fade-up">
          Welcome to Quiz Online! Challenge yourself, learn new things, and compete with friends. Our mission is to make learning fun and engaging for everyone.
        </p>

       
        <div className="row mb-5">
          {groupMembers.map((member, i) => (
            <div key={i} className="col-md-4 text-center mb-4" data-aos="zoom-in">
              <div className="card hover-card gradient-card h-100 p-4 border border-3 border-dark shadow">
                <img
                  src={member.img}
                  alt={member.name}
                  className="rounded-circle mx-auto"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{member.name}</h5>
                  <p className="text-muted">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

       
        <h2 className="text-center mb-4 fw-bold" data-aos="fade-up">App Features</h2>
        <div className="row mb-5">
          {quizFeatures.map((feature, idx) => (
            <div key={idx} className="col-md-4 mb-4 text-center" data-aos="fade-up" data-aos-delay={idx * 100}>
              <div className="hover-card p-5 gradient-card rounded shadow-sm h-100 border border-3 border-dark">
                <div className="mb-3 text-primary">{feature.icon}</div>
                <h5 className="fw-semibold">{feature.title}</h5>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        
        <h2 className="text-center mb-4 fw-bold" data-aos="fade-right">Send Us Feedback</h2>
        <form
          onSubmit={handleSubmit}
          className="p-4 rounded shadow mx-auto gradient-card border border-3 border-dark"
          style={{ maxWidth: "600px" }}
          data-aos="fade-left"
        >
          {success && (
            <div className="alert alert-success" role="alert">
              Feedback submitted successfully!
            </div>
          )}
          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              className={`form-control fade-glow ${errors.name ? "is-invalid" : ""}`}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Gmail</label>
            <input
              type="email"
              className={`form-control fade-glow ${errors.email ? "is-invalid" : ""}`}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Message</label>
            <textarea
              rows="4"
              className={`form-control fade-glow ${errors.message ? "is-invalid" : ""}`}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            {errors.message && <div className="invalid-feedback">{errors.message}</div>}
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-semibold">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default AboutUs;
