import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { addConnections } from "../utils/connectionSlice";

const Friends = () => {
  const friends = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const getFriends = () => {
    axios
      .get(BASE_URL + "/user/connections", { withCredentials: true })
      .then((res) => dispatch(addConnections(res.data.data)))
      .catch((err) => console.error(err.message));
  };
  useEffect(() => {
    getFriends();
  }, []);
  if (friends?.length === 0)
    return (
      <h1 className="my-2 text-center font-bold text-3xl">No Friends Found</h1>
    );
  return (
    <div className="justify-center flex my-5">
      <div className="w-150">
        <h1 className="my-2 text-center font-bold text-3xl">Friends</h1>
        {friends?.map((friend) => {
          const { _id, firstName, lastName, imageUrl, about, age, gender } =
            friend;
          return (
            <div
              className="flex flex-col gap-2 p-8 sm:flex-row sm:items-center sm:gap-6 sm:py-4 border-2 my-2 rounded-xl"
              key={_id}
            >
              <img
                className="mx-auto block h-24 rounded-full sm:mx-0 sm:shrink-0"
                src={imageUrl}
                alt={firstName + " image"}
              />
              <div className="space-y-2 text-center sm:text-left">
                <div className="space-y-0.5">
                  <p className="text-lg font-semibold text-black">
                    {firstName + " " + lastName}
                  </p>
                  <p className="font-medium text-gray-500">{about}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Friends;
