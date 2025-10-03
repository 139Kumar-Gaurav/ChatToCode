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
        dispatch(addFeed(res?.data?.data));
      })
      .catch((err) => console.error(err.message));
  };

  useEffect(() => {
    if (!userData?.length) {
      getFeed();
    }
  }, []);
  if (!userData || userData.length === 0)
    return (
      <h1 className="my-2 text-center font-bold text-3xl">Feed is clear for now</h1>
    );
  return (
    <div>
      {userData && userData?.length && (
        <UserCard user={userData[0]} showButton={true} />
      )}
    </div>
  );
};

export default Feed;
