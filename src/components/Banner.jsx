import React from "react";

function Banner() {
  return (
    <>
      <div className="bg-gray-600">
        <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <span className="flex p-2 rounded-lg h-10">
                <img src="https://www.hepsiemlak.com/_nuxt/img/evinyuvamolsun-roof.c63146d.png" />
              </span>
              <p className="ml-3 font-medium text-white truncate">
                <span className="hidden md:inline">
                  Evim Yuvan Olsun kampanyasıyla evinizi paylaşabilir ya da
                  afetzedelere kira yardımında bulunabilirsiniz.
                </span>
              </p>
            </div>
            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <a
                href="https://afad.gov.tr/"
                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Tıklayın!
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
