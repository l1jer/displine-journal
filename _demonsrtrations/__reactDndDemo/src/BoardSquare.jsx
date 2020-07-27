import React from 'react';
import { useDrop } from 'react-dnd';
import { Square } from './Square';
import { canMoveKnight, moveKnight } from './Game';
import { ItemTypes } from './ItemTypes';
import { Overlay } from './Overlay';

//可移动方格
export const BoardSquare = ({ x, y, children }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.KNIGHT,
        //  制造可移动范围
        canDrop: () => canMoveKnight(x, y),
        //  移动至
        drop: () => moveKnight(x, y),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });
    const black = (x + y) % 2 === 1;
    return (
        <div
            ref={drop}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }}
        >
            <Square black={black}>{children}</Square>
            {isOver && !canDrop && <Overlay color="red" />}
            {!isOver && canDrop && <Overlay color="yellow" />}
            {isOver && canDrop && <Overlay color="green" />}
        </div>
    );
};
