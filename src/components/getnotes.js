import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GetNote() {
  const [userNote, setUserNote] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedData, setEditedData] = useState({ title: '', note: '' });

  useEffect(() => {
    axios.get('https://64facf36cb9c00518f7a35f4.mockapi.io/notes')
      .then((response) => {
        console.log(response);
        setUserNote(response.data);
      });
  }, []);
  

  const handleEditClick = (id) => {
    setEditMode(id);
    const selectedData = userNote.find((data) => data.id === id);
    setEditedData({ title: selectedData.title, note: selectedData.note });
  };

  const handleUpdateClick = (id) => {
    axios.put(`https://64facf36cb9c00518f7a35f4.mockapi.io/notes/${id}`, editedData)
      .then((response) => {
        console.log(response);
        setEditMode(null);
        // Update the local userNote state with the edited data
        setUserNote((prevUserNote) =>
          prevUserNote.map((data) => (data.id === id ? { ...data, ...editedData } : data))
        );
      });
  };

  const handleDeleteClick = (id) => {
    axios.delete(`https://64facf36cb9c00518f7a35f4.mockapi.io/notes/${id}`)
      .then((response) => {
        console.log(response);
        // Remove the deleted item from the local userNote state
        setUserNote((prevUserNote) => prevUserNote.filter((data) => data.id !== id));
      });
  };

  return (
    <div className="container">
      <h1>User Notes</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userNote.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>
                {editMode === data.id ? (
                  <input
                    type="text"
                    value={editedData.title}
                    onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
                  />
                ) : (
                  data.title
                )}
              </td>
              <td>
                {editMode === data.id ? (
                  <input
                    type="text"
                    value={editedData.note}
                    onChange={(e) => setEditedData({ ...editedData, note: e.target.value })}
                  />
                ) : (
                  data.note
                )}
              </td>
              <td>
                {editMode === data.id ? (
                  <>
                    <button
                      className="btn btn-success"
                      onClick={() => handleUpdateClick(data.id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => setEditMode(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEditClick(data.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteClick(data.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GetNote;
