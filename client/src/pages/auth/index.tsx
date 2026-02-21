import {useState,type SyntheticEvent} from 'react'
import axios from 'axios'
import {useCookies} from 'react-cookie'
import { UserErrors } from '../../models/errors';
import {useNavigate} from 'react-router-dom'
import "./styles.css"

export const AuthPage=()=>{
    return (
        <div className="auth">
            <Register/>
            <Login/>
        </div>
    )
}

const Register =()=>{
    const [username,setUsername] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const handleSubmit = async(event:SyntheticEvent) =>{
        event.preventDefault()
        try {
        await axios.post("http://localhost:3001/users/register",{
            username,
            password,
        });
        alert("Registration Completed! Now Login.");
        }catch(err){
            if(err?.response?.data?.type === UserErrors.USERNAME_ALREADY_EXISTS){
                alert("ERROR : Username already in use")
            }else{
                alert("ERROR : Something went wrong")
            }
        }
    };
    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input 
                    type="text" 
                    id="username"
                    value={username}
                    onChange={(event)=>setUsername(event.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" 
                    id="password"
                    value={password}
                    onChange={(event)=>setPassword(event.target.value)}/>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};


const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [_, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      const result = await axios.post("http://localhost:3001/users/login", {
        username,
        password,
      });
        setCookies("access_token", result.data.token, { path: "/" });
        localStorage.setItem("userId", result.data.userId);
        navigate("/");
    }  catch (err) {
  let errorMessage: string = "Something went wrong";

  const errorType = err?.response?.data?.type;

  switch (errorType) {
    case UserErrors.NO_USER_FOUND:
      errorMessage = "User doesn't exist";
      break;

    case UserErrors.WRONG_CREDENTIALS:
      errorMessage = "Wrong username/password combination";
      break;

    default:
      errorMessage = "Something went wrong";
  }

  alert("ERROR: " + errorMessage);
}
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="form-group">
          <label htmlFor="login-username">Username:</label>
          <input
            type="text"
            id="login-username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="login-password">Password:</label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};