import { Route, Routes, useNavigate } from "react-router-dom";
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
import { Provider } from "react-redux";
import store from "./redux/store";
import Advertise from "./pages/Advertise";
import ListOfProperties from "./pages/ListOfProperties";
import DetailPage from "./pages/DetailPage";
import Admin from "./pages/Admin";
import ChangeProfile from "./pages/ChangeProfile";
import ChangeEstates from "./pages/ChangeEstates";
import ChangeEditEstates from "./pages/ChangeEditEstates";
import Favorites from "./pages/Favorites";
import { useEffect } from "react";

function RedirectToHome() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/anasayfa");
  }, [navigate]);

  return null;
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        {!window.location.pathname.startsWith("/admin") && <Banner />}
        {!window.location.pathname.startsWith("/admin") && <Navbar />}
        <Routes>
          <Route path="/" element={<RedirectToHome />} />
          <Route path="/anasayfa" element={<Hero />} />
          <Route path="/ekip" element={<Team />} />
          <Route path="/hakkimizda" element={<AboutUs />} />
          <Route path="/iletisim" element={<Contact />} />
          <Route path="/girisyap" element={<Login />} />
          <Route path="/kayitol" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/ilanver" element={<Advertise />} />
          <Route path="/emlaklar" element={<ListOfProperties />} />
          <Route path="/favoriler" element={<Favorites />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/profilduzenle/:id" element={<ChangeProfile />} />
          <Route path="/ilanlarim" element={<ChangeEstates />} />
          <Route path="/ilanduzenle/:id" element={<ChangeEditEstates />} />
          <Route path="/emlaklar/detail/:id" element={<DetailPage />} />
        </Routes>
        {!window.location.pathname.startsWith("/admin") && <Footer />}
      </Provider>
    </div>
  );
}

export default App;
