import { Routes, Route } from "react-router";
import Home from "./pages/home";
import Details from "./pages/details";
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Shortify
          </h1>
          <p className="text-gray-600">
            Transform long URLs into short, shareable links
          </p>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:code" element={<Details />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
