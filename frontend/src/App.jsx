import { Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import SingleBlog from "./pages/SingleBlog";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
       <Route path="/blog/:slug" element={
        <ProtectedRoute>
          <SingleBlog/>
        </ProtectedRoute>
       }></Route>
    </Routes>
  );
};
export default App;
