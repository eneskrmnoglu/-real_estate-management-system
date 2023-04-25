import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Disclosure, RadioGroup, Tab } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/solid";
import { HeartIcon, MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DetailPage() {
  const { id } = useParams();
  const [estate, setEstate] = useState(null);
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (id) {
        const response = await axios.get(
          `http://localhost:5298/api/RealEstate/${id}`
        );
        console.log(response.data);
        setEstate(response.data);
        fetchUser(response.data); // fetchUser fonksiyonunu burada çağırın
      }
    }
    fetchData();
  }, [id]);

  const fetchUser = async (estate) => {
    try {
      const response = await axios.get(
        `http://localhost:5298/api/users/${estate.userId}`
      );
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.error("Kullanıcı verileri alınırken hata oluştu:", error);
    }
  };

  return (
    <div className="bg-white">
      <div className=" mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-1 lg:gap-x-8 ">
          {estate && (
            <>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {estate.name}
              </h1>
              <img
                src={estate.thumbnailUrl}
                alt="image"
                className="mt-5 w-3/4 h-full mx-auto origin-bottom rounded-lg object-cover"
              />
              {/* Image gallery */}
              <div className="mt-4 flex-col items-center justify-center">
                <div className="mx-auto flex h-[26rem] max-w-4xl px-3">
                  <div className="group relative w-1/3 overflow-hidden rounded-lg px-3 transition-all hover:w-full">
                    <div className="absolute bottom-0 -left-full z-10 w-full rounded-lg p-3 opacity-0 transition-all group-hover:left-3 group-hover:opacity-100"></div>
                    <img
                      src={estate.photoUrl1}
                      alt="image"
                      className="mt-4 h-full w-full origin-bottom rounded-lg object-cover"
                    />
                  </div>
                  <div className="group relative w-1/3 overflow-hidden rounded-lg px-3 transition-all hover:w-full">
                    <div className="absolute bottom-0 -left-full z-10 w-full rounded-lg p-3 opacity-0 transition-all group-hover:left-3 group-hover:opacity-100"></div>
                    <img
                      src={estate.photoUrl2}
                      alt="image"
                      className="mt-4 h-full w-full rounded-lg object-cover"
                    />
                  </div>
                  <div className="group relative w-1/3 overflow-hidden rounded-lg px-3 transition-all hover:w-full">
                    <div className="absolute bottom-0 -left-full z-10 w-full rounded-lg p-3 opacity-0 transition-all group-hover:left-3 group-hover:opacity-100"></div>
                    <img
                      src={estate.photoUrl3}
                      alt="image"
                      className="mt-4 h-full w-full mb-5 rounded-lg object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 ring-2 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        İlan Sahibi E-mail
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        İlan Sahibi Ad Soyad
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        İlan Sahibi Telefon No
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="py-4 text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="py-4 text-sm text-gray-500">
                        {user.nameSurname}
                      </td>
                      <td className="py-4 text-sm text-gray-500">
                        {user.phoneNumber}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Product info */}
              <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                <div className="mt-8 ring-2 md:rounded-lg">
                  <table className="mt-5 min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          İlan Özelliği
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                        >
                          Açıklama
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Fiyat
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {estate.price} ₺
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Konut Tipi
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {estate.listingStatus}
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          İlan Türü
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {estate.propertyType}
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Oda Sayısı
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {estate.numberOfRooms}
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Bina Yaşı
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {estate.buildingAge}
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Metrekare
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {estate.grossSquareMeters}
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Toplam Kat Sayısı
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {estate.totalFloors}
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Isıtma Türü
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {estate.heatingType}
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Eşyalı Mı?
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {estate.furnishingStatus}
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Cephe
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {estate.facade}
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Balkon Sayısı
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {estate.balconyCount}
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          Tuvalet Sayısı
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {estate.bathroomCount}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className=" ring-2 md:rounded-lg">
                  <table className="mt-10 min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          İlan Açıklaması
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          {estate.description}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
