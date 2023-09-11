import React, { useState } from 'react';
import axios from 'axios';


function Crud() {
  const data = { title: '', note: '' };

  const [inputNote, setInputNote] = useState(data);

  const handleData = (e) => {
    setInputNote({ ...inputNote, [e.target.name]: e.target.value });
  };

  const handlleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://64facf36cb9c00518f7a35f4.mockapi.io/notes',inputNote)
      .then((response) => {
        console.log(response);
        window.location.reload();
      });
  };

  const handlleUpdate = (e) => {
    e.preventDefault();
    axios.put('https://64facf36cb9c00518f7a35f4.mockapi.io/notes/1', inputNote)
      .then((response) => {
        console.log(response);
      });
  };

  const handlleDelete = (e) => {
    e.preventDefault();
    axios.delete('https://64facf36cb9c00518f7a35f4.mockapi.io/notes/1')
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="container">
      <h1>Welcome to Note-Taker</h1>
      <form>
        <div className="form-group">
          <label>Title :</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={inputNote.title}
            onChange={handleData}
          />
        </div>
        <div className="form-group">
          <label>Note :</label>
          <textarea
            className="form-control"
            name="note"
            value={inputNote.note}
            onChange={handleData}
          />
        </div>
        <br></br>
        <button className="btn btn-primary" onClick={handlleSubmit}>Submit</button>
        <button className="btn btn-success" onClick={handlleUpdate}>Update</button>
        <button className="btn btn-danger" onClick={handlleDelete}>Delete</button>
      </form>
      <hr />
    </div>
  );
}

export default Crud;
