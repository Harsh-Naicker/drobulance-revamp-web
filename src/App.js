import React, { useEffect } from "react";
import Home from "./Home/Home";
import Monitor from "./Monitor/Monitor";
import MeetingWindow from "./MeetingWindow/MeetingWindow"
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

function App() {
  useEffect(() => {
    document.title="Drobulance";
  }, [])
  let navigation = useNavigate();
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home navigation={navigation} />} />
        <Route path="/monitor" element={<Monitor navigation={navigation} />} />
        <Route path="/meetingWindow" element={<MeetingWindow navigation={navigation} />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
