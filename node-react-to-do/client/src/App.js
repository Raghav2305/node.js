import React, { useState, useEffect } from "react";

export default function APP() {
  const [backendData, setBackendData] = useState({ tasks: [] });

  useEffect(() => {
    fetch("http://localhost:8080/")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <div>
      {backendData.tasks.map((task, i) => (
        <div key={i}>
          <h3>Title: {task.title}</h3>
          <p>Contents: {task.contents}</p>
          <p>Created: {task.created}</p>
        </div>
      ))}
    </div>
  );
}
