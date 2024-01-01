import React from "react";
import { Col, Row } from "reactstrap";

const IpInfo = ({ ipInfo }) => {
  return (
    <Row
      className="w-75 border rounded my-5 bg-white ipInfo"
      data-aos="fade-right"
    >
      {ipInfo.map((item, index) => {
        return (
          <Col md="6" lg="3" key={index} className="border-start">
            <div className="py-1">
              <span>{item.title}</span>
              <h3>{item.text}</h3>
            </div>
          </Col>
        );
      })}
    </Row>
  );
}

export default IpInfo;
