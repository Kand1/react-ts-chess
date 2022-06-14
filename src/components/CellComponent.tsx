import React, {FC} from 'react';
import {Cell} from "../models/Cell";

interface CellProps {
    cell: Cell;
    selected: boolean;
    cellClick: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({cell, selected, cellClick}) => {
    return (
        <div
            onClick={() => cellClick(cell)}
            className={[
                'board__cell',
                `board__cell_${cell.color}`,
                selected ? 'board__cell_selected' : '',
                cell.available && cell.figure ? 'board__cell_available-attack' : '',
            ].join(' ')}
        >
            {cell.available && !cell.figure && <div className={'board__cell_available-move'}/>}
            {cell.figure?.logo && <img src={cell.figure.logo} alt=""/>}
        </div>
    );
};

export default CellComponent;
