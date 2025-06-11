import { Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import SingleBlog from "./pages/SingleBlog";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuth from "./context/AuthContext";
import AuthorDashboard from "./pages/AuthorDashboard";
const App = () => {
let {user}=useAuth()
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}>
      
      </Route>
       <Route path="/blog/:slug" element={
        <ProtectedRoute>
          <SingleBlog/>
        </ProtectedRoute>
       }></Route>
      {user.role==="author" && <Route path="/dashboard" element={<ProtectedRoute>
        <AuthorDashboard/>
       </ProtectedRoute>}></Route>}
    </Routes>
  );
};
export default App;
