const Index = () => {
  return (
    <>
      <div id="wrapper">
        <button onClick={() => (location.href = "/Login")}>Login</button>
        <button onClick={() => (location.href = "/Signup")}>Sign Up</button>
      </div>
    </>
  );
};
export default Index;
