import * as React from "react";
import { Motion, spring } from "react-motion";
import { WireDefinition, JackDefinition } from "../../types";
import moveJack from "../../actions/moveJack";
import setMouseMove from "../../actions/setMouseMove";
import setActiveWire from "../../actions/setActiveWire";
import setActiveJack from "../../actions/setActiveJack";
import "./index.css";

interface JackProps {
    key: string;
    jack: JackDefinition;
    wire: WireDefinition;
    isActive: boolean;
    isAnimating: boolean;
}

export default function Jack({ jack, wire, isActive, isAnimating }: JackProps) {
    const onMouseEnter = (ev: React.MouseEvent) => {
        setActiveJack(jack);
        setActiveWire(wire);
    };

    const onMouseLeave = (ev: React.MouseEvent) => {
        setActiveJack(null);
        setActiveWire(null);
    };

    const onMouseDown = (ev: React.MouseEvent) => {
        const offsetX = jack.x - ev.pageX;
        const offsetY = jack.y - ev.pageY;

        const onMouseMove = (ev: React.MouseEvent) => {
            moveJack(jack, ev.pageX + offsetX, ev.pageY + offsetY);
        };

        setMouseMove(onMouseMove);

        // don't trigger on container
        ev.stopPropagation();

        // prevent text selection
        ev.preventDefault();
    };

    const className = "rw-Jack"
        + (isActive ? " is-active" : "")
        + (jack.socket ? " is-connected" : "");

    const afunc = ({ x = 0, y = 0, angle = 0 }) => (jack.type({
        x, y, angle, size: 6,
        cprops: {
            className,
            onMouseEnter,
            onMouseLeave,
            onMouseDown
        }
    }));

    if (isAnimating) {
        const springConfig = { stiffness: 300, damping: 50 };
        const style = {
            x: spring(jack.x, springConfig),
            y: spring(jack.y, springConfig),
            angle: spring(jack.angle || 0, springConfig)
        };

        return (
            <Motion style={style}>
                {afunc}
            </Motion>
        );
    } else {
        return afunc(jack);
    }
};