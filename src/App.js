import logo from "./logo.svg";
import "./App.css";
import Homepage from "./pages/Homepage";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Productpage from "./pages/Productpage";
import Upperheader from "./components/Upperheader";
import Mainheader from "./components/Mainheader";
import Login from "./components/Login";
import Register from "./components/Register";
import Cartpage from "./components/Cartpage";
function App() {
  return (
    <Router>
      <Upperheader />
      <Mainheader />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/single" element={<Productpage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cartpage />} />
      </Routes>
    </Router>
  );
}

export default App;
