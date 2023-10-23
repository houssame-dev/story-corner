import Swal from 'sweetalert2'; // Import SweetAlert2

import * as api from '../api';
import {
  AUTHENTICATION
} from '../constants/actionTypes';

const signup = (formValues, navigate) => async dispatch => {
  try {
    const { data } = await api.signup(formValues);
    dispatch({ type: AUTHENTICATION, data: data });

    // Show a success message with SweetAlert2
    Swal.fire({
      title: 'Success',
      text: 'Your account was created successfully',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
    });

    navigate("/");
  } catch (error) {
    console.log(error);

    // Show an error message with SweetAlert2
    Swal.fire({
      title: 'Error',
      text: 'Failed to signup',
      icon: 'error',
    });
  }
};

const login = (formValues, navigate) => async dispatch => {
  try {
    const { data } = await api.login(formValues);
    dispatch({ type: AUTHENTICATION, data: data });

    // Show a success message with SweetAlert2
    Swal.fire({
      title: 'Success',
      text: 'You have successfully logged in',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
    });

    navigate("/");
  } catch (error) {
    console.log(error);

    // Show an error message with SweetAlert2
    Swal.fire({
      title: 'Error',
      text: 'Login failed',
      icon: 'error',
    });
  }
};

export { signup, login };
