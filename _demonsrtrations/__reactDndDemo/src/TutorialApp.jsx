import React, { useState, useEffect } from 'react';
import { Board } from './Board';
import { observe } from './Game';
// 棋盘大小
const containerStyle = {
    width: 500,
    height: 500,
    border: '1px solid grey',
};

export const TutorialApp = () => {
    const [knightPos, setKnightPos] = useState([1, 7]);
    // 通过 observe 观察棋子位置变动从而保存位置
    useEffect(() => observe((newPos) => setKnightPos(newPos)));
    return (
        <div>
            <div style={containerStyle}>
                <Board knightPosition={knightPos} />
            </div>
        </div>
    );
};
