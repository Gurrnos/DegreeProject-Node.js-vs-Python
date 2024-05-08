import { useState } from "react";

const Login = () => {
    const [userData, setUserData] = useState({
        username: "",
        password: "",
    })
  function handleChange(e) {
    const { name, value } = e.target;

    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  function Login(e) {
    const data = {
        ...userData
    }
  }

  return (
    <>
      <div>
        <form onSubmit={Login}>
          <input type="text" id="username" name="username" required onChange={handleChange}/>
          <input type="password" id="password" name="password" required onChange={handleChange}/>
          <input type="submit" value="Login"/>
        </form>
      </div>
    </>
  );
};
export default Login;
