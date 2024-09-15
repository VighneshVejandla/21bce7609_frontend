import React, { useState } from "react";
import "./ApplyForTrademark.css";

const ApplyForTrademark = () => {
  const [trademarkName, setTrademarkName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("United States");

  const handleTrademarkNameChange = (e) => {
    setTrademarkName(e.target.value);
  };

  const handleApplyNow = () => {
    // Implement the logic for applying for a trademark
    console.log(
      `Applying for trademark: ${trademarkName} in ${selectedCountry}`
    );
    // You might want to make an API call here or navigate to a new page
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Implement image upload logic
      console.log(`Uploading image: ${file.name}`);
      // You might want to send this file to your server or process it client-side
    }
  };

  return (
    <div className="apply-trademark">
      <h2>Apply for Trademark</h2>
      <p>Select countries to protect your logo trademark</p>

      <div className="form-group">
        <label htmlFor="trademark-name">Trademark Name</label>
        <input
          type="text"
          id="trademark-name"
          placeholder="Enter trademark name"
          value={trademarkName}
          onChange={handleTrademarkNameChange}
        />
      </div>

      <div className="form-group">
        <label>Country Selected</label>
        <div className="country-selection">
          {/* <img src="/path-to-us-flag.png" alt="US Flag" /> */}
          <span>{selectedCountry}</span>
          <span className="price">$99 / 1 class + gov fee</span>
        </div>
      </div>

      <button className="apply-now-button" onClick={handleApplyNow}>
        Apply Now
      </button>

      <div className="image-search">
        <h3>Image Search</h3>
        <div className="image-upload-area">
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          <label htmlFor="image-upload" className="image-upload-label">
            <div className="camera-icon">📷</div>
            <p>Drag and drop or click to upload an image</p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ApplyForTrademark;
