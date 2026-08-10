import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/add-user" element={<AddUser />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;