import { createSlice } from '@reduxjs/toolkit';

export interface SlideShowState {
    isLoading: boolean;
    totalSlideShowes: number;
    slideShowesPerPage: number;
    data: {
        _id: string;
        title: string;
        lastModifiedAt: string;
        isActive: boolean;
        createdAt: string;
        usersInfo: [];
        isChecked: boolean;
    }[];
}

const initialState: SlideShowState = {
    isLoading: false,
    totalSlideShowes: 0,
    slideShowesPerPage: 0,
    data: [],
};

const SlideShowSlice = createSlice({
    name: 'slideShow',
    initialState,
    reducers: {
        resetSlideShow: () => ({
            ...initialState,
        }),
        loadingSlideShow: (state) => ({
            ...state,
            isLoading: true,
        }),
        getSlideShowSuccess: (state, { payload }) => ({
            ...state,
            isLoading: false,
            totalSlideShowes: payload.totalSlideShowes,
            slideShowesPerPage: payload.slideShowesPerPage,
            data: payload.slideShowes,
        }),
        getSlideShowFail: (state) => ({
            ...state,
            ...initialState,
        }),
        deleteSlideShowSuccess: (state, { payload }) => {
            const { data } = state;
            const newPhotoGallery = data.filter((photoGallery) => payload.indexOf(photoGallery._id) < 0);
            return {
                ...state,
                isLoading: false,
                data: [...newPhotoGallery],
            };
        },
        deleteSlideShowFail: (state) => {
            const { data } = state;
            return {
                ...state,
                isLoading: false,
                data: [...data],
            };
        },
    },
});

export const { resetSlideShow, loadingSlideShow, getSlideShowSuccess, getSlideShowFail, deleteSlideShowSuccess,deleteSlideShowFail } =
    SlideShowSlice.actions;
export default SlideShowSlice.reducer;
