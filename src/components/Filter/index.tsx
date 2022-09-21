import React, { FC } from 'react';
import './index.scss';

interface IFilter {
	tags: string[];
	selected: Record<string, boolean>;
	onChange: (selected: Record<string, boolean>) => void;
}

const Filter: FC<IFilter> = ({
    tags, selected, onChange
}) => {

    const beforeChange = (key: string) => {
        selected[key] = !selected[key];
        onChange(selected);
    };

    return (
        <div className="Filter">
            {/* <div className="Filter__btn"><span></span><span></span><span></span></div> */}
            <div className="Filter__selects">
                { tags.map(item => (
                    <div key={item} className="Filter__checkbox">
                        <input
                            type="checkbox"
                            id={item}
                            value={String(selected[item])}
                            checked={selected[item]}
                            onChange={() => beforeChange(item)} />
                        <label htmlFor={item}>{ item }</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Filter;
