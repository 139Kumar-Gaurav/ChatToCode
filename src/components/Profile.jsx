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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-center text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-10">✨ Edit Your Profile</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="flex justify-center">
            <div className="card bg-white shadow-2xl w-full rounded-3xl p-8">
              <div className="space-y-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-base">First Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-base">Last Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-bold text-base">Age</legend>
            <input
              type="number"
              className="input input-bordered w-full rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="25"
              min="1"
              max="100"
              title="Must be between 1 to 100"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-bold text-base">Gender</legend>
            <select
              className="select select-bordered w-full rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-base">Image URL</span>
              </label>
              <input
                type="url"
                required
                className="input input-bordered w-full rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
                title="Must be valid URL"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-base">About</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-32 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us about yourself..."
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </div>
          <div className="card-actions justify-center mt-8">
            <button className="btn btn-lg w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none font-bold text-lg hover:shadow-lg" onClick={handleSave}>
              💾 Save Changes
            </button>
          </div>
            </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="flex items-center justify-center">
            <div className="w-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">👁️ Preview</h2>
              <UserCard
                user={{
                  firstName,
                  lastName,
                  age,
                  about,
                  gender,
                  imageUrl,
                }}
                showButton={false}
              />
            </div>
          </div>
        </div>
      </div>
      {save && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success bg-green-500 text-white border-none shadow-lg">
            <span>✅ Profile Saved Successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
