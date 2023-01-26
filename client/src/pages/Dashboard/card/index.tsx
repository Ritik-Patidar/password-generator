import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Card = ({ properties }: any) => {
    const { title, description, routes, bgClass } = properties;
    return (
        <Link to={routes} className={`rounded-xl lg:translate-z-0 lg:transition-transform lg:duration-100 cursor-pointer ${bgClass}`}>
            <div className="lg:hover:preserve-3d outline-none focus-visible:ring-2 ring-offset-gray-900 focus-visible:ring-offset-4 focus-visible:ring-blue-500 group relative text-white rounded-lg flex flex-col items-center text-center h-36">
                <p>{title}</p>
                <p>{description}</p>
            </div>
        </Link>
    );
};

export default Card;
