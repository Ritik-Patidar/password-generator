import React from 'react';
import Button from '@mui/material/Button';
import LandingPageImg from '../../assets/images/landingPage.svg';
import { RoutePaths } from '../../modules/consts/enum';
import { useHistory } from 'react-router-dom';

const LandingPage = () => {
    const history = useHistory();

    return (
        <div className="h-full w-full">
            <div className="flex justify-end pt-8 px-6">
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
                            borderRadius:'10px',
                        }}
                        variant="contained"
                        onClick={() => history.push(RoutePaths.SignUp)}
                    >
                        Sign Up
                    </Button>
                </div>
            </div>
            <div className="flex flex-col xs:flex-row items-center">
                <div className="flex-1">
                    <img className='flex-1' src={LandingPageImg} alt="" />
                </div>
                <div className="flex-1 ">
                    <p className='text-white text-right mr-10 text-[10vw] xxs:text-[8vw] xs:text-[5vw]' >
                        Discover{' '}
                        <b>
                            the <br />
                            Tools at one Place
                        </b>
                    </p>
                </div>
            </div>

            <div className="">
                <div className="grid grid-cols-4 xs:h-60 mx-16 mb-16 mt-8">
                    <div className="bg-[#313EF7] rounded-l-3xl" >

                    </div>
                    <div className="bg-[#FE7926]">

                    </div>
                    <div className="bg-[#E4DFFC]">

                    </div>
                    <div className="bg-[#196E86] rounded-r-3xl">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
