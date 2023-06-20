import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        book: bookSlice.reducer,
    },
})

export default store;