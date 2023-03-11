import React from "react";
import PasteExcel from "./Demo/TimeButton";

import { Routes, Route } from "react-router-dom";

export default function router() {
  return (
    <Routes>
      <Route path="/PasteExcel" element={<PasteExcel />} />
    </Routes>
  );
}
