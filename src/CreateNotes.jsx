
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useNavigate } from "react-router-dom";

function CreateNotes() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [userSave, setUserSave] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
    const navigate = useNavigate();

  const animatedComponents = makeAnimated();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const userData = await axios.get('http://localhost:3000/user', {
          headers: { token },
        });
        setUserSave(userData?.data?.user || []);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user data.');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You are not authenticated. Please log in.');
      return;
    }

    let createdBy;
    try {
      const decodedToken = jwtDecode(token);
      createdBy = decodedToken.id;
    } catch (err) {
      setError('Invalid token. Please log in again.');
      return;
    }

    const body = { title, content, subject, createdBy, collaborators };

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3000/note', body, {
        headers: {
          'Content-Type': 'application/json',
          token,
        },
      });

      if (response.data.message) {
        setSuccess('Note created successfully!');
        setTitle('');
        setContent('');
        setSubject('');
        setCollaborators([]);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while creating the note.');
    } finally {
      setLoading(false);
    }
  };

  const valueOptions = userSave.map((data) => ({
    value: data.name,
    label: data.name,
    id: data._id,
  }));

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 bg-white shadow-lg rounded-lg border mt-10">
      <h2 className="text-2xl font-extrabold text-blue-600 text-center mb-6">
        Create a Note
      </h2>

      {success && <p className="text-green-500 font-semibold mb-4">{success}</p>}
      {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter content"
            rows="4"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="subject">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter subject"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="collaborators"
          >
            Select Collaborators
          </label>
          <Select
            components={animatedComponents}
            isMulti
            options={valueOptions}
            value={valueOptions.filter((option) =>
              collaborators.includes(option.id)
            )}
            onChange={(selectedOptions) => {
              const selectedIds = selectedOptions.map((option) => option.id);
              setCollaborators(selectedIds);
            }}
            className="mt-1"
          />
        </div>

        <button
        onClick={() => navigate("/setting")}
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-white font-semibold rounded-md ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          } transition duration-300`}
        >
          {loading ? 'Creating...' : 'Create Note'}
        </button>
      </form>
    </div>
  );
}

export default CreateNotes;
