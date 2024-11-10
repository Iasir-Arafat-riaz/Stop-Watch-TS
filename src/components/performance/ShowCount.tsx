import React from 'react';

const ShowCount = ({ count, title }:{count:number,title:string}) => {
    console.log(`rendering ${title}...`);
    return (
        <div>
            {title} {count}
        </div>
    );
};

export default React.memo(ShowCount);