import * as React from "react";
import { JackTypeProps } from "../types";

export const circleJackType = ({x, y, size, cprops}: JackTypeProps) => {
    return (<circle {...cprops}
        cx={x} cy={y} r={size} />);
};

export const squareJackType = ({x, y, size, cprops}: JackTypeProps) => {
    return (<rect {...cprops}
        x={x - size} y={y - size}
        width={size * 2} height={size * 2} />);
};

export const arrowJackType = ({x, y, angle, size, cprops}: JackTypeProps) => {
    const points = `${x},${y - size} ${x + size},${y + size} ${x - size},${y + size}`;
    const transform = Math.abs(angle) < 1 ? null : `rotate (${angle} ${x} ${y})`;
    return (<polygon {...cprops}
        points={points} transform={transform} />);
};
