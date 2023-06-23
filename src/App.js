import React from "react";
import Home from "./Home";
import Members from "./Member";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="members" element={<Members />} />
        </Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
