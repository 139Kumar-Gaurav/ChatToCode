import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user, showButton }) => {
  const userFeed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const handleFeed = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
    } catch {
      (err) => console.error(err);
    }
  };
  const { _id, firstName, lastName, about, imageUrl, age, gender } = user;
  if (!userFeed) {
    return (
      <h1 className="my-2 text-center font-bold text-3xl">No Requests Found</h1>
    );
  }
  return (
    <div className="card bg-white w-full max-w-lg h-screen sm:h-auto sm:max-h-[700px] shadow-2xl rounded-3xl overflow-hidden hover:shadow-3xl transition-shadow duration-300 flex flex-col">
      <figure className="relative w-full h-72 sm:h-80 flex-shrink-0 bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
        <img src={imageUrl} alt="User Image" className="w-full h-full object-scale-down" />
      </figure>
      <div className="card-body p-6 sm:p-8 space-y-3 flex-1 flex flex-col overflow-y-auto">
        <h2 className="card-title text-2xl sm:text-3xl font-bold text-gray-800 mb-2 flex-shrink-0">{firstName + " " + lastName}</h2>
        {age && gender && <p className="text-base sm:text-lg text-gray-600 font-semibold flex-shrink-0">🎂 {age} years old • {gender === "male" ? "👨" : gender === "female" ? "👩" : "🧑"} {gender}</p>}
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-2 line-clamp-3 overflow-hidden">{about}</p>
        {showButton && (
          <div className="card-actions justify-center gap-3 mt-auto pt-4 flex-shrink-0">
            <button
              className="btn btn-md sm:btn-lg btn-outline btn-error flex-1 hover:bg-red-100 text-sm sm:text-base font-bold"
              onClick={() => handleFeed("ignored", _id)}
            >
              ❌ Ignore
            </button>
            <button
              className="btn btn-md sm:btn-lg btn-gradient btn-success flex-1 bg-gradient-to-r from-green-400 to-blue-500 text-white border-none hover:shadow-lg text-sm sm:text-base font-bold"
              onClick={() => handleFeed("interested", _id)}
            >
              💚 Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
