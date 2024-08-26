import { configureStore } from "@reduxjs/toolkit";

import widgetSliceReducer from './widgetSlice.js';

export const store = configureStore({
    reducer: {
      widgets: widgetSliceReducer,
    }
});