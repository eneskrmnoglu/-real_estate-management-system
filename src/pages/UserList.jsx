import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await axios.get("http://localhost:5298/api/users");
      console.log(response);
      setUsers(response.data);
    } catch (error) {
      console.error("Kullanıcılar yüklenirken hata oluştu:", error);
    }
  }

  async function deleteUser(id) {
    try {
      await axios.delete(`http://localhost:5298/api/users/${id}`);
      fetchUsers(); // Kullanıcı silindikten sonra, listenin güncellenmesi için kullanıcıları tekrar çek
    } catch (error) {
      console.error(`Kullanıcı silinirken hata oluştu: ${id}`, error);
    }
  }

  const handleEdit = (userId) => {
    navigate(`/admin/edituser/${userId}`);
  };

  return (
    <div className="h-full w-full overflow-x-auto rounded-xl bg-layer-2 px-11 py-6 scrollbar bg-white">
      <table className="w-full divide-y divide-muted-1">
        <thead className="text-xs font-semibold uppercase text-text text-red-500">
          <tr>
            <th className="whitespace-nowrap bg-layer-2 py-3 px-4 text-center font-semibold text-text">
              User Email
            </th>
            <th className="whitespace-nowrap bg-layer-2 py-3 px-4 text-center font-semibold text-text">
              User Password
            </th>
            <th className="whitespace-nowrap bg-layer-2 py-3 px-4 text-center font-semibold text-text">
              User NameSurname
            </th>
            <th className="whitespace-nowrap bg-layer-2 py-3 px-4 text-center font-semibold text-text">
              User Operations
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-muted-1 text-sm font-medium">
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td className="whitespace-nowrap bg-layer-2 py-3 px-4 text-heading">
                  <span>{user.email}</span>
                </td>
                <td className="whitespace-nowrap bg-layer-2 py-3 px-4 text-heading">
                  {user.password}
                </td>
                <td className="whitespace-nowrap bg-layer-2 py-3 px-4 text-heading">
                  {user.nameSurname}
                </td>
                <td className="whitespace-nowrap bg-layer-2 py-3 px-4 text-heading">
                  <i
                    class="bi bi-pen-fill text-blue-500"
                    onClick={() => handleEdit(user.id)}
                  ></i>
                  <i
                    class="bi bi-trash-fill ml-2 text-red-500"
                    onClick={() => deleteUser(user.id)}
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

export default UserList;
