import axios from 'axios';
import styles from './Login.module.css';

const Login = () => {

    const logIn = () => {
        const resp = axios.post('http://localhost:5000/auth/login', {
          email: "test2@mail.com",
          password: "test1234"
        });
        console.log(resp)
    }

  return (
    <div className={styles.mainWrapper}>
        <label htmlFor="email">Username</label>
        <input type="text" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button onClick={logIn}>Log in</button>
    </div>
  )
}

export default Login