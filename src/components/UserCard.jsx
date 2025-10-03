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
    <div className="card bg-base-100 w-96 shadow-sm justify-center mx-auto my-20">
      <figure>
        <img src={imageUrl} alt="User Image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        {showButton && (
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={() => handleFeed("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-success"
              onClick={() => handleFeed("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
