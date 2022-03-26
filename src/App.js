import React from "react";
import Home from "./Home/Home";
import Monitor from "./Monitor/Monitor";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "mobx-react";
import RootStore from "./stores/RootStore";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route
                path="/simple-dyte-client/meeting/:room/:id"
                component={MeetingComponent}
              />
              <Route
                path="/custom-layout-button/meeting/:room/:id"
                component={CustomLayoutButton}
              /> */}
        </Routes>

      </Router>
    </React.Fragment>
  );
}

export default App;
