import React from 'react';
import "./importform.css";
import UploadFiles from "../uploadfiles/uploadfiles";

const ImportForm = ({ setIsLoggedIn }) => {
  return (
    <div>
      <header>
        <div class="left">
          <h1> Data Management Tool </h1>
        </div>
        <div class="right">
          <button className="logout_button" onClick={() => setIsLoggedIn(false)}>
            Logout
          </button>
        </div>
      </header>
      <UploadFiles />
    </div>
  );
};

export default ImportForm;
