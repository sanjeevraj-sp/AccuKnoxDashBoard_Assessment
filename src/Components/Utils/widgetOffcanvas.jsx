import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  Offcanvas,
  Button,
  Form,
  InputGroup,
  Tabs,
  Tab,
} from "react-bootstrap";

import { addWidget, changeVisibility } from "../../Store/widgetSlice";
import { validateAddWidgetForm } from "../../Validator/addWidgetForm";

import "../../Stylesheets/widgetForm.css";

const WidgetForm = (props) => {
  const { categoryNickName, show, handleClose } = props;
  const widgets = useSelector((state) => state.widgets);
  const allCategories = widgets.categories;
  const dispatch = useDispatch();

  // Initialize formData with expected fields
  const [formData, setFormData] = useState({
    widgetName: "",
    widgetText: "",
  });
  const [errors, setErrors] = useState({});

  const handleVisibility = (categoryName, widgetName) => {
    dispatch(changeVisibility({ categoryName, widgetName }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value || "",
    }));
  };

  const handleFormSubmit = (e, categoryName) => {
    e.preventDefault();
    var validationErrors = {};
    validationErrors = validateAddWidgetForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      dispatch(
        addWidget({
          categoryName,
          widgetName: formData.widgetName,
          widgetText: formData.widgetText,
        })
      );
      setFormData({ widgetName: "", widgetText: "" }); // Reset form data after submission
    }
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      style={{ width: "36.7rem" }}
    >
      <Offcanvas.Header
        closeButton
        className="offcanvasheader custom-offcanvas-header"
      >
        <Offcanvas.Title className="offcanvastitle">Add Widget</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <Tabs
          defaultActiveKey={categoryNickName ? categoryNickName : "CSPM"}
          id="category-tabs"
          className="mb-4"
          fill
        >
          {allCategories.map((category) => (
            <Tab
              eventKey={category.nickName}
              title={category.nickName}
              key={category.nickName}
            >
              <div className="active-widgets-list">
                {category.widgets.map((widget) => (
                  <div key={widget.id} className="widget-item">
                    <Form.Check
                      type="checkbox"
                      id={`widget-${widget.id}`}
                      label={widget.name}
                      checked={widget.visible}
                      onChange={() =>
                        handleVisibility(category.name, widget.name)
                      }
                    />
                    <hr></hr>
                  </div>
                ))}
              </div>

              <div className="addWidgetForm">
                <h6 className="form-header">Add Widget</h6>
                <Form onSubmit={(e) => handleFormSubmit(e, category.name)}>
                  <InputGroup className="inputGroup">
                    <InputGroup.Text id="widget-name">
                      Widget Name
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Widget Name"
                      name="widgetName"
                      value={formData.widgetName}
                      onChange={handleChange}
                    />
                  </InputGroup>
                  {errors.widgetName && (
                    <Form.Text className="text-danger form-error-message">
                      {errors.widgetName}
                    </Form.Text>
                  )}

                  <InputGroup className="inputGroup">
                    <InputGroup.Text id="widget-text">
                      Widget Text
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Widget Text"
                      name="widgetText"
                      value={formData.widgetText}
                      onChange={handleChange}
                    />
                  </InputGroup>
                  {errors.widgetText && (
                    <Form.Text className="text-danger form-error-message">
                      {errors.widgetText}
                    </Form.Text>
                  )}

                  <Button variant="primary" type="submit" className="mt-3">
                    Submit
                  </Button>
                </Form>
              </div>
            </Tab>
          ))}
        </Tabs>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default WidgetForm;
