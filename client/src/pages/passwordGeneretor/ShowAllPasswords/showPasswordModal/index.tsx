import React, { useCallback, useState, useEffect } from 'react';
import { StyledButton } from '../../../../components/Button';
import StyledInput from '../../../../components/StyledInput';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { savePassword, SavePassType, showPassword, updatePassword } from '../../../../modules/reducers/passwordReducer';
import { useDispatch } from 'react-redux';
interface ShowPasswordModalProps {
    modalData: any;
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

const ShowPasswordModal = ({ modalData, handleClose }: ShowPasswordModalProps) => {
    const dispatch = useDispatch();
    const { data, isOpen } = modalData;
    const WEBSITE = 'site';
    const USERNAME = 'username';
    const PASSWORD = 'password';
    const initialValue = {
        [WEBSITE]: '',
        [USERNAME]: '',
        [PASSWORD]: '',
    };
    const [values, setValues] = useState<SavePassType>(initialValue);
    const [initialPass, setInitialPass] = useState<string>('');
    const [isEditable, setIsEditable] = useState<boolean>(false);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setValues((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        },
        [values],
    );

    const handleCancel = useCallback(() => {
        setValues({
            [WEBSITE]: data.site,
            [USERNAME]: data.username,
            [PASSWORD]: initialPass,
        });
        setIsEditable(false);
    }, []);

    const fetchPassword = async (id: string) => {
        const res = await dispatch(showPassword({ id }));
        if (res?.type === 'passwords/showPassword/fulfilled') {
            return res?.payload?.password;
        }
        return '';
    };

    const handleFormSubmit = useCallback(async () => {
        try {
            const res = await dispatch(updatePassword({ data: values, id: data.id }));
            if (res?.type === 'passwords/updatePassword/fulfilled') handleClose();
        } catch (err) {
            console.log(err);
        }
    }, [values]);

    useEffect(() => {
        setValues((pre) => ({
            ...pre,
            [WEBSITE]: data.site,
            [USERNAME]: data.username,
        }));
        setIsEditable(modalData.isEdit);
        fetchPassword(data.id).then((password) => {
            setValues((pre) => ({
                ...pre,
                [PASSWORD]: password,
            }));
            setInitialPass(password);
        });

        return () => {
            setValues(initialValue);
            setIsEditable(false);
            setInitialPass('');
        };
    }, [data]);

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={modalStyle}
            >
                <DialogTitle sx={{ textAlign: 'center' }}>
                    <p className="text-2xl">Password</p>
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
                                readOnly={!isEditable}
                            />
                            <StyledInput
                                name={USERNAME}
                                value={values[USERNAME]}
                                onChange={handleInputChange}
                                label="UserName"
                                type="text"
                                readOnly={!isEditable}
                            />
                            <StyledInput
                                name={PASSWORD}
                                value={values[PASSWORD]}
                                onChange={handleInputChange}
                                label="Password"
                                type="password"
                                readOnly={!isEditable}
                            />
                            <div className="grid grid-cols-2 gap-6 mt-4">
                                {isEditable ? (
                                    <>
                                        <StyledButton type="cancel" label="Cancel" onClick={handleCancel} />
                                        <StyledButton label="Update" onClick={handleFormSubmit} />
                                    </>
                                ) : (
                                    <>
                                        <StyledButton type="cancel" label="Close" onClick={handleClose} />
                                        <StyledButton label="Edit" onClick={() => setIsEditable(true)} />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ShowPasswordModal;
