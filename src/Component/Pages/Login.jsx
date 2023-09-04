import React, { useState } from 'react'
import styles from './login.module.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://fine-cyan-bunny-gown.cyclic.app/login', {
      email,password
    })
    .then(function (response) {
      console.log(response);
      localStorage.setItem("token",response.data.token);
       navigate("/mytask");
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.email}>
          <label className={styles.myLabel}>Email</label><br />
          <input className={styles.loginInput} type="email" placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} /><br />
          </div>

          <div className={styles.password}>
          <label className={styles.myLabel}>Password</label><br />
          <input className={styles.loginInput} type="password" placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)}/><br />
          </div>

          <input className={styles.loginBtn} type='submit' value='Login' />

          <p>don't have an account , Signup from <span><Link to='/signup'>here</Link></span> </p>

          <h3>Or</h3>
          <button className={styles.googleBtn}>Continue with Google</button>
          <br />
          <button className={styles.githubBtn}>Continue with Github</button>

        </form>
      </div>
    </div>
  )
}

export default Login
