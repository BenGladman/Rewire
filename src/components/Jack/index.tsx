import * as React from "react";
import { Motion, spring } from "react-motion";
import { BoxDefinition, WireDefinition, JackDefinition } from "../../types";
import moveJack from "../../actions/moveJack";
import setMouseMove from "../../actions/setMouseMove";
import setActiveWire from "../../actions/setActiveWire";
import setActiveJack from "../../actions/setActiveJack";
import setMovingItem from "../../actions/setMovingItem";
import "./index.css";

interface JackProps {
    key: string;
    jack: JackDefinition;
    wire: WireDefinition;
    isActive: boolean;
    movingItem: BoxDefinition | JackDefinition;
}

export default function Jack({ jack, wire, isActive, movingItem }: JackProps) {
    const onMouseEnter: React.MouseEventHandler = (ev) => {
        if (!movingItem) {
            setActiveJack(jack);
            setActiveWire(wire);
        }
    };

    const onMouseLeave: React.MouseEventHandler = (ev) => {
        if (!movingItem) {
            setActiveJack(null);
            setActiveWire(null);
        }
    };

    const onMouseDown: React.MouseEventHandler = (ev) => {
        const offsetX = jack.x - ev.pageX;
        const offsetY = jack.y - ev.pageY;

        const onMouseMove: React.MouseEventHandler = (ev) => {
            moveJack(jack, ev.pageX + offsetX, ev.pageY + offsetY);
        };

        const onMouseUp: React.MouseEventHandler = (ev) => {
            setMovingItem(null, null, null);
        };

        setMovingItem(null, wire, jack);
        setMouseMove(onMouseMove, onMouseUp);

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

    if (jack === movingItem) {
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