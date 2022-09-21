import React, { FC } from 'react';
import { Checkbox, Icon } from '..';
import './index.scss';

interface ITask {
	title: string;
	description: string;
	fulfilled: boolean;
	index: number;
	onChange: (idx: number, checked: boolean) => void;
	onEdit: (idx: number) => void;
	onRemove: (idx: number) => void;
}

const Task: FC<ITask> = ({
    title,
    description,
    fulfilled,
    index,
    onChange,
    onEdit,
    onRemove
}) => {

    const beforeChange = (fulfilled: boolean) => {
        onChange(index, fulfilled);
    };
    return (
        <div className="Task">
            <div className={`Task__title ${fulfilled ? 'fulfilled' : ''}`}>
                <Checkbox checked={fulfilled} onChange={beforeChange} />
                { title }
                <div className="Task__settings">
                    <div className="Task__btn" onClick={() => onEdit(index)}>
                        <Icon name="edit" size={20} />
                    </div>
                    <div className="Task__btn" onClick={() => onRemove(index)}>
                        <Icon name="trash" size={20} />
                    </div>
                </div>
            </div>
            <div className="Task__info">{ description }</div>
        </div>
    );
};

export default Task;
