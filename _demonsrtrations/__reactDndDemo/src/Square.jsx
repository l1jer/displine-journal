import React from 'react';

const squareStyle = {
    // 这里必须是62.5px才能正常显示
    width: '62.5px',
    height: '62.5px',
};

export const Square = ({ black, children }) => {
    const backgroundColor = black ? 'black' : 'white';
    const color = black ? 'white' : 'black';
    return (
        <div
            style={{
                ...squareStyle,
                color,
                backgroundColor,
            }}
        >
            {children}
        </div>
    );
};
