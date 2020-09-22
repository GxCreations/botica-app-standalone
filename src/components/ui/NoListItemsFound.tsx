import React from 'react';

export const NoListItemsFound = ({title, filter}: any) => {   

    return (
        <>
            <div className="loader">There are no {title} found using the filter "{filter}"</div>
        </>
    );
};
