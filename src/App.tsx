import React from "react";
import { Route, Routes } from "react-router-dom";
import Today from "./Today";
import ThisWeek from "./ThisWeek";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Today />} />
      <Route path="/week" element={<ThisWeek />} />
    </Routes>
  );
}

export default App;
