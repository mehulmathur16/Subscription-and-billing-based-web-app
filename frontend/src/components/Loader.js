import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div style={{ top: '40vh', left: '45vw', position: 'absolute' }}>
            <ThreeCircles
                height="80"
                width="80"
                color="#034694"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default Loader;