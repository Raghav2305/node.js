import react, {useState} from "react";

export default function Delete(props){

    const [ID, setID] = useState("")

    const handleButtonClick = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/notes/delete/${ID}`, {
            
        method: "DELETE",
        })
        .then((response) => {
            if(!response.ok){
                throw new Error("Network Error")
            }

            return response.json();
        })
        .then((data) => {
            props.setBackendData(data);
        })
        .catch((error) => {
            console.log("Error", error)
        })

        setID("");
    }

    return(
        <div className="delete-div">
    <form onSubmit={handleButtonClick} className="delete-form">
      <label htmlFor="delButton">
       <b>Enter the ID of the note you want to delete</b> 
      </label>

      <input
      className="delete-input"
        type="text"
        value={ID}
        onChange={(e) => setID(e.target.value)}
        placeholder="ID"
      />

      <button className="delete-button" type="submit">
        Delete
      </button>
    </form>
  </div>
    )
}