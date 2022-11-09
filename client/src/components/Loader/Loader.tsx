import React from 'react';
import ContentLoader from 'react-content-loader';

const BootstrapCardDataTable = (props: any) => {
    const count = 7;
    return (
        <ContentLoader
            width={'100%'}
            height={window.screen.height}
            backgroundColor="#d2d0d0"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="0" y="10" rx="5" ry="5" width="100%" height="60" />

            {Array(count)
                .fill(0)
                .map((value, index) => {
                    return (
                        <React.Fragment key={index}>
                            <rect x="0" y={(50 * index + 100).toString()} rx="10" ry="10" width="30" height="30" />
                            <rect x="50" y={(50 * index + 100).toString()} rx="10" ry="10" width="250" height="30" />
                            <rect x="320" y={(50 * index + 100).toString()} rx="10" ry="10" width="160" height="30" />
                            <rect x="500" y={(50 * index + 100).toString()} rx="10" ry="10" width="300" height="30" />
                            <rect x="820" y={(50 * index + 100).toString()} rx="10" ry="10" width="260" height="30" />
                            <rect x="1100" y={(50 * index + 100).toString()} rx="10" ry="10" width="150" height="30" />
                            <rect x="1270" y={(50 * index + 100).toString()} rx="10" ry="10" width="150" height="30" />
                            <rect x="1390" y={(50 * index + 100).toString()} rx="10" ry="10" width="150" height="30" />
                            <rect x="1570" y={(50 * index + 100).toString()} rx="10" ry="10" width="150" height="30" />
                        </React.Fragment>
                    );
                })}
        </ContentLoader>
    );
};

export default BootstrapCardDataTable;
