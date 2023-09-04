import React, { useState } from 'react'
import styles from './signup.module.css';
import axios from 'axios';

const Signup = () => {

  const [user,setUser] = useState({
    name: "",
    city: "",
    email: "",
    password: ""
  })
  
  const [msg,setMsg] = useState("");

  const handleChange = (e) => {
    setUser({...user , [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://fine-cyan-bunny-gown.cyclic.app/signup', {
      name: user.name,
      city: user.city,
      email: user.email,
      password: user.password
    })
    .then(function (response) {
      console.log(response);
      setMsg(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  return (
    <div className={styles.signupContainer}> 
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label className={styles.myLabel}>Name</label><br />
            <input name='name' className={styles.myInput} type="text" placeholder='Enter your name' onChange={(e) => handleChange(e)}/>
          </div>

          <div>
            <label className={styles.myLabel}>City</label><br />
            <input name='city' className={styles.myInput} type="text" placeholder='Enter your city' onChange={(e) => handleChange(e)} />
          </div>

          <div>
            <label className={styles.myLabel}>Email</label><br />
            <input name='email' className={styles.myInput} type="email" placeholder='Enter your email' onChange={(e) => handleChange(e)} />
          </div>

          <div>
            <label className={styles.myLabel}>Password</label><br />
            <input name='password' className={styles.myInput} type="password" placeholder='Enter your Password' onChange={(e) => handleChange(e)} /><br />
          </div>

          {/* <div>
            <label className={styles.myLabel}>Confirm Password</label><br />
            <input className={styles.myInput} type="password" placeholder='Enter your confirm password' />
          </div> */}

          <input className={styles.submitBtn} type="submit" value="Signup" />
          <h3>{msg}</h3>
        </form>
      </div>
    </div>
  )
}

export default Signup
