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
  if (!requests)
    return (
      <h1 className="my-2 text-center font-bold text-3xl">No Requests Found</h1>
    );
  return (
    <div className="justify-center flex my-5">
      <div className="w-150">
        <h1 className="my-2 text-center font-bold text-3xl">Requests</h1>
        {requests?.map((request) => {
          const { _id, firstName, lastName, imageUrl, about, age, gender } =
            request.fromUserId;
          return (
            <div
              className="flex flex-col gap-2 p-8 sm:flex-row sm:items-center sm:gap-6 sm:py-4 border-2 my-2 rounded-xl justify-evenly"
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
                  {age && gender && (
                    <p className="font-medium text-gray-500">
                      {age + ", " + gender}
                    </p>
                  )}
                  <p className="font-medium text-gray-500">{about}</p>
                </div>
              </div>
              <div className="grid grid-flow-col grid-rows-2 gap-2">
                <button
                  className="btn btn-active btn-warning"
                  onClick={() => handleReview("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-active btn-success"
                  onClick={() => handleReview("accepted", request._id)}
                >
                  Accept
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
