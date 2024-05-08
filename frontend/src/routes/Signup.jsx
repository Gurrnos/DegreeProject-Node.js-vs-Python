import { useState, useEffect } from "react";

const Signup = () => {

  const [userData, setUserData] = useState({
    username: "",
    password: ""
  })

  function handleChange(e) {
    const { name, value } = e.target;

    setUserData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  function Signup(e) {

    e.preventDefault();

    const data = {
      ...userData
    };

    fetch("http://localhost:8080/Signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to sign up")
        }
        return response.text();
      })
      .then ((text) => {
        console.log(text);
        alert("User created successfully")
      })
      .catch((error) => {
        console.log("Failed to sign up:", error.message);
      })
  }

  return (
    <>
        <form onSubmit={Signup}>
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
            <input type="submit" value="Signup" />
          </div>
        </form>
    </>
  );
};
export default Signup;
