import classNames from 'classnames';
import React, { FC } from 'react';
import './index.scss';

interface IIcon {
	name: string;
	size: 12 | 20 | 24 | 32 | 40;
	color?: string;
	className?: string;
}

const Icon: FC<IIcon> = ({
    name, size = 24, color, className
}) => {

    const getColor = () => Boolean(color) ? ('_' + color) : '';

    const classes = classNames(
        'Icon',
        `Icon_${size}`,
        `Icon_${name + getColor()}`,
        className
    );
    return (
        <div className={classes} />
    );
};

export default Icon;
