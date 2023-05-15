import React from 'react'
import Story from '../Story'
import { Row, Col, Spin } from 'antd'
import "./styles.css"
import { useSelector } from 'react-redux'

function StoryList({ setSelectedId }) {
  const stories = useSelector((state) => state.stories);
  console.log("stories", stories)

  return !stories.length ?
    <div style={{ textAlign: "center" }}>
      <Spin size='large' />
    </div> :
    (
      <Row id='row'>
        {stories.map((story, i) => {
          return (
            <Col id='col' key={i} span={24}>
              <Story setSelectedId={setSelectedId} story={story} />
            </Col>
          )
        })}
      </Row>
    )
}


export default StoryList