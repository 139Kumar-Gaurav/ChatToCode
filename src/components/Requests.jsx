import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import axios from "axios";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const handleReview = async (status, id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
    } catch (err) {
      console.error(err);
    }
  };
  const getRequests = async () => {
    try {
      await axios
        .get(BASE_URL + "/user/requests/received", { withCredentials: true })
        .then((res) => dispatch(addRequests(res.data.data)))
        .catch((err) => console.error(err));
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getRequests();
  }, []);
  if (!requests || requests.length === 0)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-600 mb-4">📨 No Requests Yet</h1>
          <p className="text-xl text-gray-500">Check back later or send some connection requests!</p>
        </div>
      </div>
    );
  return (
    <div className="justify-center flex my-5 px-4">
      <div className="w-full max-w-4xl">
        <h1 className="my-10 text-center font-bold text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">📨 Connection Requests</h1>
        {requests?.map((request) => {
          const { _id, firstName, lastName, imageUrl, about, age, gender } =
            request.fromUserId;
          return (
            <div
              className="flex flex-col gap-5 p-8 sm:flex-row sm:items-center sm:gap-8 sm:p-8 border border-gray-300 my-5 rounded-3xl justify-between bg-white hover:shadow-2xl transition-shadow duration-300"
              key={_id}
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6 flex-1">
                <div className="h-28 w-28 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center flex-shrink-0 overflow-hidden border-4 border-blue-400 shadow-lg">
                  <img
                    className="w-full h-full object-scale-down p-1"
                    src={imageUrl}
                    alt={firstName + " image"}
                  />
                </div>
                <div className="space-y-2 text-center sm:text-left">
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
              </div>
              <div className="flex flex-col gap-3 w-full sm:w-auto">
                <button
                  className="btn btn-lg btn-outline btn-error w-full sm:w-40 rounded-xl hover:bg-red-100 text-base font-bold"
                  onClick={() => handleReview("rejected", request._id)}
                >
                  ❌ Reject
                </button>
                <button
                  className="btn btn-lg w-full sm:w-40 bg-gradient-to-r from-green-400 to-blue-500 text-white border-none rounded-xl hover:shadow-lg text-base font-bold"
                  onClick={() => handleReview("accepted", request._id)}
                >
                  ✅ Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
