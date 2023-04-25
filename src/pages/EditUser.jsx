import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameSurname, setNameSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(
          `http://localhost:5298/api/users/${id}`
        );
        const user = response.data;
        setEmail(user.email);
        setPassword(user.password);
        setNameSurname(user.nameSurname);
        setPhoneNumber(user.phoneNumber);
        setPhotoUrl(user.photoUrl);
      } catch (error) {
        console.error("Kullanıcı yüklenirken hata oluştu:", error);
      }
    }

    fetchUser();
  }, [id]);

  const handleUpdateUser = async () => {
    try {
      const updatedUser = {
        id,
        email,
        password,
        nameSurname,
        phoneNumber,
        photoUrl,
      };

      await axios.put(`http://localhost:5298/api/users/${id}`, updatedUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Güncelleme işlemi başarılı",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/admin/userslist");
    } catch (error) {
      console.error("Kullanıcı güncellenirken hata oluştu:", error);
    }
  };

  return (
    <div>
      <div className="">
        <h2 className="mt-3 display-h3 block text-sm font-semibold text-black">
          KULLANICIYI DÜZENLE
        </h2>
        <label
          htmlFor="email"
          className="mt-2 block text-sm font-medium text-gray-700"
        >
          Kullanıcı E-maili
        </label>
        <div className="mt-1">
          <input
            type="text"
            className="text-black mb-2 mt-2 block w-2/3 mx-auto rounded-xl border-2 border-muted-3 bg-transparent px-4 py-2.5 font-semibold text-heading placeholder:text-text/50 focus:border-primary focus:outline-none focus:ring-0 sm:text-sm"
            onChange={(e) => setEmail(e.target.value)}
            placeholder={email}
          />
        </div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Kullanıcı Şifresi
        </label>
        <div className="mt-1">
          <input
            type="text"
            className="text-black mb-2 mt-2 block w-2/3 mx-auto rounded-xl border-2 border-muted-3 bg-transparent px-4 py-2.5 font-semibold text-heading placeholder:text-text/50 focus:border-primary focus:outline-none focus:ring-0 sm:text-sm"
            onChange={(e) => setPassword(e.target.value)}
            placeholder={password}
          />
        </div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Kullanıcı Adı Soyadı
        </label>
        <div className="mt-1">
          <input
            type="text"
            className="text-black mb-2 mt-2 block w-2/3 mx-auto rounded-xl border-2 border-muted-3 bg-transparent px-4 py-2.5 font-semibold text-heading placeholder:text-text/50 focus:border-primary focus:outline-none focus:ring-0 sm:text-sm"
            onChange={(e) => setNameSurname(e.target.value)}
            placeholder={nameSurname}
          />
        </div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Kullanıcı Telefon Numarası
        </label>
        <div className="mt-1">
          <input
            type="text"
            className="text-black mb-2 mt-2 block w-2/3 mx-auto rounded-xl border-2 border-muted-3 bg-transparent px-4 py-2.5 font-semibold text-heading placeholder:text-text/50 focus:border-primary focus:outline-none focus:ring-0 sm:text-sm"
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder={phoneNumber}
          />
        </div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Kullanıcı Fotoğrafı
        </label>
        <div className="mt-1">
          <input
            type="text"
            className="text-black mb-2 mt-2 block w-2/3 mx-auto rounded-xl border-2 border-muted-3 bg-transparent px-4 py-2.5 font-semibold text-heading placeholder:text-text/50 focus:border-primary focus:outline-none focus:ring-0 sm:text-sm"
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder={photoUrl}
          />
        </div>
        <div className="mt-1">
          <button
            type="button"
            onClick={handleUpdateUser}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Düzenle
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
