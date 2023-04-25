import React from "react";
import { SortAscendingIcon, UsersIcon } from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setRealEstates } from "../redux/realEstateSlice";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  filterRealEstatesByCity,
  filterRealEstatesByName,
} from "../redux/realEstateSlice";

const categories = [
  {
    name: "İstanbul",
    href: "#",
    imageSrc: "https://hecdn01.hemlak.com/sbg_city/istanbul.jpg",
  },
  {
    name: "Ankara",
    href: "#",
    imageSrc: "https://hecdn01.hemlak.com/sbg_city/ankara.jpg",
  },
  {
    name: "İzmir",
    href: "#",
    imageSrc: "https://hecdn01.hemlak.com/sbg_city/izmir.jpg",
  },
  {
    name: "Antalya",
    href: "#",
    imageSrc: "https://hecdn01.hemlak.com/sbg_city/antalya.jpg",
  },
  {
    name: "Balıkesir",
    href: "#",
    imageSrc: "https://hecdn01.hemlak.com/sbg_city/balikesir.jpg",
  },
];

function Hero() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const realEstates = useSelector((state) => state.realEstate.realEstates);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(filterRealEstatesByName(searchTerm));
    navigate("/emlaklar");
  };

  const fetchRealEstates = async () => {
    try {
      const response = await axios.get("http://localhost:5298/api/RealEstate");
      console.log(response.data);
      dispatch(setRealEstates(response.data));
    } catch (error) {
      console.error("Gayrimenkul verileri alınırken hata oluştu:", error);
    }
  };

  useEffect(() => {
    fetchRealEstates();
  }, []);

  const handleCategoryClick = (categoryName) => {
    dispatch(filterRealEstatesByCity(categoryName));
    navigate("/emlaklar");
  };

  return (
    <>
      <div className="bg-white">
        <main>
          <div>
            {/* Hero card */}
            <div className="relative">
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
              <div className="mt-2  mx-auto sm:px-6 lg:px-8">
                <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
                  <div className="absolute inset-0">
                    <img
                      className="h-full w-full object-cover"
                      src="https://wp-tid.zillowstatic.com/bedrock/app/uploads/sites/5/2022/08/ZG_ZPA_08_21_Americana_ExtFront_1081_1440_desktopWebp-2.webp"
                      alt="People working on laptops"
                    />
                    <div className="" />
                  </div>
                  <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                    <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                      <span className="block text-white">
                        Ev mi arıyorsunuz?
                      </span>
                      <span className="block text-indigo-200">
                        Aradığınız ev bir tık uzağınızda.
                      </span>
                    </h1>
                    <p className="mt-6 max-w-lg mx-auto text-center text-xl text-white sm:max-w-3xl">
                      Emlak arıyorsan çözüm net: Zillow. Binlerce ilan arasından
                      aradığını kolayca bul. Kiralık ve satılık binlerce ev,
                      işyeri ve arsa ilanı Zillow'da.
                    </p>
                    <form
                      className="mt-2 flex items-center w-1/3 mx-auto"
                      onSubmit={handleSearch}
                    >
                      <label htmlFor="simple-search" className="sr-only">
                        İsim, adres veya şehir ismi giriniz.
                      </label>
                      <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="simple-search"
                          className="bg-white-50 border border-white-300 text-white-900 text-sm rounded-lg focus:ring-white-500 focus:border-white-500 block w-full pl-10 p-2.5  dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-gray-500 dark:focus:ring-white-500 dark:focus:border-white-500"
                          placeholder="İsim, adres veya şehir ismi giriniz."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                        <span className="sr-only">Search</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Logo cloud */}
            <div className="bg-gray-100">
              <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wide">
                  Sektörün Öncüleri Tarafından Tavsiye Ediliyor
                </p>
                <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
                  <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                    <img
                      className="h-12"
                      src="https://seeklogo.com/images/N/nef-logo-1A2FE5E968-seeklogo.com.png"
                    />
                  </div>
                  <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                    <img
                      className="h-12"
                      src="https://seeklogo.com/images/T/toki-logo-B70BBFCF82-seeklogo.com.png"
                    />
                  </div>
                  <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                    <img
                      className="h-12"
                      src="https://seeklogo.com/images/E/emlak-konut-logo-201CCBAE4D-seeklogo.com.png"
                    />
                  </div>
                  <div className="col-span-1 flex justify-center md:col-span-2 md:col-start-2 lg:col-span-1">
                    <img
                      className="h-12"
                      src="https://seeklogo.com/images/S/sinpas-insaat-yapi-logo-575B4C20AF-seeklogo.com.png"
                    />
                  </div>
                  <div className="col-span-2 flex justify-center md:col-span-2 md:col-start-4 lg:col-span-1">
                    <img
                      className="h-12"
                      src="https://seeklogo.com/images/L/limak_holding-logo-D528CE20DA-seeklogo.com.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* More main page content here... */}
        </main>

        <div className="bg-white">
          <div className="py-16 sm:py-24 xl:max-w-7xl xl:mx-auto xl:px-8">
            <div className="px-4 sm:px-6 sm:flex sm:items-center sm:justify-between lg:px-8 xl:px-0">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                Şehirlere göre popüler ilanlar
              </h2>
            </div>

            <div className="mt-3 flow-root">
              <div className="-my-2">
                <div className="box-content py-2 relative h-80 overflow-x-auto xl:overflow-visible">
                  <div className="absolute min-w-screen-xl px-4 flex space-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:grid xl:grid-cols-5 xl:gap-x-8">
                    {categories.map((category) => (
                      <a
                        key={category.name}
                        href={category.href}
                        className="relative w-56 h-80 rounded-lg p-6 flex flex-col overflow-hidden hover:opacity-75 xl:w-auto"
                        onClick={(e) => {
                          e.preventDefault();
                          handleCategoryClick(category.name);
                        }}
                      >
                        <span aria-hidden="true" className="absolute inset-0">
                          <img
                            src={category.imageSrc}
                            alt=""
                            className="w-full h-full object-center object-cover"
                          />
                        </span>
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                        />
                        <span className="relative mt-auto text-center text-xl font-bold text-white">
                          {category.name}
                        </span>
                      </a>
                    ))}
                  </div>

                  <div className="mt-6 sm:hidden">
                    <a
                      href="#"
                      className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Browse all categories
                      <span aria-hidden="true"> &rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 px-4 sm:hidden">
          <a
            href="#"
            className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Browse all categories<span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </>
  );
}

export default Hero;
