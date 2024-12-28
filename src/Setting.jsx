
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Options() {
  const [myNotes, setMyNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 5;

  const [state, setState] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('');
  const [id, setId] = useState('');

  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const userId = decoded.id;
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, myNotes]);

  const getData = async () => {
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/note?userId=${userId}`
      );
      setMyNotes(response.data.notes || []);
    } catch (err) {
      console.log('Error fetching notes:', err);
      setMyNotes([]);
    }
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = myNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.subject.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
    );
    setFilteredNotes(filtered);
  };

  const handleUpdate = (note) => {
    setState(true);
    setTitle(note.title);
    setSubject(note.subject);
    setContent(note.content);
    setId(note._id);
  };

  const handleSubmit = async (id) => {
    const body = { title, subject, content };
    try {
      const updateNotes = await axios.patch(
        `http://localhost:3000/note/${id}`,
        body,
        {
          headers: {
            token: token,
          },
        }
      );
      if (updateNotes) {
        toast.success('Notes updated successfully');
        getData();
        setState(false);
      }
    } catch (err) {
      toast.error('An error occurred! Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const deleteNote = await axios.delete(`http://localhost:3000/note/${id}`, {
        headers: {
          token: token,
        },
      });
      if (deleteNote) {
        toast.success('Note deleted');
        getData();
      }
    } catch (err) {
      toast.error('An error occurred! Please try again.');
    }
  };

  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);
  const paginatedNotes = filteredNotes.slice(
    (currentPage - 1) * notesPerPage,
    currentPage * notesPerPage
  );

  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <h1 className="text-4xl font-semibold text-gray-800 text-center py-5">
        My Notes
      </h1>
      <div className="flex justify-between p-3 mx-5">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/2 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 transition"
          >
            Go Back to Home
          </button>
          <button
            onClick={() => navigate('/note/create')}
            className="px-4 py-2 bg-gray-800 text-white rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 transition"
          >
            + Create Note
          </button>
        </div>
      </div>
      <div className="flex flex-col space-y-6 px-4">
        {paginatedNotes.map((note, key) => (
          <div
            key={key}
            className="bg-slate-300 rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Title: {note.title}
                </h2>
                <h3 className="text-xl text-gray-600 mb-4">
                  Subject: {note.subject}
                </h3>
                <p className="text-gray-700 text-base">Content: {note.content}</p>
                <p className="text-gray-700 text-sm mb-2">
                  Created at:{' '}
                  {new Date(note.createdAt).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </p>
                {note.lastEditedAt && (
                  <p className="text-gray-700 text-sm mb-2">
                    Last edited at:{' '}
                    {new Date(note.lastEditedAt).toLocaleString('en-US', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleUpdate(note)}
                  className="px-4 py-2 bg-gray-800 text-white rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => changePage(i + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === i + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-800'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {/* Conditional form */}
      {state && (
        <form className="mx-auto my-9 max-w-2xl p-8 bg-slate-300 rounded-3xl shadow-2xl">
          <h3 className="text-4xl font-semibold text-gray-800 mb-6 text-center">
            Edit Note
          </h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button
            onClick={() => handleSubmit(id)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            Save
          </button>
          <button
            onClick={() => setState(false)}
            className="px-6 py-2 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          >
            Cancel
          </button>
        </form>
      )}
    </>
  );
}

export default Options;
