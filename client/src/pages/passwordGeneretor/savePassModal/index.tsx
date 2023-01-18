import React, { useCallback, useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { StyledButton } from '../../../components/Button';
import StyledInput from '../../../components/StyledInput';
import { DialogTitle } from '@mui/material';
import { savePassword, SavePassType } from '../../../modules/reducers/passwordReducer';
import { useDispatch } from 'react-redux';
interface SavePassModalProps {
    open: boolean;
    password: string;
    handleClose: () => void;
}

const modalStyle = {
    '& .MuiPaper-root': {
        borderRadius: '24px',
        backgroundColor: '#D9D9D9',
        width: '800px',
        height: '400px',
    },
};

const SavePassModal = ({ open, password, handleClose }: SavePassModalProps) => {
    const dispatch = useDispatch();
    const WEBSITE = 'site';
    const USERNAME = 'username';
    const PASSWORD = 'password';
    const initialValue = {
        [WEBSITE]: '',
        [USERNAME]: '',
        [PASSWORD]: '',
    };
    const [values, setValues] = useState<SavePassType>(initialValue);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }, []);

    const handleFormSubmit = useCallback(async () => {
        try {
            const res = await dispatch(savePassword({ ...values }));
            if (res?.type == 'passwords/savePassword/fulfilled') handleClose();
        } catch (err) {
            console.log(err);
        }
    }, [values]);

    useEffect(() => {
        setValues((prevState) => ({
            ...prevState,
            [PASSWORD]: password,
        }));
    }, [password]);

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={modalStyle}
            >
                <DialogTitle sx={{ textAlign: 'center' }}>
                    <p className="text-2xl">Save Password</p>
                </DialogTitle>
                <DialogContent>
                    <div className="flex justify-center mt-2">
                        <div className="flex flex-col w-7/12">
                            <StyledInput
                                name={WEBSITE}
                                value={values[WEBSITE]}
                                onChange={handleInputChange}
                                label="Website"
                                type="website"
                            />
                            <StyledInput
                                name={USERNAME}
                                value={values[USERNAME]}
                                onChange={handleInputChange}
                                label="UserName"
                                type="text"
                            />
                            <StyledInput
                                name={PASSWORD}
                                value={values[PASSWORD]}
                                onChange={handleInputChange}
                                label="Password"
                                type="password"
                            />
                            <div className="grid grid-cols-2 gap-6 mt-4">
                                <StyledButton type="cancel" label="Cancel" onClick={handleClose} />
                                <StyledButton label="Save" onClick={handleFormSubmit} />
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SavePassModal;
