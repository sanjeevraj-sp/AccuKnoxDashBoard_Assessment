import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Col } from "react-bootstrap";
import { MdAddchart } from "react-icons/md";

import "../../Stylesheets/addwidget.css";

import WidgetForm from "./widgetOffcanvas.jsx";

const AddWidget = (props) => {
  const { categoryNickName } = props;

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => {
    setShowOffcanvas(false);
  };

  return (
    <>
      <Col>
        <div className="addwidget" onClick={() => handleShowOffcanvas()}>
          <button className="addWidget-button">
            <MdAddchart className="button-icon"></MdAddchart>
            Add Widget
          </button>
        </div>
      </Col>

      <WidgetForm
        categoryNickName={categoryNickName}
        show={showOffcanvas}
        handleClose={handleCloseOffcanvas}
      />
    </>
  );
};

export default AddWidget;
