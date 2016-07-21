import * as React from "react";

interface Props {
    key: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

type Component = React.StatelessComponent<Props>;

const component: Component = ({ x1, y1, x2, y2 }) => {
    return (
        <line className="rw-Wire"
            x1={x1} y1={y1}
            x2={x2} y2={y2} />
    );
};

component.displayName = "Straight";
export default component;