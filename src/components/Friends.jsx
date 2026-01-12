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
  if (!friends)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-600 mb-4">👥 No Friends Yet</h1>
          <p className="text-xl text-gray-500">Start connecting with people to build your friend list!</p>
        </div>
      </div>
    );
  return (
    <div className="justify-center flex my-5 px-4">
      <div className="w-full max-w-4xl">
        <h1 className="my-10 text-center font-bold text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">👫 Your Friends ({friends?.length})</h1>
        {friends?.map((friend) => {
          const { _id, firstName, lastName, imageUrl, about, age, gender } =
            friend;
          return (
            <div
              className="flex flex-col gap-5 p-8 sm:flex-row sm:items-center sm:gap-8 sm:p-8 border border-gray-300 my-5 rounded-3xl bg-white hover:shadow-2xl transition-shadow duration-300 group"
              key={_id}
            >
              <div className="h-28 w-28 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center flex-shrink-0 overflow-hidden border-4 border-blue-400 shadow-lg group-hover:shadow-xl transition-shadow">
                <img
                  className="w-full h-full object-scale-down p-1"
                  src={imageUrl}
                  alt={firstName + " image"}
                />
              </div>
              <div className="space-y-3 text-center sm:text-left flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                  {firstName + " " + lastName}
                </p>
                {age && gender && (
                  <p className="font-semibold text-lg text-gray-700">
                    🎂 {age} • {gender === "male" ? "👨" : "👩"}
                  </p>
                )}
                <p className="font-medium text-gray-600 text-base line-clamp-3">{about}</p>
              </div>
              <div className="text-center sm:text-right flex-shrink-0">
                <p className="text-base font-bold text-green-600 bg-green-100 px-4 py-2 rounded-full inline-block">✅ Connected</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Friends;
