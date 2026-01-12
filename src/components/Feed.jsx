import axios from "axios";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const userData = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const getFeed = async () => {
    await axios
      .get(BASE_URL + "/user/feed", { withCredentials: true })
      .then((res) => {
        dispatch(addFeed(res?.data?.data));
      })
      .catch((err) => console.error(err.message));
  };

  useEffect(() => {
    if (!userData?.length) {
      getFeed();
    }
  }, []);

  const goToNext = () => {
    if (userData && currentIndex < userData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStart - touchEnd > 50) {
      goToNext();
    }
    if (touchStart - touchEnd < -50) {
      goToPrev();
    }
  };

  if (!userData || userData.length === 0)
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-600 mb-4">🎉 Feed is clear for now!</h1>
          <p className="text-xl text-gray-500">Check back later for more connections</p>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="w-full h-screen sm:h-auto flex flex-col items-center justify-center">
        <div
          className="flex items-center justify-center gap-4 w-full"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className="btn btn-circle btn-lg bg-blue-600 hover:bg-blue-700 text-white border-none disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex-shrink-0 text-2xl"
          >
            ❮
          </button>
          <div className="flex-shrink-0">
            {userData && userData.length > 0 && (
              <UserCard user={userData[currentIndex]} showButton={true} />
            )}
          </div>

          <button
            onClick={goToNext}
            disabled={currentIndex === userData.length - 1}
            className="btn btn-circle btn-lg bg-purple-600 hover:bg-purple-700 text-white border-none disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex-shrink-0 text-2xl"
          >
            ❯
          </button>
        </div>

        <div className="mt-6 sm:mt-8 flex flex-col items-center gap-4 w-full max-w-lg">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-700">
              {currentIndex + 1} / {userData.length}
            </span>
          </div>

          <div className="w-full flex gap-1 px-4">
            {userData.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  index <= currentIndex
                    ? "bg-gradient-to-r from-blue-600 to-purple-600"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
