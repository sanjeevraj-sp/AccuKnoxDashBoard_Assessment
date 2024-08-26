import React, { useState } from "react";
import { useSelector } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Row, Col, Button, Dropdown, DropdownButton } from "react-bootstrap";
import {
  FaPlus,
  FaSyncAlt,
  FaEllipsisV,
  FaClock,
  FaSearch,
} from "react-icons/fa";

import "../Stylesheets/dashBoard.css";
import Widget from "./Utils/widget.jsx";
import AddWidget from "./Utils/addWidget.jsx";
import WidgetForm from "./Utils/widgetOffcanvas.jsx";

const Dashboard = () => {
  const widgets = useSelector((state) => state.widgets);
  const categories = widgets.categories;

  const [searchTerm, setSearchTerm] = useState("");
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter widgets based on the search term
  const filteredCategories = categories.map((category) => ({
    ...category,
    widgets: category.widgets.filter((widget) =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <div className="dashBoard-body">
      <div className="dashBoard-header">
        <div className="d-flex align-items-center justify-content-between">
          <Col xs="2" className="header-name align-items-center">
            CNAPP Dashboard
          </Col>

          <Col className="header-settings d-flex align-items-center" xs="8">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search anything..."
                className="search-input"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <Button
              className="add-widget-btn d-flex align-items-center"
              onClick={handleShowOffcanvas}
            >
              Add Widget <FaPlus className="ms-2" />
            </Button>

            <Button className="icon-btn mx-2">
              <FaSyncAlt />
            </Button>

            <Button className="icon-btn">
              <FaEllipsisV />
            </Button>

            <DropdownButton
              id="dropdown-basic-button"
              title={
                <span>
                  <FaClock className="me-2" />| Last 2 days
                </span>
              }
              className="time-dropdown ms-2"
            >
              <Dropdown.Item href="#/action-1">Last 1 day</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Last 2 days</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Last 7 days</Dropdown.Item>
            </DropdownButton>
          </Col>
        </div>
      </div>

      <div className="dashBoard-widgets">
        {/* If there is a search term, display only matching widgets */}
        {searchTerm
          ? filteredCategories.map(
              (category) =>
                category.widgets.length > 0 && ( // Only render categories with matching widgets
                  <section className="widgets-category" key={category.name}>
                    <p className="category-header">{category.name}</p>
                    <Row xs={1} md={3} className="g-0">
                      {category.widgets.map((widget) => (
                        <Widget
                          categoryName={category.name}
                          widget={widget}
                          key={widget.id}
                        />
                      ))}
                    </Row>
                  </section>
                )
            )
          : categories.map((category) => (
              <section className="widgets-category" key={category.name}>
                <p className="category-header">{category.name}</p>
                <Row xs={1} md={3} className="g-0">
                  {category.widgets.map((widget) => (
                    <Widget
                      categoryName={category.name}
                      widget={widget}
                      key={widget.id}
                    />
                  ))}
                  <AddWidget categoryNickName={category.nickName} />
                </Row>
              </section>
            ))}
      </div>

      <WidgetForm
        categoryNickName={null}
        show={showOffcanvas}
        handleClose={handleCloseOffcanvas}
      />
    </div>
  );
};

export default Dashboard;
