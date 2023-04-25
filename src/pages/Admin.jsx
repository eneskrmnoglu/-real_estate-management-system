import React from "react";
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import UserList from "./UserList";
import EstateList from "./EstateList";
import EditEstate from "./EditEstate";
import EditUser from "./EditUser";

const navigation = [
  {
    name: "Kullanıcılar",
    icon: UsersIcon,
    href: "userslist",
    count: 3,
    current: false,
  },
  {
    name: "Gayrimenkuller",
    icon: FolderIcon,
    href: "estateslist",
    count: 4,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Admin() {
  return (
    <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white ">
      <div className="flex items-center flex-shrink-0 px-4 space-y-5">
        <img
          className="h-8 w-auto"
          src="https://s.zillowstatic.com/pfs/static/z-logo-default.svg"
          alt="Workflow"
        />
        <p className="ml-2">ADMİN PANELİ</p>

        <div className="flex flex-col w-1/4">
          <Link href="#" className="">
            <div className="flex flex-row-reverse">
              <div>
                <img
                  className="inline-block h-9 w-9 rounded-full"
                  src="https://i.hizliresim.com/3javvdf.JPG"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Enes Karamanoğlu
                </p>
                <Link
                  to="/anasayfa"
                  className="text-xs font-medium text-gray-500 group-hover:text-gray-700"
                >
                  Çıkış Yap
                </Link>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="mt-5 flex-grow flex flex-col">
        <nav className="flex-1 bg-white space-y-1" aria-label="Sidebar">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={classNames(
                item.current
                  ? "bg-indigo-50 border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                "group flex items-center px-3 py-2 text-sm font-medium border-l-4"
              )}
            >
              <item.icon
                className={classNames(
                  item.current
                    ? "text-indigo-500"
                    : "text-gray-400 group-hover:text-gray-500",
                  "mr-3 flex-shrink-0 h-6 w-6"
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <Routes>
        <Route path="userslist" element={<UserList />} />
        <Route path="estateslist" element={<EstateList />} />
        <Route path="editestate/:id" element={<EditEstate />} />
        <Route path="edituser/:id" element={<EditUser />} />
      </Routes>
    </div>
  );
}

export default Admin;
