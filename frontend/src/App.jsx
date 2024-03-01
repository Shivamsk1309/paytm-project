import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import SendMoney from "./pages/SendMoney";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element=<Signup /> />
          <Route path="/signin" element=<Signin /> />
          <Route path="/dashboard" element=<Dashboard /> />
          <Route path="/send" element=<SendMoney /> />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
