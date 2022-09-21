import React, { useState } from 'react';
import './App.scss';
import { Filter, Searchbar, Task, TaskCreator } from './components';

const STORAGE_KEY = 'tasks';
export interface ITask {
	title: string;
	description: string;
	fulfilled: boolean;
}

const localTasks: ITask[] = [
    {
        title: 'To do something',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi in, culpa debitis a numquam porro incidunt explicabo quidem.',
        fulfilled: false
    },
    {
        title: 'Check for project',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi in, culpa debitis a numquam porro incidunt explicabo quidem.',
        fulfilled: false
    },
    {
        title: 'Update OS',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi in, culpa debitis a numquam porro incidunt explicabo quidem.',
        fulfilled: false
    }
];

const dataFromStorage = localStorage.getItem(STORAGE_KEY);
const storageTasks: ITask[] = Boolean(dataFromStorage) ? JSON.parse(dataFromStorage as string).tasks : null;

const defaultTasks = storageTasks != null ? storageTasks : localTasks;

interface ISettings {
	task?: ITask;
	idx?: number;
	showCreator: boolean;
}

const filterTags = ['fulfilled', 'unfulfilled'];
const defaultTagSelected = filterTags.reduce<Record<string, boolean>>((acc, item) => {
    acc[item] = false;
    return acc;
}, {});

function App() {
    const [tasks, setTasks] = useState(defaultTasks);
    const [creatorSettings, setCreatorSettings] = useState<ISettings>({ showCreator: false });
    const [filter, setFilter] = useState<Record<string, boolean>>(defaultTagSelected);
    const [searchPattern, setSearchpattern] = useState('');

    const onFilterChange = (selected: Record<string, boolean>) => {
        setFilter({ ...selected });
    };

    const onSearch = (newPattern: string) => {
        setSearchpattern(newPattern);
    };

    const setStorage = (tasks: ITask[]) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ tasks }));
    };

    const onChange = (idx: number, fulfilled: boolean) => {
        tasks[idx].fulfilled = fulfilled;
        setTasks([ ...tasks ]);
        setStorage(tasks);
    };

    const onSave = (task: ITask, idx: number) => {
        if (idx !== undefined) {
            tasks[idx] = task;
        } else {
            tasks.push(task);
        }
        creatorSettings.showCreator = false;
        setTasks([ ...tasks ]);
        setCreatorSettings(creatorSettings);
        setStorage(tasks);
    };

    const onEdit = (idx: number) => {
        creatorSettings.idx = idx;
        creatorSettings.task = tasks[idx];
        creatorSettings.showCreator = true;
        setCreatorSettings({ ...creatorSettings });
        setStorage(tasks);
    };

    const onRemove = (idx: number) => {
        tasks.splice(idx, 1);
        setTasks([ ...tasks ]);
        setStorage(tasks);
    };

    const onCreateTask = () => {
        creatorSettings.showCreator = true;
        setCreatorSettings({ ...creatorSettings });
    };

    const onClearAll = () => {
        setTasks([]);
        localStorage.setItem(STORAGE_KEY, '');
    };
	
    const onDismiss = () => {
        creatorSettings.showCreator = false;
        setCreatorSettings({ ...creatorSettings });
    };

    const filterData = (fulfilled: boolean, tasks: ITask[]) => {
        return tasks.filter(item => item.fulfilled === fulfilled);
    };

    const { task, idx, showCreator } = creatorSettings;

    let filteredTaks = searchPattern !== '' ? tasks.filter(item => item.title.toLowerCase().indexOf(searchPattern.toLowerCase()) !== -1) : tasks;
    const { fulfilled, unfulfilled } = filter;
    if (Boolean(fulfilled) !== Boolean(unfulfilled)) {
        filteredTaks = filterData(fulfilled ? true : false, filteredTaks);
    }

    return (
        <div className="App">
            { showCreator && <TaskCreator task={task} idx={idx} onSave={onSave} onDismiss={onDismiss} /> }
            <div className="container">
                <h2>Todo List</h2>
                <div className="App__content">
                    <Searchbar pattern={searchPattern} onChange={onSearch} />
                    <Filter tags={filterTags} selected={filter} onChange={onFilterChange} />

                    <div className="App__task-container">
                        { filteredTaks.map((item, index) => (
                            <Task
                                onChange={onChange}
                                onRemove={onRemove}
                                onEdit={onEdit}
                                key={item.title}
                                index={index}
                                { ...item } />
                        ))}
                        <div className="App__add-btn" onClick={onCreateTask}>Add Task</div>
                        <div className="App__clear-btn" onClick={onClearAll}>Clear All</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
