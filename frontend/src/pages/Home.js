import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const onDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user record?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/user/${id}`);
        if (response.status === 200) {
          toast.success(response.data);
          getUsers();
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div style={{ marginTop: '50px'}}>
      <table className='styled-table'>
        <thead style={{border :'2px solid #009879'}}>
          <tr>
            <th style={{ textAlign: 'center' }}>No</th>
            <th style={{ textAlign: 'center' }}>Name</th>
            <th style={{ textAlign: 'center' }}>Email</th>
            <th style={{ textAlign: 'center' }}>Contact</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody style={{border :'2px solid #009879'}}>
          {data &&
            data.map((item, index) => (
              <tr key={item.id}>
                <th scope='row'>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className='btn btn-edit'>Edit</button>
                  </Link>
                  

                  <button className='btn btn-delete' onClick={() => onDeleteUser(item.id)}>
                    Delete
                  </button>
                  <Link to={`/view/${item.id}`}>
                    <button className='btn btn-view'>View</button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
