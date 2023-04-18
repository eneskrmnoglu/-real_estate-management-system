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
        (estate) => estate.Id !== action.payload
      );
    },
    updateRealEstate: (state, action) => {
      const index = state.realEstates.findIndex(
        (estate) => estate.Id === action.payload.Id
      );
      if (index !== -1) {
        state.realEstates[index] = action.payload;
      }
    },
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (estate) => estate.Id !== action.payload
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
} = realEstateSlice.actions;

export default realEstateSlice.reducer;
