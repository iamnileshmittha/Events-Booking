import React, { useState } from "react";

function ConsentForm() {
  const [formData, setFormData] = useState({
    region: "",
    name: "",
    survey: "",
    total: "",
    owned: "",
  });

  const [language, setLanguage] = useState("en"); // 'en' for English, 'mr' for Marathi

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const labels = {
    en: {
      title: "Consent Form",
      region: "Select Region",
      name: "Name of landowner",
      survey: "Survey No",
      total: "Total Area",
      owned: "Owned Area",
      placeholderName:
        "Please enter Name of land owner or Name of interested Person",
      placeholderSurvey: "Please Enter a Survey No",
      placeholderTotal: "Please enter total area (in He.R)",
      placeholderOwned: "Please enter Ownership Share in the Area Covered",
      submit: "Submit",
    },
    mr: {
      title: "संमती पत्र",
      region: "प्रदेश निवडा",
      name: "जमीनधारकाचे नाव",
      survey: "सर्वे नंबर",
      total: "एकूण क्षेत्रफळ",
      owned: "स्वामित्व क्षेत्रफळ",
      placeholderName: "जमीनधारकाचे किंवा संबंधित व्यक्तीचे नाव टाका",
      placeholderSurvey: "सर्वे नंबर टाका",
      placeholderTotal: "कृपया एकूण क्षेत्रफळ (हे.रा) टाका",
      placeholderOwned: "कृपया क्षेत्रफळातील स्वामित्व हिस्सा टाका",
      submit: "सबमिट करा",
    },
  };

  const lang = labels[language];

  return (
    <div className="consent-container">
      <div className="lang-switch">
        <a
          onClick={() => setLanguage("en")}
          className={language === "en" ? "active" : ""}
        >
          🇬🇧 English
        </a>
        <a
          onClick={() => setLanguage("mr")}
          className={language === "mr" ? "active" : ""}
        >
          🇮🇳 मराठी
        </a>
      </div>

      <h2>{lang.title}</h2>
      <form onSubmit={handleSubmit} className="consent-form">
        <label>
          {lang.region} <span>*</span>
        </label>
        <select name="region" value={formData.region} onChange={handleChange}>
          <option value="">{lang.region}</option>
          <option value="Vanapuri">Vanapuri</option>
        </select>

        <label>
          {lang.name} <span>*</span>
        </label>
        <input
          type="text"
          name="name"
          placeholder={lang.placeholderName}
          value={formData.name}
          onChange={handleChange}
        />

        <label>
          {lang.survey} <span>*</span>
        </label>
        <input
          type="text"
          name="survey"
          placeholder={lang.placeholderSurvey}
          value={formData.survey}
          onChange={handleChange}
        />

        <label>
          {lang.total} <span>*</span>
        </label>
        <input
          type="text"
          name="total"
          placeholder={lang.placeholderTotal}
          value={formData.total}
          onChange={handleChange}
        />

        <label>
          {lang.owned} <span>*</span>
        </label>
        <input
          type="text"
          name="owned"
          placeholder={lang.placeholderOwned}
          value={formData.owned}
          onChange={handleChange}
        />

        <button type="submit">{lang.submit}</button>
      </form>
    </div>
  );
}

export default ConsentForm;
