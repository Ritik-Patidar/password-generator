import { RootState } from '../reducers';

export const getSlideShow = (state: RootState) => state.slideShow.data;
export const getSlideShowsPerPage = (state: RootState) => state.slideShow.slideShowesPerPage;
export const getTotalSlideShows = (state: RootState) => state.slideShow.totalSlideShowes;
export const getIsSlideShowLoading = (state: RootState) => state.slideShow.isLoading;
