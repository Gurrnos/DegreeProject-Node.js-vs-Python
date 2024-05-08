import { useState } from "react";

const Login = () => {
  
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function Login(e) {

    e.preventDefault();

    const data = {
      ...userData,
    };
    fetch("http://localhost:8080/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to log in");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Logged in");
        alert("Successfully logged in")
      })
      .catch((error) => {
        console.error(error.message);
        alert("Failed to log in")
      });
  }

  return (
    <>
      <form onSubmit={Login}>
        <div id="loginWrapper">
          <input
            type="text"
            id="username"
            name="username"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={handleChange}
          />
        </div>
        <div className="submit">
          <input type="submit" value="Login" />
        </div>
      </form>
    </>
  );
};
export default Login;
