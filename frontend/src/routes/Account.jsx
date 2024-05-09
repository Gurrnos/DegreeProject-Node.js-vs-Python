import { useState, useEffect } from "react";

const Account = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    GetUser();
  }, []);

  function GetUser() {
    const auth = document.cookie.split('; ').find(row => row.startsWith('_auth='))?.split('=')[1];

    fetch("http://localhost:8080/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token: auth })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error getting user");
        }
        return response.json();
      })
      .then((data) => {
        setUsername(data.username); 
      })
      .catch((error) => {
        console.error("Error fetching user", error.message);
      });
  }

  function logOut() {
    document.cookie = `_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    window.location.href = "/"
  }

  return (
    <>
      <h1> Account </h1>
      <h3> Welcome, {username} </h3>

      <button onClick={logOut}>Log out</button>
    </>
  );
};

export default Account;
