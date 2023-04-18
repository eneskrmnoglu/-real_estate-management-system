import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:5298/api/Users/login?email=${mail}&password=${password}`
      );
      if (response.data) {
        const user = response.data;
        console.log(user);
        dispatch(setUser(user));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Giriş işlemi başarılı.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/anasayfa");
      } else {
        Swal.fire("Kullanıcı adı veya şifre hatalı");
      }
    } catch (error) {
      Swal.fire(error);
    }
  };

  return (
    <>
      <div className="bg-gray-100">
        <div className="flex justify-center h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              backgroundImage:
                "url(https://media-cdn.tripadvisor.com/media/photo-m/1280/1c/b6/a1/87/sapanca-guzel-evler.jpg)",
            }}
          >
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Zillow
                </h2>
                <p className="max-w-xl mt-3 text-white">
                  Sitemize giriş yapın. Aradığınız emlakları hızlıca bulun ve
                  satıcılarla iletişime geçin yada kendi ilanınızı verin
                  potansiyel alıcılar sizinle iletişime geçsin.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <div className="flex justify-center mx-auto">
                  <img
                    className="w-auto h-7 sm:h-8"
                    src="https://s.zillow.net/pfs/static/z-logo-default.svg"
                    alt=""
                  />
                </div>
                <p className="mt-3 text-gray-500">Hesabınıza Giriş Yapın !</p>
              </div>
              <div className="mt-8">
                <form onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="flex justify-between mb-2 text-sm text-gray-500"
                    >
                      Mail Adresi
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={mail}
                      onChange={(e) => setMail(e.target.value)}
                      placeholder="example@example.com"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label
                        htmlFor="password"
                        className="text-sm text-gray-500"
                      >
                        Şifre
                      </label>
                      <a
                        href="#"
                        className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                      >
                        Şifrenizi mi unuttunuz?
                      </a>
                    </div>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Your Password"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg tfocus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    >
                      Giriş Yap
                    </button>
                  </div>
                </form>
                <p className="mt-6 text-sm text-center text-gray-400">
                  Hesabınız yok mu?{" "}
                  <Link
                    to="/kayitol"
                    className="text-blue-500 focus:outline-none focus:underline hover:underline"
                  >
                    Üye olun
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
