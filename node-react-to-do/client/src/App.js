import React, { useState, useEffect } from "react";
import Table from "./Components/Table";
import axios from "axios";
import Delete from "./Components/Delete"

export default function APP() {
  const [backendData, setBackendData] = useState({ tasks: [] });
  const [formData, setFormData] = useState({title: "" , contents: ""});

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const queryParams =`?title=${formData.title}&contents=${formData.contents}`;
    

    fetch(`http://localhost:8080/notes/create${queryParams}`, {
      method: "POST", 
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json()
      
    })
    .then((data) => {
      
      setBackendData(data)
      setFormData({title: "" , contents: ""})
    })
    .catch((error) => {
      console.log(error);
    })

    
  
  }

  useEffect(() => {
    fetch("http://localhost:8080/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        
        setBackendData(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [backendData]);

  return (
    <div>

      <h1 className="app-title">My Notes App</h1>

      <div className="form-container">
    <form onSubmit={handleFormSubmit}>
      <input
        onChange={(e) =>
          setFormData({
            ...formData,
            title: e.target.value,
          })
        }
        placeholder="Title"
        className="form-input"
        label="Title"
        id="input1"
        type="text"
      />

      <input
        onChange={(e) =>
          setFormData({
            ...formData,
            contents: e.target.value,
          })
        }
        placeholder="Contents"
        className="form-input"
        label="Contents"
        id="input2"
        type="text"
      />

      <button className="form-button" type="submit">
        Create New Note
      </button>
    </form>
  </div>

      <Table 
        onBackendData = {backendData.tasks}
      />

      <Delete setBackendData={setBackendData} />

    </div>
    
  );
}
