import { Routes, Route } from "react-router";

import Home from "./pages/home";
import Details from "./pages/details";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">🔗 Shortify</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:code" element={<Details />} />
      </Routes>
    </div>
  );
}
