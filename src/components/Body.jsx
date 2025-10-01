import axios from "axios";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store)=> store.user);
  const fetchUser = async () => {
    try {
      await axios
        .get(BASE_URL + "/profile/view", {
          withCredentials: true,
        })
        .then((res) => dispatch(addUser(res.data)));
    } catch (error) {
      if(error.status == 401) navigate("/login");
    }
  };

  useEffect(() => {
    if(!user) {fetchUser()};
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
