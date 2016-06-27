import * as React from "react";
import * as Types from "../../types";
import Wire from "../Wire";
import Jack from "../Jack";
import Socket from "../Socket";
import addWire from "../../actions/addWire";
import moveJack from "../../actions/moveJack";
import setMouseMove from "../../actions/setMouseMove";
import "./index.css";

interface WireContainerProps {
    wires: Set<Types.WireDefinition>;
    boxes: Set<Types.BoxDefinition>;
    animatingJack: Types.JackDefinition;
}

export default function WireContainer({ wires, boxes, animatingJack }: WireContainerProps) {
    const onMouseDown = (ev: React.MouseEvent) => {
        const target = ev.currentTarget;
        if (target instanceof SVGSVGElement) {
            const bounds = target.getBoundingClientRect();
            const x1 = ev.pageX - bounds.left;
            const y1 = ev.pageY - bounds.top;

            let addedWire: Types.WireDefinition = null;

            const onMouseMove = (ev: React.MouseEvent) => {
                const x2 = ev.pageX - bounds.left;
                const y2 = ev.pageY - bounds.top;

                if (addedWire === null) {
                    const distTrigger = 20;
                    if (Math.abs(x2 - x1) > distTrigger || Math.abs(y2 - y1) > distTrigger) {
                        addedWire = addWire(x1, y1, x2, y2);
                    }
                } else {
                    moveJack(addedWire.jack2, x2, y2);
                }
            };

            setMouseMove(onMouseMove);
        }

        // prevent text selection
        ev.preventDefault();
    };

    const els: JSX.Element[] = [];

    wires.forEach((wire) => {
        els.push(<Wire key={wire.key} wire={wire} animatingJack={animatingJack} />);
    });

    boxes.forEach((box) => {
        box.sockets.forEach((socket) => {
            els.push(<Socket key={socket.key} socket={socket} />);
        });
    });

    wires.forEach((wire) => {
        els.push(<Jack key={wire.jack1.key} jack={wire.jack1} isAnimating={wire.jack1 === animatingJack} />);
        els.push(<Jack key={wire.jack2.key} jack={wire.jack2} isAnimating={wire.jack2 === animatingJack} />);
    });

    return (
        <svg className="rw-WireContainer"
            onMouseDown={onMouseDown}>
            {els}
        </svg>
    );
};