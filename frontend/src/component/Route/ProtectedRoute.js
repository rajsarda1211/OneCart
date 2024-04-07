import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {
  const navigate = useNavigate();
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading === false) {
    if (isAuthenticated === false) {
      return navigate("/login");
    }
    if(isAdmin === true && user.role !== "admin"){
      return navigate("/login");
    }
    return children;
  }
};

export default ProtectedRoute;
