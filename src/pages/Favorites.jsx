import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFavorites } from "../redux/realEstateSlice";

function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.realEstate.favorites);
  console.log(favorites);

  const handleRemoveFromFavorites = (estateId) => {
    dispatch(removeFromFavorites(estateId));
  };

  return (
    <div>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-0">
          <h1 className="text-3xl font-extrabold text-center tracking-tight text-gray-900 sm:text-4xl">
            Favoriler
          </h1>

          <form className="mt-12">
            <section aria-labelledby="cart-heading">
              <ul
                role="list"
                className="border-t border-b border-gray-200 divide-y divide-gray-200"
              >
                {favorites.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="flex-shrink-0">
                      <img
                        src={product.thumbnailUrl}
                        alt=""
                        className="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32"
                      />
                    </div>

                    <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="text-sm">{product.name}</h4>
                          <p className="ml-4 text-sm font-medium text-gray-900">
                            {product.price} ₺
                          </p>
                        </div>
                        <div className="flex items-start">
                          <p className="mt-1 text-sm text-gray-500">
                            {product.city}
                          </p>
                        </div>
                        <div className="flex items-start">
                          <p className="mt-1 text-sm text-gray-500">
                            {product.propertyType}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex-1 flex items-end justify-between">
                        <div className="ml-4">
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveFromFavorites(product.id)
                            }
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            <span>Kaldır</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Favorites;
