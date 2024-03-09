import "./App.scss";

function App() {
  return (
    <>
      <div className="app-box">
        <div className="sidebar">
          <div className="username">
            <span className="profile-picture"></span>jorgesaxon1234
          </div>
          <div className="times">
            <div className="time active">Today</div>
            <div className="time">This Week</div>
            <div className="time">Eventually</div>
          </div>
          <div className="projects">
            <div className="project color1">Social</div>
            <div className="project color2">Web development</div>
            <div className="project color3">Work</div>
          </div>
        </div>
        <div className="main-app">
          <h1 className="section">Today</h1>
          <div className="add-section">
            <span className="add">+</span>
            <span className="text">Add task...</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
