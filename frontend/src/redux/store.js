import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { studentReducer } from './studentRelated/studentSlice';
import { noticeReducer } from './noticeRelated/noticeSlice';
import { sclassReducer } from './sclassRelated/sclassSlice';
import { teacherReducer } from './teacherRelated/teacherSlice';
import { complainReducer } from './complainRelated/complainSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
        teacher: teacherReducer,
        notice: noticeReducer,
        complain: complainReducer,
        sclass: sclassReducer
    },
    // Add middleware and devTools configuration if necessary
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable the serializable check
        }),
    devTools: process.env.NODE_ENV !== 'production', // Enable devTools in non-production environments
});

export default store;
