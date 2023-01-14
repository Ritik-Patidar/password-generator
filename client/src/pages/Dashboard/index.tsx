import React from 'react';
import SearchBar from '../../components/SearchBar';
import Card from './card';
import { cardDetails } from './data';
import {useHistory} from 'react-router-dom';

const Dashboard = () => {
    const history = useHistory() ;

    return (
        <>
            
            <div className="mx-10 sm:mx-16 lg:mx-28 xl:mx-36">
                <SearchBar />
                <div className="mt-6">
                    <div className="w-full grid grid-rows-[9rem] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2 xl:gap-3">
                        {cardDetails?.map((properties, index) => (
                            <Card  key={index} properties={properties} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
