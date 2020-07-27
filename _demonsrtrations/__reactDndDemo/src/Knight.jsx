import React from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { KnightImage } from './KnightImage';

const knightStyle = {
    fontSize: 50,
    fontWeight: 'bold',
    cursor: 'move',
};

export const Knight = () => {
    const [{ isDragging }, drag, preview] = useDrag({
        item: { type: ItemTypes.KNIGHT }, // 指定棋子类型:KNIGHT
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });
    return (
        <>
            <DragPreviewImage connect={preview} src={KnightImage} />
            <div
                ref={drag}
                style={{ ...knightStyle, opacity: isDragging ? 0.5 : 1 }}
            >
                ♘
            </div>
        </>
    );
};
// 创建 拖动时显示的图片; 拖动时 棋子显示半透明, 否则不透明
