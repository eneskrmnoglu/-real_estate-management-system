import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
        <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 flex justify-center">
            <a href="/" className="inline-flex">
              <span className="sr-only">Zillow</span>
              <img
                className="h-12 w-auto"
                src="https://s.zillowstatic.com/pfs/static/z-logo-default.svg"
                alt=""
              />
            </a>
          </div>
          <div className="py-16">
            <div className="text-center">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                404 HATA
              </p>
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Sayfa bulunamadı.
              </h1>
              <p className="mt-2 text-base text-gray-500">
                Üzgünüm, aradığın sayfaya ulaşamadık.
              </p>
              <div className="mt-6">
                <Link
                  to="/anasayfa"
                  className="text-base font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Ana Sayfaya Dön<span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default NotFound;
