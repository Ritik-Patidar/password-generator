import React from 'react';

const RedirectToAngular = () => {
    React.useEffect(() => {
        window.location.replace(`/#${window.location.pathname}`);
    }, []);
    return <></>;
};

export default RedirectToAngular;
