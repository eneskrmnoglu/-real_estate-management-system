import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  realEstates: [],
  favorites: [],
};

const realEstateSlice = createSlice({
  name: "realEstate",
  initialState,
  reducers: {
    setRealEstates: (state, action) => {
      state.realEstates = action.payload;
    },
    addRealEstate: (state, action) => {
      state.realEstates.push(action.payload);
    },
    deleteRealEstate: (state, action) => {
      state.realEstates = state.realEstates.filter(
        (estate) => estate.id !== action.payload
      );
    },
    filterRealEstatesByCity: (state, action) => {
      state.realEstates = state.realEstates.filter(
        (realEstate) => realEstate.city === action.payload
      );
    },
    filterRealEstatesByName: (state, action) => {
      state.realEstates = state.realEstates.filter((realEstate) =>
        realEstate.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    filterRealEstatesByPropertyType: (state, action) => {
      state.realEstates = state.realEstates.filter(
        (realEstate) =>
          realEstate.propertyType.toLowerCase() === action.payload.toLowerCase()
      );
    },
    updateRealEstate: (state, action) => {
      const index = state.realEstates.findIndex(
        (estate) => estate.id === action.payload.Id
      );
      if (index !== -1) {
        state.realEstates[index] = action.payload;
      }
    },
    addToFavorites: (state, action) => {
      // Eğer zaten favorilerde değilse, gayrimenkulü favorilere ekle
      if (!state.favorites.some((estate) => estate.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (estate) => estate.id !== action.payload
      );
    },
  },
});

export const {
  setRealEstates,
  addRealEstate,
  deleteRealEstate,
  updateRealEstate,
  addToFavorites,
  removeFromFavorites,
  updateFilters,
  filterRealEstatesByCity,
  filterRealEstatesByName,
  filterRealEstatesByPropertyType,
} = realEstateSlice.actions;

export default realEstateSlice.reducer;
