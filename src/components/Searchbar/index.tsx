import React, { ChangeEvent, FC } from 'react';
import Icon from '../Icon';
import './index.scss';

interface ISearchbar {
	pattern: string;
	onChange: (pattern: string) => void;
}

const Searchbar: FC<ISearchbar> = ({
    pattern, onChange
}) => {
    return (
        <div className="Searchbar">
            <div className="Searchbar__input">
                <input
                    value={pattern}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                    type="text"
                    placeholder="Type to search" />
                <div className="Searchbar__clear-btn" onClick={() => onChange('')}>
                    <Icon name="close" size={12} />
                </div>
                <Icon name="search" size={24} />
            </div>
            <div className="Searchbar__btn">Поиск</div>
        </div>
    );
};

export default Searchbar;
