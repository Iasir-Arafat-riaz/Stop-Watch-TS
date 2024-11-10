import React from 'react';

const Title = () => {
    console.log("title rendering")
    return (
        <div>
            <h4>UseEffect & UseMemo</h4>
        </div>
    )
};

export default React.memo(Title);