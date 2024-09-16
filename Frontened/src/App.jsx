
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LoginPage } from "./components/LoginPage"
import { RegisterPage } from "./components/RegisterPage"
import Home from "./components/Home"


function App() {
  return (
    <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App