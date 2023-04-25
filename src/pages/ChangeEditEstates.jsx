import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function ChangeEditEstates() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [listingStatus, setListingStatus] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [buildingAge, setBuildingAge] = useState(0);
  const [grossSquareMeters, setGrossSquareMeters] = useState(0);
  const [floorNumber, setFloorNumber] = useState(0);
  const [totalFloors, setTotalFloors] = useState("");
  const [heatingType, setHeatingType] = useState("");
  const [furnishingStatus, setFurnishingStatus] = useState("");
  const [deposit, setDeposit] = useState("");
  const [facade, setFacade] = useState("");
  const [balconyCount, setBalconyCount] = useState(0);
  const [monthlyFee, setMonthlyFee] = useState("");
  const [bathroomCount, setBathroomCount] = useState(0);
  const [thumbnailUrl, setThumbnailImageUrl] = useState("");
  const [city, setCity] = useState("");
  const [photoUrl1, setPhotoUrl1] = useState("");
  const [photoUrl2, setPhotoUrl2] = useState("");
  const [photoUrl3, setPhotoUrl3] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [userId, setUserId] = useState(0);

  async function fetchEstate() {
    try {
      const response = await axios.get(
        `http://localhost:5298/api/RealEstate/${id}`
      );
      const realEstate = response.data;
      setName(realEstate.name);
      setListingStatus(realEstate.listingStatus);
      setPropertyType(realEstate.propertyType);
      setNumberOfRooms(realEstate.numberOfRooms);
      setBuildingAge(realEstate.buildingAge);
      setGrossSquareMeters(realEstate.grossSquareMeters);
      setFloorNumber(realEstate.floorNumber);
      setTotalFloors(realEstate.totalFloors);
      setHeatingType(realEstate.heatingType);
      setFurnishingStatus(realEstate.furnishingStatus);
      setDeposit(realEstate.deposit);
      setFacade(realEstate.facade);
      setBalconyCount(realEstate.balconyCount);
      setMonthlyFee(realEstate.monthlyFee);
      setBathroomCount(realEstate.bathroomCount);
      setThumbnailImageUrl(realEstate.thumbnailUrl);
      setCity(realEstate.city);
      setPhotoUrl1(realEstate.photoUrl1);
      setPhotoUrl2(realEstate.photoUrl2);
      setPhotoUrl3(realEstate.photoUrl3);
      setDescription(realEstate.description);
      setPrice(realEstate.price);
      setUserId(realEstate.userId);
    } catch (error) {
      console.error("Gayrimenkul yüklenirken hata oluştu:", error);
    }
  }

  useEffect(() => {
    fetchEstate();
  }, [id]);

  const handleUpdateEstate = async (e) => {
    e.preventDefault();
    try {
      const updatedEstate = {
        id,
        name,
        listingStatus,
        propertyType,
        numberOfRooms,
        buildingAge,
        grossSquareMeters,
        floorNumber,
        totalFloors,
        heatingType,
        furnishingStatus,
        deposit,
        facade,
        balconyCount,
        monthlyFee,
        bathroomCount,
        thumbnailUrl,
        city,
        photoUrl1,
        photoUrl2,
        photoUrl3,
        description,
        price,
        userId,
      };

      await axios.put(
        `http://localhost:5298/api/RealEstate/${id}`,
        updatedEstate,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      fetchEstate();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Güncelleme işlemi başarılı",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(`/ilanlarim`);
    } catch (error) {
      console.error("Emlak güncellenirken hata oluştu:", error);
    }
  };

  return (
    <div>
      <div>
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5"></div>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Mevcut İlanı Düzenle
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Form üzerinden ilanı düzenleyebilirsiniz.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" onSubmit={handleUpdateEstate}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block flex items-start text-sm font-medium text-gray-700"
                        >
                          İlan Başlığı
                        </label>
                        <div className="mt-1">
                          <input
                            name="Name"
                            onChange={(e) => setName(e.target.value)}
                            placeholder={name}
                            type="text"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block h-8 w-full sm:text-sm border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block flex items-start text-sm font-medium text-gray-700"
                        >
                          Konut Tipi
                        </label>
                        <select
                          name="ListingStatus"
                          onChange={(e) => setListingStatus(e.target.value)}
                          value={listingStatus}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="Konut">Konut</option>
                          <option value="İşyeri">İşyeri</option>
                          <option value="Arsa">Arsa</option>
                        </select>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block flex items-start text-sm font-medium text-gray-700"
                        >
                          İlan Türü
                        </label>
                        <select
                          name="PropertyType"
                          onChange={(e) => setPropertyType(e.target.value)}
                          value={propertyType}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="Satılık">Satılık</option>
                          <option value="Kiralık">Kiralık</option>
                        </select>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block flex items-start text-sm font-medium text-gray-700"
                        >
                          Oda Sayısı
                        </label>
                        <select
                          name="NumberOfRooms"
                          onChange={(e) => setNumberOfRooms(e.target.value)}
                          value={numberOfRooms}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="1+0">1+0</option>
                          <option value="1+1">1+1</option>
                          <option value="2+1">2+1</option>
                          <option value="3+1">3+1</option>
                          <option value="4+1">4+1</option>
                          <option value="4+2">4+2</option>
                        </select>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="email"
                          className="block flex items-start text-sm font-medium text-gray-700"
                        >
                          İlan Yaşı
                        </label>
                        <div className="mt-1">
                          <input
                            name="BuildingAge"
                            onChange={(e) => setBuildingAge(e.target.value)}
                            placeholder={buildingAge}
                            type="number"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block h-10 w-full sm:text-sm border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="email"
                          className="block flex items-start text-sm font-medium text-gray-700"
                        >
                          M2
                        </label>
                        <div className="mt-1">
                          <input
                            name="GrossSquareMeters"
                            onChange={(e) =>
                              setGrossSquareMeters(e.target.value)
                            }
                            placeholder={grossSquareMeters}
                            type="number"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block h-10 w-full sm:text-sm border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="email"
                          className="block flex items-start text-sm font-medium text-gray-700"
                        >
                          Kaçıncı Kat
                        </label>
                        <div className="mt-1">
                          <input
                            name="FloorNumber"
                            onChange={(e) => setFloorNumber(e.target.value)}
                            placeholder={floorNumber}
                            type="number"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block h-10 w-full sm:text-sm border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="email"
                          className="block flex items-start text-sm font-medium text-gray-700"
                        >
                          Toplam Kat Sayısı
                        </label>
                        <div className="mt-1">
                          <input
                            name="TotalFloors"
                            onChange={(e) => setTotalFloors(e.target.value)}
                            placeholder={totalFloors}
                            type="number"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block h-10 w-full sm:text-sm border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block flex items-start text-sm font-medium text-gray-700"
                        >
                          Isınma Tipi
                        </label>
                        <select
                          name="HeatingType"
                          onChange={(e) => setHeatingType(e.target.value)}
                          value={heatingType}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="Güneş Enerjisi">Güneş Enerjisi</option>
                          <option value="Kat Kaloriferi">Kat Kaloriferi</option>
                          <option value="Klima">Klima</option>
                          <option value="Kombi">Kombi</option>
                          <option value="Soba">Soba</option>
                        </select>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block flex items-start text-sm font-medium text-gray-700"
                        >
                          Eşyalı
                        </label>
                        <select
                          name="FurnishingStatus"
                          onChange={(e) => setFurnishingStatus(e.target.value)}
                          value={furnishingStatus}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="Evet">Evet</option>
                          <option value="Hayır">Hayır</option>
                        </select>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block flex items-start text-sm font-medium text-gray-700"
                        >
                          Cephe
                        </label>
                        <select
                          name="Facade"
                          onChange={(e) => setFacade(e.target.value)}
                          value={facade}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="Kuzey Cephe">Kuzey Cephe</option>
                          <option value="Güney Cephe">Güney Cephe</option>
                          <option value="Batı Cephe">Batı Cephe</option>
                          <option value="Doğu Cephe">Doğu Cephe</option>
                        </select>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="email"
                          className="block flex items-start text-sm font-medium text-gray-700"
                        >
                          Balkon Sayısı
                        </label>
                        <div className="mt-1">
                          <input
                            name="BalconyCount"
                            onChange={(e) => setBalconyCount(e.target.value)}
                            placeholder={balconyCount}
                            type="number"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block h-10 w-full sm:text-sm border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="email"
                          className="block flex items-start text-sm font-medium text-gray-700"
                        >
                          Tuvalet Sayısı
                        </label>
                        <div className="mt-1">
                          <input
                            name="BathroomCount"
                            onChange={(e) => setBathroomCount(e.target.value)}
                            placeholder={bathroomCount}
                            type="number"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block h-10 w-full sm:text-sm border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="email"
                          className="block flex items-start text-sm font-medium text-gray-700"
                        >
                          Şehir
                        </label>
                        <div className="mt-1">
                          <input
                            name="City"
                            onChange={(e) => setCity(e.target.value)}
                            placeholder={city}
                            type="text"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block h-10 w-full sm:text-sm border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="email"
                          className="block flex items-start text-sm font-medium text-gray-700"
                        >
                          Aidat Ücreti
                        </label>
                        <div className="mt-1">
                          <input
                            name="MonthlyFee"
                            onChange={(e) => setMonthlyFee(e.target.value)}
                            placeholder={monthlyFee}
                            type="text"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block h-10 w-full sm:text-sm border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block flex items-start text-sm font-medium text-gray-700"
                        >
                          Vitrin Fotoğrafı
                        </label>
                        <div className="mt-1">
                          <input
                            name="ThumbnailUrl"
                            onChange={(e) =>
                              setThumbnailImageUrl(e.target.value)
                            }
                            placeholder={thumbnailUrl}
                            type="text"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block h-10 w-full sm:text-sm border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block flex items-start text-sm font-medium text-gray-700"
                        >
                          1. Fotoğraf
                        </label>
                        <div className="mt-1">
                          <input
                            name="PhotoUrl1"
                            onChange={(e) => setPhotoUrl1(e.target.value)}
                            placeholder={photoUrl1}
                            type="text"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block h-10 w-full sm:text-sm border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block flex items-start text-sm font-medium text-gray-700"
                        >
                          2. Fotoğraf
                        </label>
                        <div className="mt-1">
                          <input
                            name="PhotoUrl2"
                            onChange={(e) => setPhotoUrl2(e.target.value)}
                            placeholder={photoUrl2}
                            type="text"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block h-10 w-full sm:text-sm border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block flex items-start text-sm font-medium text-gray-700"
                        >
                          3. Fotoğraf
                        </label>
                        <div className="mt-1">
                          <input
                            name="PhotoUrl3"
                            onChange={(e) => setPhotoUrl3(e.target.value)}
                            placeholder={photoUrl3}
                            type="text"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block h-10 w-full sm:text-sm border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="comment"
                          className="block flex items-start text-sm font-medium text-gray-700"
                        >
                          Ürün Açıklaması
                        </label>
                        <div className="mt-1">
                          <textarea
                            rows={10}
                            name="Description"
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={description}
                            className="shadow-sm border focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="email"
                          className="block flex items-start text-sm font-medium text-gray-700"
                        >
                          Depozito
                        </label>
                        <div className="mt-1">
                          <input
                            name="Deposit"
                            onChange={(e) => setDeposit(e.target.value)}
                            placeholder={deposit}
                            type="text"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block h-10 w-full sm:text-sm border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="email"
                          className="block flex items-start text-sm font-medium text-gray-700"
                        >
                          Fiyat
                        </label>
                        <div className="mt-1">
                          <input
                            name="Price"
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder={price}
                            type="text"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block h-10 w-full sm:text-sm border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      İlanı Düzenle
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeEditEstates;
