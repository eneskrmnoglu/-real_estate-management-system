import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { deleteRealEstate } from "../redux/realEstateSlice";
import { setRealEstates } from "../redux/realEstateSlice";

function EstateList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const realEstates = useSelector((state) => state.realEstate.realEstates);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get(
          "http://localhost:5298/api/RealEstate"
        );
        console.log(response);
        dispatch(setRealEstates(response.data));
      } catch (error) {
        console.error("Gayrimenkuller yüklenirken hata oluştu:", error);
      }
    }

    fetchBooks();
  }, [dispatch]);

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
      dispatch(deleteRealEstate(estateId));
    } catch (error) {
      console.error("Gayrimenkul silinirken hata oluştu:", error);
    }
  };

  const handleEdit = (estateId) => {
    navigate(`/admin/editestate/${estateId}`);
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
          {realEstates.map((estate) => {
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

export default EstateList;
