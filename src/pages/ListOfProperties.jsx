import React from "react";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import {
  ChevronDownIcon,
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setRealEstates } from "../redux/realEstateSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  addToFavorites,
  removeFromFavorites,
  updateFilters,
} from "../redux/realEstateSlice";

const subCategories = [
  { name: "Konut", href: "#", type: "listingStatus", value: "Konut" },
  { name: "İşyeri", href: "#", type: "listingStatus", value: "İşyeri" },
  { name: "Arsa", href: "#", type: "listingStatus", value: "Arsa" },
];
const filters = [
  {
    id: "ilanturu",
    name: "İlan Türü",
    type: "propertyType",
    options: [
      { value: "Satılık", label: "Satılık", checked: false },
      { value: "Kiralık", label: "Kiralık", checked: false },
    ],
  },
  {
    id: "odasayisi",
    name: "Oda Sayısı",
    type: "numberOfRooms",
    options: [
      { value: "1+0", label: "1+0", checked: false },
      { value: "1+1", label: "1+1", checked: false },
      { value: "2+1", label: "2+1", checked: false },
      { value: "3+1", label: "3+1", checked: false },
      { value: "4+1", label: "4+1", checked: false },
      { value: "4+2", label: "4+2", checked: false },
    ],
  },
  {
    id: "isinmatipi",
    name: "Isınma Tipi",
    type: "heatingType",
    options: [
      { value: "Güneş Enerjisi", label: "Güneş Enerjisi", checked: false },
      { value: "Kat Kaloriferi", label: "Kat Kaloriferi", checked: false },
      { value: "Klima", label: "Klima", checked: false },
      { value: "Kombi", label: "Kombi", checked: false },
      { value: "Soba", label: "Soba", checked: false },
    ],
  },
  {
    id: "esyali",
    name: "Eşyalı Mı?",
    type: "furnishingStatus",
    options: [
      { value: "Evet", label: "Evet", checked: false },
      { value: "Hayır", label: "Hayır", checked: false },
    ],
  },
  {
    id: "cephe",
    name: "Cephe",
    type: "facade",
    options: [
      { value: "Kuzey Cephe", label: "Kuzey Cephe", checked: false },
      { value: "Güney Cephe", label: "Güney Cephe", checked: false },
      { value: "Batı Cephe", label: "Batı Cephe", checked: false },
      { value: "Doğu Cephe", label: "Doğu Cephe", checked: false },
    ],
  },
  {
    id: "sehir",
    name: "Şehir",
    type: "city",
    options: [
      { value: "İstanbul", label: "İstanbul", checked: false },
      { value: "Ankara", label: "Ankara", checked: false },
      { value: "İzmir", label: "İzmir", checked: false },
      { value: "Antalya", label: "Antalya", checked: false },
      { value: "Balıkesir", label: "Balıkesir", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ListOfProperties() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const favorites = useSelector((state) => state.realEstate.favorites);
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToFavorites = (estate) => {
    const isAlreadyInFavorites = favorites.some(
      (favorite) => favorite.id === estate.id
    );
    if (!isAlreadyInFavorites) {
      dispatch(addToFavorites(estate));
    }
    console.log(favorites);
  };

  const handleRemoveFromFavorites = (estateId) => {
    dispatch(removeFromFavorites(estateId));
    console.log(favorites);
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

  const handleClick = () => {
    fetchRealEstates();
  };

  const handleEstate = (estateId) => {
    navigate(`/detail/${estateId}`);
  };

  const useFilteredRealEstates = (filters, listingStatus) => {
    const realEstates = useSelector((state) => state.realEstate.realEstates);

    const filtered = realEstates.filter((estate) => {
      const matchesListingStatus = listingStatus
        ? estate.listingStatus === listingStatus
        : true;

      const matchesFilters = Object.entries(filters).every(([key, values]) => {
        if (values.length === 0) return true;
        return values.includes(estate[key]);
      });

      return matchesListingStatus && matchesFilters;
    });

    return filtered;
  };

  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedListingStatus, setSelectedListingStatus] = useState(null);

  const filteredRealEstates = useFilteredRealEstates(
    selectedFilters,
    selectedListingStatus
  );

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>
                  <ul
                    role="list"
                    className="font-medium text-gray-900 px-2 py-3"
                  >
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <a
                          href={category.href}
                          className="block px-2 py-3"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedListingStatus(category.value);
                          }}
                        >
                          {category.name}
                        </a>
                      </li>
                    ))}
                  </ul>

                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                            />
                          </svg>

                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                    onChange={(e) => {
                                      const isChecked = e.target.checked;
                                      setSelectedFilters((prevFilters) => {
                                        const newFilters = { ...prevFilters };
                                        if (isChecked) {
                                          if (newFilters[section.type]) {
                                            newFilters[section.type].push(
                                              option.value
                                            );
                                          } else {
                                            newFilters[section.type] = [
                                              option.value,
                                            ];
                                          }
                                        } else {
                                          newFilters[section.type] = newFilters[
                                            section.type
                                          ].filter(
                                            (value) => value !== option.value
                                          );
                                        }
                                        return newFilters;
                                      });
                                    }}
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              Gayrimenkuller
            </h1>
            <div>
              <button
                onClick={async () => {
                  await fetchRealEstates();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="font-medium text-gray-900 px-2 py-3">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a
                        href={category.href}
                        className="block px-2 py-3"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedListingStatus(category.value);
                        }}
                      >
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusSmIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusSmIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    setSelectedFilters((prevFilters) => {
                                      const newFilters = { ...prevFilters };
                                      if (isChecked) {
                                        if (newFilters[section.type]) {
                                          newFilters[section.type].push(
                                            option.value
                                          );
                                        } else {
                                          newFilters[section.type] = [
                                            option.value,
                                          ];
                                        }
                                      } else {
                                        newFilters[section.type] = newFilters[
                                          section.type
                                        ].filter(
                                          (value) => value !== option.value
                                        );
                                      }
                                      return newFilters;
                                    });
                                  }}
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="mx-auto py-16">
                  <h2 className="sr-only">Products</h2>

                  <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
                    {filteredRealEstates.map((estate) => (
                      <div
                        key={estate.id}
                        className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden"
                        onClick={() =>
                          navigate(`/emlaklar/detail/${estate.id}`)
                        }
                      >
                        <div className="relative aspect-w-3 aspect-h-4 bg-gray-200  sm:aspect-none sm:h-96">
                          <img
                            src={estate.thumbnailUrl}
                            className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                          />
                        </div>

                        <div className="flex-1 p-4 space-y-2 flex flex-col">
                          <h3 className="text-sm font-medium text-gray-900">
                            <a href={estate.href}>
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              {estate.name}
                            </a>
                          </h3>
                          <p className="text-sm text-gray-500">{estate.city}</p>
                          <div className="flex space-x-3">
                            <div className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-3 h-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                />
                              </svg>
                              <span className="ml-1 text-sm">
                                {estate.listingStatus}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-3 h-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                                />
                              </svg>

                              <span className="ml-1 text-sm">
                                {estate.numberOfRooms}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-3 h-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                              </svg>

                              <span className="ml-1 text-sm">
                                {estate.floorNumber}.Kat
                              </span>
                            </div>
                            <div className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-3 h-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                                />
                              </svg>

                              <span className="ml-1 text-sm">
                                {estate.grossSquareMeters} m²
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-center font-medium text-gray-900">
                              {estate.price} ₺
                            </p>
                          </div>
                        </div>

                        {user &&
                          (favorites.some(
                            (favorite) => favorite.id === estate.id
                          ) ? (
                            <Link
                              className="relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200"
                              onClick={(event) => {
                                event.preventDefault();
                                handleRemoveFromFavorites(estate.id);
                              }}
                            >
                              Favorilerden Çıkar
                            </Link>
                          ) : (
                            <Link
                              className="relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200"
                              onClick={(event) => {
                                event.preventDefault();
                                handleAddToFavorites(estate);
                              }}
                            >
                              Favorilere Ekle
                            </Link>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* /End replace */}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default ListOfProperties;
