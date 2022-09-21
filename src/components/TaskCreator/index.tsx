import React, { ChangeEvent, FC, RefObject, useEffect, useRef, useState } from 'react';
import { ITask } from '../../App';
import './index.scss';

interface ITaskCreator {
	task?: ITask;
	idx?: number;
	onSave: (task: ITask, idx: number) => void;
	onDismiss: () => void;
}

const defaultTask = {title: '', description: '', fulfilled: false};

const TaskCreator: FC<ITaskCreator> = ({
    task = defaultTask, idx, onSave, onDismiss
}) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [fulfilled, setFulfilled] = useState(task.fulfilled);
    const myRef: RefObject<HTMLDivElement> = useRef(null);

    const beforeSave = () => {
        const task = {
            title, description, fulfilled
        };
        onSave(task, idx as number);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClick = (e: any) => {
        const target = e.target as HTMLDivElement;
        if (target.classList.contains('TaskCreator')) {
            onDismiss();
        }
    };

    useEffect(() => {
        if (myRef.current) {
            myRef.current.addEventListener('click', handleClick);
        }
        return () => myRef.current?.removeEventListener('click', handleClick);
    }, [myRef]);

    return (
        <div ref={myRef} className="TaskCreator">
            <div className="TaskCreator__form">
                <h2> Create your task </h2>
                <input
                    type="text"
                    placeholder="Name of task"
                    value={title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                />
                <textarea
                    name="desc"
                    id="desc"
                    placeholder="Description of task"
                    value={description}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                ></textarea>
                <div className="TaskCreator__checkbox">
                    <input
                        type="checkbox"
                        id="fulfilled_create"
                        checked={fulfilled}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setFulfilled(e.target.checked)}	
                    />
                    <label htmlFor="fulfilled_create">Fulfilled</label>
                </div>
                <div className="TaskCreator__btn" onClick={beforeSave}>Save</div>
            </div>
        </div>
    );
};

export default TaskCreator;
