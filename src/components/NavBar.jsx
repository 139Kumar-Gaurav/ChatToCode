import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";
import { useContext } from "react";
import { ThemeContext } from "../App";

const NavBar = () => {
  const theme = useContext(ThemeContext);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    axios
      .post(BASE_URL + "/logout", {}, { withCredentials: true })
      .then(() => {
        dispatch(removeUser());
        dispatch(removeFeed());
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={`navbar ${theme.components.navbar.bg} ${theme.components.navbar.shadow}`}>
      <div className="flex-1">
        <Link className={`btn btn-ghost text-2xl font-bold ${theme.components.navbar.text} hover:bg-blue-700`} to={"/"}>
          💬 C-T-C
        </Link>
      </div>
      {user && (
        <div className="flex gap-4 items-center">
          <p className="text-white font-semibold hidden sm:block">Welcome, {user.firstName}! 👋</p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar mx-5"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.imageUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-lg z-50 mt-3 w-52 p-2 shadow-xl border border-gray-200"
            >
              <li>
                <a className="justify-between hover:bg-blue-50" onClick={() => navigate("/profile")}>
                  Profile
                  <span className="badge badge-primary">New</span>
                </a>
              </li>
              <li>
                <Link to={"/requests"} className="hover:bg-blue-50">Requests</Link>
              </li>
              <li>
                <Link to={"/friends"} className="hover:bg-blue-50">Friends</Link>
              </li>
              <li>
                <a onClick={handleLogout} className="text-red-500 hover:bg-red-50">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
