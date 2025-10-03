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
    <div>
      <form onSubmit={isLogin ? handleChange : handleSignUp}>
        <div className="card bg-base-100 w-96 shadow-sm justify-center mx-auto my-20">
          <div className="card-body">
            <h2 className="card-title justify-center">
              {isLogin ? "Login" : "Signup"}
            </h2>
            {!isLogin && (
              <>
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
              </>
            )}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <label className="input validator">
                <input
                  type="email"
                  placeholder="mail@site.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <div className="validator-hint hidden">
                Enter valid email address
              </div>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <label className="input validator">
                <input
                  type="password"
                  required
                  placeholder="Password"
                  minLength="8"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <p className="validator-hint hidden">
                Must be more than 8 characters, including
                <br />
                At least one number <br />
                At least one lowercase letter <br />
                At least one uppercase letter
              </p>
            </fieldset>
            <div className="card-actions justify-center">
              <button type="submit" className="btn btn-primary">
                {isLogin ? "Login" : "Signup"}
              </button>
            </div>
            <p
              className="text-center cursor-pointer"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "New User? Signup here" : "Existing User? Login here"}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default login;
