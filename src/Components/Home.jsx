import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Styles.css';

const Home = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    age: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/users/${id}`)
      .then(() => {
        setData(data.filter(item => item.id !== id));
      })
      .catch((error) => {
        console.error('There was an error deleting the user!', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/users', formData)
      .then((res) => {
        setData([...data, res.data]);
        setFormData({
          id: '',
          name: '',
          email: '',
          age: ''
        });
      })
      .catch((error) => {
        console.error('There was an error adding the data!', error);
      });
  };

  return (
    <div className="container">
      <h1>CRUD App</h1>
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={formData.id}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <button type="submit">Add User</button>
      </form> */}
      <Link to="/create"><button>Create</button></Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.age}</td>
              <td className="buttons">
                <button onClick={() => handleDelete(item.id)}>Delete</button>
                <Link to={`/edit/${item.id}`}><button>Edit</button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;