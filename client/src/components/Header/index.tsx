import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthUser } from '../../modules/selectors/auth';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Button from '@mui/material/Button';
import { logOut } from '../../modules/reducers/authReducer';

const Header = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const user = useSelector(getAuthUser);

    const onLogout = () => dispatch(logOut());

    return (
        <div className="relative bg-transparent">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <a href="#">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto sm:h-12"
                                src={`${process.env.PUBLIC_URL}/assets/avatars/ssAvatar.png`}
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="-my-2 -mr-2 md:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border border-gray-700 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            aria-expanded="false"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="sr-only">Open menu</span>

                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                        <p className="whitespace-nowrap text-base font-medium text-white mr-6">{user?.user?.email}</p>
                        <Button
                            className="hover:text-gray-400"
                            variant="text"
                            sx={{
                                fontSize: '1rem',
                                lineHeight: '1.5rem',
                                whiteSpace: 'nowrap',
                                fontWeight: '500',
                                color: 'white',
                                textTransform: 'none',
                            }}
                            onClick={onLogout}
                        >
                            Log Out <LogoutRoundedIcon sx={{ ml: 1 }} />
                        </Button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden z-10">
                    <div className="rounded-lg bg-primary-lighter shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="px-5 pt-5 pb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <img
                                        className="h-12 w-auto"
                                        src={`${process.env.PUBLIC_URL}/assets/avatars/ssAvatar.png`}
                                        alt="Your Company"
                                    />
                                </div>
                                <div className="-mr-2">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        type="button"
                                        className="inline-flex items-center justify-center rounded-md bg-primary-lighter p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                    >
                                        <span className="sr-only">Close menu</span>

                                        <svg
                                            className="h-6 w-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6 py-6 px-5">
                            <div>
                                <p className="my-6 text-center text-base font-medium text-gray-500">
                                    Logged in as : <span className="text-black">{user?.user?.email}</span>
                                </p>
                                <a
                                    onClick={onLogout}
                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                >
                                    Log Out <LogoutRoundedIcon sx={{ ml: 1 }} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
