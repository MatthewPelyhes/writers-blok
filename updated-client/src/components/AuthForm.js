import React, { useState} from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Alert from "./Alert";

const AuthForm = ({ buttonText, register, login, heading, onAuth, errors, removeError }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    const authType = register ? "register" : "login";
    onAuth(authType, {email, username, password}).then(() => {
      if(register){
        Alert("Welcome!", "Thank you for joining Writer's BLOK! We're glad to have you here. Happy writing!")
      } else{
        Alert("Welcome Back!", "Happy writing!")
      }
      history.push("/home")
      console.log("LOGGED IN!");
    }).catch(() => {
      return;
    })
  };

  if (errors.message) {
    const unlisten = history.listen(() => {
      removeError()
      unlisten()
    })
  }

  return(
    <div>
      <h3>{heading}</h3>
      {errors.message && <div className="error">{errors}</div>}
      <form className="form-container" onSubmit={handleSubmit}>
        {register && (
              <div>
                <label htmlFor="email"></label>
                <input className="input" type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} required placeholder="Enter Email" />
              </div>
            )}
          <div>
              <label htmlFor="username"></label>
              <input className="input" type="text" id="username" name="username" required onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Enter Username" />
            </div>
            <div>
              <label htmlFor="password"></label>
              <input className="input" type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} required placeholder="Enter Password" />
            </div>
           {login && (
             <p>Don't have an account? <Link to="/register" className="register-link">Register Here</Link></p>
           )}
        <button type="submit" className="save-button">{buttonText}</button>
      </form>
    </div>
  )
}

export default AuthForm;
