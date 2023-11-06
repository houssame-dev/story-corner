import React from "react";
import Story from "../Story";
import { Row, Col, Spin } from "antd";
import "./styles.css";
import { useSelector } from "react-redux";
import { FaXTwitter, FaGithub } from "react-icons/fa6";

function StoryList({ setSelectedId }) {
  const currentYear = new Date().getFullYear();
  const authorName = "Houssame.";
  const stories = useSelector((state) => state.stories);
  console.log("stories", stories);

  return !stories.length ? (
    <div style={{ textAlign: "center" }}>
      <Spin size="large" />
      <h4
        style={{
          color: "white",
        }}
      >
        Loading Stories...
      </h4>
    </div>
  ) : (
    <Row id="row">
      <>
        {stories.map((story, i) => {
          return (
            <Col id="col" key={i} span={24}>
              <Story setSelectedId={setSelectedId} story={story} />
            </Col>
          );
        })}
        <p id="copyright">
          <span id="social-icons">
            <a
              href="https://twitter.com/houssamedev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter size={25} />{" "}
            </a>
            <a
              href="https://github.com/houssame-dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <FaGithub size={25} />
            </a>
          </span>
          <span>
            &copy; {currentYear} {authorName}
          </span>
        </p>
      </>
    </Row>
  );
}

export default StoryList;
