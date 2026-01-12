import { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
const login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleChange = async (e) => {
    e.preventDefault();
    await axios
      .post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(addUser(res.data));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    await axios
      .post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(addUser(res.data.data));
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <form onSubmit={isLogin ? handleChange : handleSignUp}>
        <div className="card bg-white w-full max-w-md shadow-2xl justify-center rounded-2xl">
          <div className="card-body p-8">
            <h2 className="card-title justify-center text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {isLogin ? "Welcome Back" : "Join Us"}
            </h2>
            <p className="text-center text-gray-600 mb-6">
              {isLogin ? "Login to your account" : "Create a new account"}
            </p>
            {!isLogin && (
              <>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">First Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Last Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </>
            )}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <input
                type="password"
                required
                className="input input-bordered w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="label">
                <span className="label-text-alt text-xs text-gray-500">Min 8 chars, 1 number, 1 uppercase, 1 lowercase</span>
              </label>
            </div>
            <div className="card-actions justify-center mt-6">
              <button type="submit" className="btn btn-gradient w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none font-semibold text-lg hover:shadow-lg">
                {isLogin ? "Login" : "Create Account"}
              </button>
            </div>
            <div className="divider text-gray-400">or</div>
            <p
              className="text-center cursor-pointer text-blue-600 hover:text-purple-600 font-semibold transition-colors"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "👤 New User? Signup here" : "🔑 Existing User? Login here"}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default login;
