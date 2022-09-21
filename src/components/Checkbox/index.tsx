import React, { FC } from 'react';
import { Icon } from '..';
import './index.scss';

interface ICheckbox {
	checked: boolean;
	onChange?: (checked: boolean) => void;
}

const Checkbox: FC<ICheckbox> = ({
    checked, onChange
}) => {
    return (
        <div className="Checkbox" onClick={() => onChange && onChange(!checked)}>
            <input type="checkbox" />
            <div>{ checked && <Icon name="check" size={20} /> }</div>
        </div>
    );
};

export default Checkbox;
