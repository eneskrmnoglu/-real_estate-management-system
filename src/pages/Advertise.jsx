import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRealEstate } from "../redux/realEstateSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PaymentForm from "../PaymentForm";
import Swal from "sweetalert2";

function Advertise() {
  const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const [realEstate, setRealEstate] = useState({
    Name: "",
    ListingStatus: "",
    PropertyType: "",
    NumberOfRooms: "",
    BuildingAge: 0,
    GrossSquareMeters: 0,
    FloorNumber: 0,
    TotalFloors: "",
    HeatingType: "",
    FurnishingStatus: "",
    Deposit: "",
    Facade: "",
    BalconyCount: 0,
    MonthlyFee: "",
    BathroomCount: 0,
    ThumbnailUrl: "",
    City: "",
    PhotoUrl1: "",
    PhotoUrl2: "",
    PhotoUrl3: "",
    Description: "",
    Price: 0,
    UserId: user ? user.id : null,
  });

  useEffect(() => {
    if (!user) {
      navigate("/girisyap");
    }
  }, [user, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setRealEstate((prevState) => {
      if (
        name === "BuildingAge" ||
        name === "GrossSquareMeters" ||
        name === "FloorNumber" ||
        name === "BalconyCount" ||
        name === "BathroomCount" ||
        name === "Price"
      ) {
        return { ...prevState, [name]: parseInt(value, 10) };
      } else {
        return { ...prevState, [name]: value };
      }
    });
  };

  const handlePaymentSuccess = (paymentMethodId) => {
    handleSubmit(paymentMethodId);
  };

  const handleSubmit = async (paymentMethodId) => {
    // Ödeme işlemi gerçekleştirin
    setProcessing(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentMethodId, amount: 20 }),
    };

    const response = await fetch(
      "http://localhost:5298/api/checkout",
      requestOptions
    );
    const data = await response.json();

    if (data.success) {
      try {
        // Mevcut kullanıcıyı al
        const realEstateWithUserId = { ...realEstate, UserId: user.id };

        console.log("RealEstate object to be sent:", realEstateWithUserId);

        const response = await axios.post(
          "http://localhost:5298/api/RealEstate",
          realEstateWithUserId,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        dispatch(addRealEstate(response.data));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Giriş işlemi başarılı.",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error(error);
        alert("Gayrimenkul ekleme işleminde hata oluştu.");
      }
    } else {
      setError("Ödeme işlemi başarısız.");
    }

    setProcessing(false);
  };

  return (
    <>
      {user && (
        <div>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5"></div>
          </div>

          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Yeni İlan Ver
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Sağ taraftaki form üzerinde gerekli bilgileri doldurup hemen
                    ilan verebilirsiniz. İlan yayınlama ücreti 20₺'dir.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form>
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
                              value={realEstate.Name}
                              onChange={handleChange}
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
                            value={realEstate.ListingStatus}
                            onChange={handleChange}
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
                            value={realEstate.PropertyType}
                            onChange={handleChange}
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
                            value={realEstate.NumberOfRooms}
                            onChange={handleChange}
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
                              value={realEstate.BuildingAge}
                              onChange={handleChange}
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
                              value={realEstate.GrossSquareMeters}
                              onChange={handleChange}
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
                              value={realEstate.FloorNumber}
                              onChange={handleChange}
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
                              value={realEstate.TotalFloors}
                              onChange={handleChange}
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
                            value={realEstate.HeatingType}
                            onChange={handleChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="Güneş Enerjisi">
                              Güneş Enerjisi
                            </option>
                            <option value="Kat Kaloriferi">
                              Kat Kaloriferi
                            </option>
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
                            value={realEstate.FurnishingStatus}
                            onChange={handleChange}
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
                            value={realEstate.Facade}
                            onChange={handleChange}
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
                              value={realEstate.BalconyCount}
                              onChange={handleChange}
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
                              value={realEstate.BathroomCount}
                              onChange={handleChange}
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
                              value={realEstate.City}
                              onChange={handleChange}
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
                              value={realEstate.MonthlyFee}
                              onChange={handleChange}
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
                              value={realEstate.ThumbnailUrl}
                              onChange={handleChange}
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
                              value={realEstate.PhotoUrl1}
                              onChange={handleChange}
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
                              value={realEstate.PhotoUrl2}
                              onChange={handleChange}
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
                              value={realEstate.PhotoUrl3}
                              onChange={handleChange}
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
                              value={realEstate.Description}
                              onChange={handleChange}
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
                              value={realEstate.Deposit}
                              onChange={handleChange}
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
                              value={realEstate.Price}
                              onChange={handleChange}
                              type="text"
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block h-10 w-full sm:text-sm border border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <PaymentForm
                        amount={20}
                        onSuccess={handlePaymentSuccess}
                        setError={setError}
                        error={error}
                        setProcessing={setProcessing}
                        processing={processing}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Advertise;
