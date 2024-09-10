import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthFormPage from "./pages/AuthFormPage";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Not found</h1>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/user-form",
        element: (
          <ProtectedRoute>
            <AuthFormPage />
          </ProtectedRoute>
        )
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      
    ],
  },
  
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
