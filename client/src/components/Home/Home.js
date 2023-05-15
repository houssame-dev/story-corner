import React, { useEffect, useState } from 'react'
import StoryList from '../StoryList'
import StoryForm from '../StoryForm'
import "./styles.css"
import { Layout } from 'antd'
import { useDispatch } from 'react-redux';
import { getStories } from '../../actions/stories'

const { Content } = Layout;

const Home = () => {
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStories());
  }, [dispatch]);

  return (
    <Layout id='layout_home'>
      <Content id='content'>
        <StoryForm selectedId={selectedId} setSelectedId={setSelectedId} />

        <h1 id='stories_title'>Stories</h1>

        <StoryList setSelectedId={setSelectedId} />
      </Content>
    </Layout>
  )
}

export default Home
