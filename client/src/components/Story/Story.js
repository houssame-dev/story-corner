import React, { useState } from "react";
import { Card, Tooltip, Typography, Image } from "antd";
import { EditOutlined, DeleteTwoTone, HeartTwoTone } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { deleteStory, likeStory } from "../../actions/stories";
import moment from "moment";
import "./styles.css";
import { Badge } from "react-bootstrap";

const { Paragraph, Text } = Typography;

function Story({ story, setSelectedId }) {
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(true);
  const user = JSON.parse(localStorage.getItem("profile"));

  const cardActions = [
    <div>
      <Tooltip placement="top" title="Like" color="magenta">
        <HeartTwoTone
          twoToneColor="magenta"
          onClick={() => {
            dispatch(likeStory(story._id));
          }}
        />
        &nbsp; {story.likes.length} &nbsp;
      </Tooltip>
    </div>,
    <Tooltip placement="top" title="Edit">
      <EditOutlined
        onClick={() => {
          setSelectedId(story._id);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </Tooltip>,
    <Tooltip placement="top" title="Delete" color="red">
      <DeleteTwoTone
        twoToneColor="red"
        onClick={() => dispatch(deleteStory(story._id))}
      />
    </Tooltip>,
  ];

  return (
    <div className="text-white">
      <Card
        id="card"
        cover={<Image src={story.image} />}
        actions={
          user?.result?._id === story?.userId
            ? cardActions
            : user?.result
            ? cardActions.slice(0, 1)
            : null
        }
      >
        <div className="meta">
          <Badge id="story_badge" bg="white">
            {story.username.charAt(0)}
          </Badge>
          <span id="story_username">{story.username}</span>
        </div>
          <br />
        <Paragraph
          id="story_para"
          ellipsis={{
            rows: 2,
            expandable: true,
            symbol: "more",
            onExpand: () => {
              setExpand(true);
            },
            onEllipsis: () => {
              setExpand(false);
            },
          }}
        >
          {story.caption}
        </Paragraph>
        {expand ? (
          <span id="story_hashtag">
            {story.tags.split(" ").map((tag) => ` #${tag}`)}
          </span>
        ) : null}
        <br />
        <br />
        <Text id="story_time">
          {moment.utc(moment(story.postDate)).local().fromNow()}
        </Text>
      </Card>
      <hr />
    </div>
  );
}

export default Story;
