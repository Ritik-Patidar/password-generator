import React from 'react';
import Button from '@mui/material/Button';
import LandingPageImg from '../../assets/images/landingPage.svg';
import { RoutePaths } from '../../modules/consts/enum';
import { useHistory } from 'react-router-dom';

const LandingPage = () => {

    const history = useHistory();

    return (
        <div className="h-screen w-full">
            <div className="flex justify-end py-4 px-6">
                <div className="mx-2">
                    <Button
                        sx={{
                            color: '#FFFFFF',
                            '&:hover': {
                                color: '#D9D9D9',
                            },
                        }}
                        variant="text"
                        size="medium"
                        onClick={() => history.push(RoutePaths.Login)}
                    >
                        Login
                    </Button>
                </div>
                <div className="mx-2">
                    <Button
                        sx={{
                            color: '#000000',
                            backgroundColor: '#D9D9D9',
                            '&:hover': {
                                backgroundColor: '#FFF',
                            },
                        }}
                        variant="contained"
                    >
                        Sign Up
                    </Button>
                </div>
            </div>
            <div className="grid md:grid-cols-2 items-center ">
                <div>
                    <img src={LandingPageImg} alt="" />
                </div>
                <div className="">
                    <p className="text-white sm:text-xl md:text-7xl text-right mr-10 leading-normal">
                        Discover{' '}
                        <b>
                            the <br />
                            Tools at one Place
                        </b>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
