import * as React from "react";
import { Motion, spring } from "react-motion";
import * as Types from "../../types";
import moveJack from "../../actions/moveJack";
import setMouseMove from "../../actions/setMouseMove";
import "./index.css";

interface JackProps {
    jack: Types.JackDefinition;
    isAnimating: boolean;
}

export default function Jack({ jack, isAnimating }: JackProps) {
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

    const afunc = ({ x = 0, y = 0, angle = 0 }) => (jack.type({
        x, y, angle, size: 6,
        cprops: {
            className: "rw-Jack" + (jack.socket ? " is-connected" : ""),
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