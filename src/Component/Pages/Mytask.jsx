import React, { useState, useEffect } from 'react'
import styles from './mytask.module.css';
import axios from 'axios';

const Mytask = () => {
  const [title, setTitle] = useState("");
  const [todo, setTodo] = useState([]);


  const getDataFromAPI = () => {
    axios.get('https://fine-cyan-bunny-gown.cyclic.app/blog', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(function (response) {
        // handle success
        console.log(response.data.tasks);
        setTodo(response.data.tasks);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  useEffect(() => {
    getDataFromAPI();
  }, [])


  const handleAdd = () => {
    axios.post('https://fine-cyan-bunny-gown.cyclic.app/blog/create', {
      title: title,
      status: false
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(function (response) {
        console.log("added");
        console.log(response);
        getDataFromAPI();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <h2>My Tasks List</h2>
      <input className={styles.myinput} type="text" placeholder='Add a new Task' onChange={(e) => setTitle(e.target.value)} />
      <button disabled={title.length === 0} className={styles.addbtn} onClick={handleAdd}>Add</button>

      <div>
        {todo.map((elem, idx) =>
          <div key={idx}>
            <h2>{elem.title}</h2>
            <button>{elem.status ? "Mark as Pending" : "Mark as Complete"}</button>
            <button>Delete</button>
          </div>
        )}
      </div>

    </div>
  )
}

export default Mytask
