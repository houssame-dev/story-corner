import React, { useEffect, useState } from "react";
import StoryList from "../StoryList";
import StoryForm from "../StoryForm";
import "./styles.css";
import { useDispatch } from "react-redux";
import { getStories } from "../../actions/stories";

const Home = () => {
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStories());
  }, [dispatch]);

  return (
    <div id="home">
      <div id="content">
        <StoryForm selectedId={selectedId} setSelectedId={setSelectedId} />
        <h1 id="stories_title">Stories</h1>
        <StoryList setSelectedId={setSelectedId} />
      </div>
    </div>
  );
};

export default Home;
