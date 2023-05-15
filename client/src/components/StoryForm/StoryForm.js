import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Form, Input, Typography, Button } from 'antd';
import { PlusOutlined, CloseOutlined, TagOutlined, FormOutlined, SmileTwoTone, LoginOutlined } from '@ant-design/icons';
import FileBase64 from 'react-file-base64';
import './styles.css';
import { createStory, updateStory } from '../../actions/stories';
import { Link } from 'react-router-dom';
const { Title } = Typography;

function StoryForm({ selectedId, setSelectedId }) {
  const story = useSelector((state) => selectedId ? state.stories.find(story => story._id === selectedId) : null);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const user = JSON.parse(localStorage.getItem("profile"));
  const username = user?.result?.username;

  const onSubmit = (formValues) => {
    selectedId
      ?
      dispatch(updateStory(selectedId, { ...formValues, username }))
      :
      dispatch(createStory({ ...formValues, username }));
    reset();
  };

  useEffect(() => {
    if (story) {
      form.setFieldsValue(story);
    }
  }, [story, form]);

  const reset = () => {
    form.resetFields();
    setSelectedId(null);
  }

  if (!user) {
    return (
      <Card id='form_card'>
        <Title level={4}>
          Welcome to Story Corner.
          Please, you must first <Link to="/authform"> <LoginOutlined /> Login</Link>  {" "}
          to be able to share stories <SmileTwoTone />  !
        </Title>
      </Card>
      
    )
  }
  return (
    <Card id="formCard">
      <Title id="formTitle" level={4}>
        {selectedId ? "Editing" : "Share"} a Story
      </Title>
      <Form
        id='form'
        form={form}
        layout="horizontal"
        onFinish={onSubmit}
      >

        <Form.Item
          name="caption"
          rules={[{ required: true }]}
        >
          <Input prefix={<FormOutlined />} placeholder='Caption' allowClear />
        </Form.Item>

        <Form.Item name="tags" rules={[{ required: true }]}>
          <Input prefix={<TagOutlined />} placeholder='Tags' allowClear />
        </Form.Item>

        <Form.Item name="image" rules={[{ required: true }]}>
          <div className="input-file">
            <FileBase64 type="file" multiple={false} onDone={(e) => {
              form.setFieldsValue({
                image: e.base64,
              });
            }}
            />
          </div>

        </Form.Item>

        <Form.Item >

          <Button shape="round" style={{ fontFamily: 'Lucida Console, Courier New, monospace', maxWidth: 100 }} type="primary" block htmlType="submit">
            <PlusOutlined /> <span style={{ fontWeight: 900 }}>Share</span>
          </Button>

          {!selectedId ? null :

            <Button shape="round" style={{ fontFamily: 'Lucida Console, Courier New, monospace', maxWidth: 100, marginLeft: 10 }} danger type="primary" block htmlType="submit" onClick={reset}>
              <CloseOutlined /> <span style={{ fontWeight: 900 }}>Cancel</span>
            </Button>
          }

        </Form.Item>

      </Form>
    </Card>
  );
}

export default StoryForm;
