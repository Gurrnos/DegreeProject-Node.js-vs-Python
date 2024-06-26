import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Index from "./routes/Index.jsx";
import Login from "./routes/Login.jsx";
import Signup from "./routes/Signup.jsx";
import Account from "./routes/Account.jsx"

const Content = () => {
  return (
    <>
      <div id="content">
        <Outlet />
      </div>
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Content />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "Signup",
        element: <Signup />,
      },
      {
        path: "Account",
        element: <Account />
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
