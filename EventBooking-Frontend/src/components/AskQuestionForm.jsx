import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPen,
  FaCommentDots,
  FaTrash,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";
import "./AskQuestionForm.css";
import formImg from "../assets/n1.jpeg";

function AskQuestionForm() {
  const [language, setLanguage] = useState("en");
  const [questions, setQuestions] = useState([
    { id: 1, question: "", answer: "", open: true },
  ]);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const labels = {
    en: {
      contactBoxes: [
        {
          icon: <FaMapMarkerAlt />,
          title: "Office Address",
          text: "25/B Milford, New York, USA",
        },
        { icon: <FaPhoneAlt />, title: "Call Us", text: "+2 123 4565 789" },
        { icon: <FaEnvelope />, title: "Email Us", text: "info@example.com" },
        {
          icon: <FaClock />,
          title: "Open Time",
          text: "Mon - Sat (10.00AM - 05.30PM)",
        },
      ],
      title: "Get In Touch",
      subtitle:
        "It is a long established fact that a reader will be distracted by the readable content.",
      name: "Your Name",
      email: "Your Email",
      subject: "Your Subject",
      message: "Write Your Message",
      add: "Add More",
      remove: "Remove",
      submit: "Send Message",
      question: "Question",
      answer: "Answer",
    },
    mr: {
      contactBoxes: [
        {
          icon: <FaMapMarkerAlt />,
          title: "ऑफिसचा पत्ता",
          text: "२५/बी मिलफोर्ड, न्यूयॉर्क, यूएसए",
        },
        { icon: <FaPhoneAlt />, title: "कॉल करा", text: "+२ १२३ ४५६५ ७८९" },
        { icon: <FaEnvelope />, title: "ईमेल करा", text: "info@example.com" },
        {
          icon: <FaClock />,
          title: "कार्य वेळ",
          text: "सोम - शनि (१०:०० - ५:३०)",
        },
      ],
      title: "संपर्क करा",
      subtitle: "वाचनीय मजकुरामुळे वाचक विचलित होतो हे सिद्ध झाले आहे.",
      name: "तुमचं नाव",
      email: "तुमचा ईमेल",
      subject: "विषय",
      message: "तुमचा संदेश लिहा",
      add: "अधिक जोडा",
      remove: "काढा",
      submit: "संदेश पाठवा",
      question: "प्रश्न",
      answer: "उत्तर",
    },
  };

  const lang = labels[language];

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const toggleAccordion = (index) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === index ? { ...q, open: !q.open } : { ...q, open: false }
      )
    );
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now(), question: "", answer: "", open: true },
    ]);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formValues.name ||
      !formValues.email ||
      !formValues.subject ||
      !formValues.message
    ) {
      alert("Please fill all main fields.");
      return;
    }

    console.log("Form:", formValues);
    console.log("Questions:", questions);
    alert("Message sent successfully!");
  };

  return (
    <div className="contact-page-wrapper">
      {/* <div className="lang-switch">
        <button
          onClick={() => setLanguage("en")}
          className={language === "en" ? "active" : ""}
        >
          🇬🇧 English
        </button>
        <button
          onClick={() => setLanguage("mr")}
          className={language === "mr" ? "active" : ""}
        >
          🇮🇳 मराठी
        </button>
      </div> */}

      <div className="info1-box-section">
        {lang.contactBoxes.map((box, idx) => (
          <div className="info1-box" key={idx}>
            <div className="icon-circle">{box.icon}</div>
            <h4>{box.title}</h4>
            <p>{box.text}</p>
          </div>
        ))}
      </div>

      <div className="contact-box">
        <div className="left">
          <img src={formImg} alt="contact" />
        </div>
        <div className="right">
          <h2>{lang.title}</h2>
          <p>{lang.subtitle}</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder={lang.name}
                value={formValues.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder={lang.email}
                value={formValues.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-single">
              <input
                type="text"
                name="subject"
                placeholder={lang.subject}
                value={formValues.subject}
                onChange={handleChange}
              />
            </div>

            <div className="input-single">
              <textarea
                name="message"
                placeholder={lang.message}
                value={formValues.message}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* <div className="accordion-group">
              {questions.map((q, i) => (
                <div className="accordion-item" key={q.id}>
                  <div
                    className="accordion-header"
                    onClick={() => toggleAccordion(i)}
                  >
                    <span>{`${lang.question} #${i + 1}`}</span>
                    <span>{q.open ? "▾" : "▸"}</span>
                  </div>
                  {q.open && (
                    <div className="accordion-body">
                      <input
                        type="text"
                        placeholder={lang.question}
                        value={q.question}
                        onChange={(e) =>
                          handleQuestionChange(i, "question", e.target.value)
                        }
                      />
                      <textarea
                        placeholder={lang.answer}
                        value={q.answer}
                        onChange={(e) =>
                          handleQuestionChange(i, "answer", e.target.value)
                        }
                      ></textarea>
                      {questions.length > 1 && (
                        <button
                          type="button"
                          className="remove-btn"
                          onClick={() => removeQuestion(i)}
                        >
                          <FaTrash /> {lang.remove}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <button type="button" className="add-btn" onClick={addQuestion}>
                + {lang.add}
              </button>
            </div> */}

            <button type="submit" className="submit-btn">
              {lang.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AskQuestionForm;
