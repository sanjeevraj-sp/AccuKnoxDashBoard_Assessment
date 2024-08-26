import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Stack from "react-bootstrap/Stack";

import "../Stylesheets/header.css";

const Header = () => {
  return (
    <div className="app-header bg-primary text-white py-2">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <div className="brand-logo">AccuKonx</div>
          <div className="tagline">
            Agentless Zero Trust Enterprise Cloud Security
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
