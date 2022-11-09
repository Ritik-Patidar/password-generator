import api from '../../api/config';
import {
    loadingSlideShow,
    getSlideShowSuccess,
    getSlideShowFail,
    deleteSlideShowSuccess,
    deleteSlideShowFail
} from '../reducers/slideShowReducer';
import { AppDispatch } from '../store';
import { toast } from 'react-toastify';

export const getAllSlideShow =
    (pageNo: number, reporter = '', searchText = '') =>
    async (dispatch: AppDispatch) => {
        dispatch(loadingSlideShow());
        try {
            const res = await api.get(`/slide-show?pageIndex=${pageNo}&reporter=${reporter}&searchText=${searchText}`);
            if (res.data.code === 200) {
                console.log('200');
                dispatch(getSlideShowSuccess(res.data.data));
                return Promise.resolve();
            } else if (res.data.code === 400) {
                dispatch(getSlideShowFail());
                return Promise.reject('Fail to fetch slide show');
            }
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    };

export const getSlideShowById = (id: string) => async () => {
    try {
        console.log(`/photo-gallery/${id}`);
        const res: any = await api.get(`/slide-show/${id}`);
        if (res?.code === 200) {
            return res.data.data;
        } else if (res?.code === 400) {
            return Promise.reject('Fail to fetch slide show');
        }
        console.log(res);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
};

export const addSlideShow = (formData: any) => async () => {
    try {
        const res = await api.post('/slide-show', formData);
        if (res.data.code === 200) {
            return Promise.resolve();
        } else if (res.data.code === 400) {
            return Promise.reject(res.data.data.errMsg);
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
};

export const updateSlideShow = (id: string, formData: any) => async () => {
    try {
        const res = await api.put(`/slide-show/${id}`, formData);
        if (res.data.code === 200) {
            return Promise.resolve();
        } else if (res.data.code === 400) {
            return Promise.reject(res.data.data.errMsg);
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
};

export const changeStatus = (id: string, newStatus: number) => async () => {
    try {
        const res = await api.put(`/slide-show/${id}/change-status`, { slideShowStatus: newStatus });
        if (res.data.code === 200) {
            toast(res.data.message, {
                type: 'success',
                position: 'top-right',
                autoClose: 3000,
                pauseOnFocusLoss: true,
                closeOnClick: true,
                pauseOnHover: false,
            });
            return Promise.resolve();
        } else if (res.data.code === 400) {
            toast(res.data.message, {
                type: 'error',
                position: 'top-right',
                autoClose: 3000,
                pauseOnFocusLoss: true,
                closeOnClick: true,
                pauseOnHover: false,
            });
            return Promise.reject(res.data.data.errMsg);
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
};

export const deleteSlideShow = (id: string[]) => async (dispatch: AppDispatch) => {
    dispatch(loadingSlideShow());
    try {
        const res = await api.delete(`/slide-show?slideShowIds=${JSON.stringify(id)}`);
        if (res.data.code === 200) {
            dispatch(deleteSlideShowSuccess(id));
            return Promise.resolve();
        } else if (res.data.code === 400) {
            dispatch(deleteSlideShowFail());
            toast(res.data.message, {
                type: 'error',
                position: 'top-right',
                autoClose: 3000,
                pauseOnFocusLoss: true,
                closeOnClick: true,
                pauseOnHover: false,
            });
            return Promise.reject(res.data.data.errMsg);
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
};

export const addImageGallery =
    (imageId: string, isGalleryImage: boolean, slideShowId: string | undefined) => async () => {
        try {
            const data = {
                imageId: imageId,
                isGalleryImage: isGalleryImage,
                slideShowId: slideShowId,
            };
            const res = await api.put(`/slide-show/add-image-gallery`, data);
            if (res.data.code === 200) {
                return Promise.resolve();
            } else if (res.data.code === 400) {
                return Promise.reject(res.data.data.errMsg);
            }
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    };
