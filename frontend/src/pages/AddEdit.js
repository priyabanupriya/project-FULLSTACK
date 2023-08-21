import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // Make sure you import the 'toast' component
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for the toast notifications
import './AddEdit.css';

const initialState = {
  name: '',
  email: '',
  contact: '',
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${id}`);
      if (response.status === 200) {
        setState({ ...response.data }); // Removed [0] since we expect a single user object
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target; // Changed 'userName' to 'name'
    setState({
      ...state,
      [name]: value,
    });
  };

  const addUser = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/user', data);
      if (response.status === 200) {
        toast.success(response.data);
        history('/');
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const updateUser = async (data, id) => {
    try {
      const response = await axios.put(`http://localhost:5000/user/${id}`, data);
      if (response.status === 200) {
        toast.success(response.data);
        history('/');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, contact } = state; // Destructure values from state
    if (!name || !email || !contact) {
      toast.error('Please provide a value for each input field');
    } else {
      if (!id) {
        addUser(state);
      } else {
        updateUser(state, id);
      }
    }
  };

  const { name, email, contact } = state; // Destructure values from state

  return (
    <div style={{ marginTop: '50px' }}>
      <form
        style={{
          margin: 'auto',
          padding: '15px',
          maxWidth: '400px',
          alignContent: 'center',
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Enter Your Name'
          onChange={handleInputChange}
          value={name}
        />
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Enter Your Email Id'
          onChange={handleInputChange}
          value={email}
        />
        <label htmlFor='contact'>Contact</label>
        <input
          type='number'
          id='contact'
          name='contact'
          placeholder='Enter Your Contact No'
          onChange={handleInputChange}
          value={contact}
        />
        <input type='submit' value={id ? 'Update' : 'Add'} />
      </form>
    </div>
  );
};

export default AddEdit;
