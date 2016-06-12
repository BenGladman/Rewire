import * as React from "react";
import * as Types from "../types";
import moveEndpoint from "../actions/moveEndpoint";
import setMouseMove from "../actions/setMouseMove";

interface EndpointProps {
    endpoint: Types.EndpointDefinition;
    angle: number;
}

export default function Endpoint({endpoint, angle}: EndpointProps) {
    const onMouseDown = (ev: React.MouseEvent) => {
        const offsetX = x - ev.pageX;
        const offsetY = y - ev.pageY;

        const onMouseMove = (ev: React.MouseEvent) => {
            moveEndpoint(endpoint, ev.pageX + offsetX, ev.pageY + offsetY);
        };

        setMouseMove(onMouseMove);

        // don't trigger on container
        ev.stopPropagation();

        // prevent text selection
        ev.preventDefault();
    };

    const endpointProps = {
        className: "pb-endpoint",
        onMouseDown
    };

    const x = endpoint.x;
    const y = endpoint.y;
    const size = endpoint.size || 6;

    switch (endpoint.endpointType) {
        case "circle":
            return (<circle {...endpointProps} cx={x} cy={y} r={size} />);
        case "square":
            return (<rect {...endpointProps} x={x - size} y={y - size} width={size * 2} height={size * 2} />);
        case "arrow":
            const points = `${x - size},${y} ${x + size},${y + size} ${x + size},${y - size}`;
            const transform = Math.abs(angle) < 1 ? null : `rotate (${angle} ${x} ${y})`;
            return (<polygon {...endpointProps} points={points} transform={transform} />);
        default:
            return null;
    }
};