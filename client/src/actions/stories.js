import Swal from "sweetalert2"; // Import SweetAlert2

import * as api from "../api";
import {
  FETCH_ALL_STORIES,
  CREATE_STORY,
  UPDATE_STORY,
  DELETE_STORY,
} from "../constants/actionTypes";

export const getStories = () => async (dispatch) => {
  try {
    const { data } = await api.fetchStories();
    dispatch({ type: FETCH_ALL_STORIES, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createStory = (story) => async (dispatch) => {
  try {
    const { data } = await api.createStory(story);
    dispatch({ type: CREATE_STORY, payload: data });

    // Show a success message with SweetAlert2
    Swal.fire({
      title: "Success",
      text: "Story created successfully",
      icon: "success",
      showConfirmButton: false,
      timer: 3000,
    });
  } catch (error) {
    console.log(error.message);

    // Show an error message with SweetAlert2
    Swal.fire({
      title: "Error",
      text: "Failed to create the story",
      icon: "error",
    });
  }
};

export const updateStory = (id, story) => async (dispatch) => {
  try {
    const { data } = await api.updateStory(id, story);
    dispatch({ type: UPDATE_STORY, payload: data });

    // Show a success message with SweetAlert2
    Swal.fire({
      title: "Success",
      text: "Story updated successfully",
      icon: "success",
      showConfirmButton: false,
      timer: 3000,
    });
  } catch (error) {
    console.log(error.message);

    // Show an error message with SweetAlert2
    Swal.fire({
      title: "Error",
      text: "Failed to update the story",
      icon: "error",
    });
  }
};

export const deleteStory = (id, story) => async (dispatch) => {
  try {
    await api.deleteStory(id);
    dispatch({ type: DELETE_STORY, payload: id });

    // Show a success message with SweetAlert2
    Swal.fire({
      title: "Success",
      text: "Story deleted successfully",
      icon: "success",
      showConfirmButton: false,
      timer: 3000,
    });
  } catch (error) {
    console.log(error.message);

    // Show an error message with SweetAlert2
    Swal.fire({
      title: "Error",
      text: "Failed to delete the story",
      icon: "error",
    });
  }
};

export const likeStory = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeStory(id);
    dispatch({ type: UPDATE_STORY, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
