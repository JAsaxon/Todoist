import { BrowserRouter, Route, Routes } from "react-router-dom";
import Today from "./Today";
import ThisWeek from "./ThisWeek";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="app-box">
          <Navbar />

          <Routes>
            <Route path="/" element={<Today />} />
            <Route path="/week" element={<ThisWeek />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
export type projectProps = {
  text: string;
  color: number;
};
export default App;
