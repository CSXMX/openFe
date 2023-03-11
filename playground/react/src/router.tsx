import React from "react";
import TimeButton from "./Demo/TimeButton";

import { Routes, Route } from "react-router-dom";

export default function router() {
  return (
    <Routes>
      <Route path="/TimeButton" element={<TimeButton />} />
    </Routes>
  );
}
