import LeaderboardPage from "pages/LeaderboardPage";
import Lecture from "pages/Lecture";
import LectureLeaderboardPage from "pages/LectureLeaderboardPage";
import Topic from "pages/Topic";
import Topics from "pages/Topics";
import { Outlet, Route, Routes } from "react-router-dom";
import { ROUTES } from "router";

function App() {
  return (
    <Routes>
      {/* <Route path={ROUTES.public.home} element={<Home />} /> */}
      {/* <Route path={ROUTES.topics} element={<Topics />} /> */}
      {/* <Route path={`${ROUTES.topics}`} element={<LectureLeaderboardPage />} /> */}

      <Route path={ROUTES.home} element={<Topics />} />
      <Route path={`${ROUTES.topics}`} element={<Outlet />}>
        <Route index element={<Topics />} />
        <Route path={ROUTES.leaderboard} element={<LeaderboardPage />} />
        <Route path=":topicId" element={<Outlet />}>
          <Route index element={<Topic />} />
          <Route
            path={ROUTES.leaderboard}
            element={<LectureLeaderboardPage />}
          />
        </Route>
      </Route>
      <Route path={`${ROUTES.lectures}/:lectureId`} element={<Outlet />}>
        <Route index element={<Lecture />} />
        {/* <Route path=":topicId" element={<Outlet />}>
          <Route index element={<Topic />} />
        </Route> */}
      </Route>
    </Routes>
  );
}

export default App;
