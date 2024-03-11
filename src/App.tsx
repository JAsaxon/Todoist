import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Today from "./Today";
import ThisWeek from "./ThisWeek";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="app-box">
          <div className="sidebar">
            <div className="username">
              <span className="profile-picture"></span>jorgesaxon1234
            </div>
            <div className="times">
              <Link to="./">
                <div className="time active">Today</div>
              </Link>

              <Link to="./week">
                <div className="time">This Week</div>
              </Link>
              <div className="time">Eventually</div>
            </div>
            <div className="projects">
              <div className="project color1">Social</div>
              <div className="project color2">Web development</div>
              <div className="project color3">Work</div>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Today />} />
            <Route path="/week" element={<ThisWeek />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
