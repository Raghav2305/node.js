import React, { useState, useEffect } from "react";

export default function Table(props){

  
    return ( 
      <div>
      <table className="table">
    <thead>
      <tr className="table-header">
        <th scope="col">#</th>
        <th scope="col">Title</th>
        <th scope="col">Contents</th>
        <th scope="col">Created</th>
      </tr>
    </thead>
    <tbody>
      {props.onBackendData &&
        props.onBackendData.map((task, i) => (
          <tr key={i} className="table-row">
            <th scope="row">{task.id}</th>
            <td>{decodeURIComponent(task.title)}</td>
            <td>{decodeURIComponent(task.contents)}</td>
            <td>{task.created}</td>
          </tr>
        ))}
    </tbody>
  </table>
    </div>
  );
}