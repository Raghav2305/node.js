import React, { useState, useEffect } from "react";

export default function Table(props){

    return (
      
      <div>
      <table className="table">
        <thead>
          <tr className="justify-content-center">
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Contents</th>
            <th scope="col">Created</th>
          </tr>
        </thead>
        <tbody>
          {props.onBackendData.map((task, i) => (
            <tr key={i} className="justify-content-center">
              <th scope="row">{task.id}</th>
              <td>{task.title}</td>
              <td>{task.contents}</td>
              <td>{task.created}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}