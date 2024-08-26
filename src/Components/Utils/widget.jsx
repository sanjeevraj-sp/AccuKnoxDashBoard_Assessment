import React from "react";
import { useDispatch } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Col } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import CloseButton from "react-bootstrap/CloseButton";
import Figure from "react-bootstrap/Figure";
import { VscGraph } from "react-icons/vsc";

import { changeVisibility } from "../../Store/widgetSlice";

import "../../Stylesheets/widget.css";

const Widget = (props) => {
  const { categoryName, widget } = props;
  const dispatch = useDispatch();

  if (!widget.visible) {
    return null;
  }

  const handleCloseWidgetBtn = (widgetName) => {
    dispatch(changeVisibility({ categoryName, widgetName }));
  };

  return (
    <Col key={widget.id}>
      <div className="widget">
        <Stack direction="horizontal" className="widget-header">
          <div className="p-2">{widget.name}</div>
          <div className="p-2 ms-auto" id="widgetRemoveIcon">
            <CloseButton onClick={() => handleCloseWidgetBtn(widget.name)} />
          </div>
        </Stack>

        <div className="widget-body">
          <Figure className="defaultFigure">
            <VscGraph className="noDataIcon" />
            <Figure.Caption className="noDataCaption">
              {widget.text}
            </Figure.Caption>
          </Figure>
        </div>
      </div>
    </Col>
  );
};

export default Widget;
