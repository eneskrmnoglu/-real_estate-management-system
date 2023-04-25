import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ChangeEstates() {
  const [usersListings, setUserListings] = useState([]);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserListings();
  }, []);

  const fetchUserListings = async () => {
    try {
      const response = await axios.get("http://localhost:5298/api/RealEstate");
      const listings = response.data;
      console.log(listings);
      const userProperties = listings.filter(
        (listing) => listing.userId === user.id
      );
      setUserListings(userProperties);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (estateId) => {
    try {
      await axios.delete(`http://localhost:5298/api/RealEstate/${estateId}`);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Silme işlemi başarılı.",
        showConfirmButton: false,
        timer: 1500,
      });
      fetchUserListings();
    } catch (error) {
      console.error("Gayrimenkul silinirken hata oluştu:", error);
    }
  };

  const handleEdit = (estateId) => {
    navigate(`/ilanduzenle/${estateId}`);
  };

  return (
    <div className="h-full w-full overflow-x-auto rounded-xl bg-layer-2 px-11 py-6 scrollbar bg-white">
      <table className="w-full divide-y divide-muted-1">
        <thead className="text-xs font-semibold uppercase text-text text-red-500">
          <tr>
            <th className="whitespace-nowrap bg-layer-2 py-3 px-4 text-center font-semibold text-text">
              Estate ID
            </th>
            <th className="whitespace-nowrap bg-layer-2 py-3 px-4 text-center font-semibold text-text">
              Estate Name
            </th>
            <th className="whitespace-nowrap bg-layer-2 py-3 px-4 text-center font-semibold text-text">
              Estate Property Type
            </th>
            <th className="whitespace-nowrap bg-layer-2 py-3 px-4 text-center font-semibold text-text">
              Estate Operations
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-muted-1 text-sm font-medium">
          {usersListings.map((estate) => {
            return (
              <tr key={estate.id}>
                <td className="whitespace-nowrap bg-layer-2 py-3 px-4 text-heading">
                  <span>{estate.id}</span>
                </td>
                <td className="whitespace-nowrap bg-layer-2 py-3 px-4 text-heading">
                  {estate.name}
                </td>
                <td className="whitespace-nowrap bg-layer-2 py-3 px-4 text-heading">
                  {estate.propertyType}
                </td>
                <td className="whitespace-nowrap bg-layer-2 py-3 px-4 text-heading">
                  <i
                    class="bi bi-pen-fill text-blue-500"
                    onClick={() => handleEdit(estate.id)}
                  ></i>
                  <i
                    class="bi bi-trash-fill ml-2 text-red-500"
                    onClick={() => handleDelete(estate.id)}
                  ></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ChangeEstates;
