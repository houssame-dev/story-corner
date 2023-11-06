import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from "antd";
import FileBase64 from "react-file-base64";
import "./styles.css";
import { createStory, updateStory } from "../../actions/stories";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { BiLogInCircle } from "react-icons/bi";
import {
  AiOutlineClose,
  AiOutlineForm,
  AiOutlinePlus,
  AiOutlineTag,
} from "react-icons/ai";

function StoryForm({ selectedId, setSelectedId }) {
  const story = useSelector((state) =>
    selectedId ? state.stories.find((story) => story._id === selectedId) : null
  );
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const user = JSON.parse(localStorage.getItem("profile"));
  const username = user?.result?.username;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (formValues) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      if (selectedId) {
        await dispatch(updateStory(selectedId, { ...formValues, username }));
      } else {
        await dispatch(createStory({ ...formValues, username }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      reset();
    }
  };

  useEffect(() => {
    if (story) {
      form.setFieldsValue(story);
    }
  }, [story, form]);

  const reset = () => {
    form.resetFields();
    setSelectedId(null);
  };

  if (!user) {
    return (
      <Card id="form_card">
        <span level={4}>
          <h1>Welcome to Story Corner.</h1> <br />
          <h3>
            <Link to="/authform">
              <BiLogInCircle /> Login
            </Link>{" "}
            to share stories !
          </h3>
        </span>
      </Card>
    );
  }
  return (
    <Card id="formCard">
      <span id="formTitle" level={4}>
        {selectedId ? "Editing" : "Share"} a Story
      </span>
      <Form id="form" form={form} layout="horizontal" onFinish={onSubmit}>
        <Form.Item name="caption" rules={[{ required: true }]}>
          <Input prefix={<AiOutlineForm />} placeholder="Caption" allowClear />
        </Form.Item>

        <Form.Item name="tags" rules={[{ required: true }]}>
          <Input prefix={<AiOutlineTag />} placeholder="Tags" allowClear />
        </Form.Item>

        <Form.Item name="image" rules={[{ required: true }]}>
          <div className="input-file">
            <FileBase64
              type="file"
              multiple={false}
              onDone={(e) => {
                form.setFieldsValue({
                  image: e.base64,
                });
              }}
            />
          </div>
        </Form.Item>

        <Form.Item id="form_buttons">
          <div id="story_buttons">
            <Button type="submit" disabled={isSubmitting}>
              <AiOutlinePlus /> {isSubmitting ? "Sharing..." : "Share"}
            </Button>

            {!selectedId ? null : (
              <Button
                type="submit"
                onClick={reset}
                style={{ backgroundColor: "red" }}
              >
                <AiOutlineClose /> Cancel
              </Button>
            )}
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default StoryForm;
