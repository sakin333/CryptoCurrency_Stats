import { configureStore } from "@reduxjs/toolkit";
import coinReducer from "../features/coins/coinSlice";

export default configureStore({
    reducer: {
        coins : coinReducer
    }
})