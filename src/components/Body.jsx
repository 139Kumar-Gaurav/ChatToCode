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

  // Add flex layout classes to ensure proper footer placement
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
      </header>

      <main className="flex-1 w-full mt-16 pt-4 pb-4">
        <Outlet />
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Body;
