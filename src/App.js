import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import Hero from "./pages/Hero";
import Team from "./pages/Team";
import Banner from "./components/Banner";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <Banner />
      <Navbar />
      <Routes>
        <Route path="/anasayfa" element={<Hero />} />
        <Route path="/ekip" element={<Team />} />
        <Route path="/hakkimizda" element={<AboutUs />} />
        <Route path="/iletisim" element={<Contact />} />
        <Route path="/girisyap" element={<Login />} />
        <Route path="/kayitol" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
