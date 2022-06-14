import React, {FC} from 'react';
import {Figure} from "../models/figures/Figure";

interface LostFigures {
    title: string;
    figures: Figure[];
}

const LostFigures: FC<LostFigures> = ({title, figures}) => {
    return (
        <div className="lost-figures">
            <div className="lost-figures__title">
                {title}
            </div>
            <div className="lost-figures__list">
                {figures && figures.map((figure) =>
                    <div key={figure.id} className="lost-figures__element">
                        {figure.name}
                        {figure.logo && <img src={figure.logo}/>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LostFigures;
