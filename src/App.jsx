import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Requests from "./components/Requests";
import Friends from "./components/Friends";
import { createContext } from "react";
import { theme } from "./utils/theme";

export const ThemeContext = createContext(theme);

function App() {
  return (
    <>
      <ThemeContext.Provider value={theme}>
        <Provider store={appStore}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Body />}>
                <Route path="/" element={<Feed />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/friends" element={<Friends />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
