import axios from "axios";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const userData = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    await axios
      .get(BASE_URL + "/user/feed", { withCredentials: true })
      .then((res) => {
        console.log(res);
        dispatch(addFeed(res?.data?.data));
      })
      .catch((err) => console.error(err.message));
  };

  useEffect(() => {
    if (!userData.length) {
      getFeed();
    }
  }, []);
  return (
    <div>{userData && userData.length && <UserCard user={userData[0]} />}</div>
  );
};

export default Feed;
