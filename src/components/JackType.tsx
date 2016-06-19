import * as React from "react";
import * as Types from "../types";

export const circleJackType = ({x, y, size, className, onMouseDown}: Types.JackTypeProps) => {
    return (<circle className={className}
        onMouseDown={onMouseDown}
        cx={x} cy={y} r={size} />);
};

export const squareJackType = ({x, y, size, className, onMouseDown}: Types.JackTypeProps) => {
    return (<rect className={className}
        onMouseDown={onMouseDown}
        x={x - size} y={y - size}
        width={size * 2} height={size * 2} />);
};

export const arrowJackType = ({x, y, angle, size, className, onMouseDown}: Types.JackTypeProps) => {
    const points = `${x},${y - size} ${x + size},${y + size} ${x - size},${y + size}`;
    const transform = Math.abs(angle) < 1 ? null : `rotate (${angle} ${x} ${y})`;
    return (<polygon className={className}
        onMouseDown={onMouseDown}
        points={points} transform={transform} />);
};
