import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || 0);
  const [about, setAbout] = useState(user?.about || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [imageUrl, setImageUrl] = useState(
    user?.imageUrl ||
      "https://sclpa.com/wp-content/uploads/2022/10/dummy-img-1.jpg"
  );
  const [save, setSave] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || 0);
      setAbout(user.about || "");
      setGender(user.gender || "");
      setImageUrl(user.imageUrl || "");
    }
  }, [user]);
  const handleSave = (e) => {
    e.preventDefault();
    axios
      .patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          about,
          gender,
          imageUrl,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setSave(true);
        setTimeout(() => setSave(false), 3000);
      })
      .catch((err) => setError(err.message));
  };
  return (
    <div className="justify-center flex justify-center">
      <div className="card bg-base-100 shadow-sm mx-auto w-96 my-20">
        <div className="card-body justify-content">
          <h2 className="card-title justify-center">Profile</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Age</legend>
            <input
              type="number"
              className="input validator"
              required
              placeholder="Type a number between 1 to 100"
              min="1"
              max="100"
              title="Must be between be 1 to 100"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Gender</legend>
            <select
              className="select"
              value={gender || "Select a Gender"}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="Select a Gender" disabled={true}>
                Select a Gender
              </option>
              <option>male</option>
              <option>female</option>
              <option>others</option>
            </select>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Image URL</legend>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </g>
              </svg>
              <input
                type="url"
                required
                placeholder="https://"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
                title="Must be valid URL"
              />
            </label>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <textarea
              className="textarea h-24"
              placeholder="About"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
          </fieldset>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
      <UserCard
        user={{
          firstName,
          lastName,
          age,
          about,
          gender,
          imageUrl,
        }}
      />
      {save && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Saved Successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
