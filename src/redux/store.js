import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import realEstateSlice from "./realEstateSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    realEstate: realEstateSlice,
  },
});
