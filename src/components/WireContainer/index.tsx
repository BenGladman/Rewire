import * as React from "react";
import { BoxDefinition, WireDefinition, JackDefinition } from "../../types";
import Wire from "../Wire";
import Jack from "../Jack";
import Socket from "../Socket";
import addWire from "../../actions/addWire";
import moveJack from "../../actions/moveJack";
import setMouseMove from "../../actions/setMouseMove";
import "./index.css";

interface WireContainerProps {
    wires: Set<WireDefinition>;
    boxes: Set<BoxDefinition>;
    activeWire: WireDefinition;
    activeJack: JackDefinition;
    animatingJack: JackDefinition;
}

export default function WireContainer({ wires, boxes, activeWire, activeJack, animatingJack }: WireContainerProps) {
    const onMouseDown = (ev: React.MouseEvent) => {
        const target = ev.currentTarget;
        if (target instanceof SVGSVGElement) {
            const bounds = target.getBoundingClientRect();
            const x1 = ev.pageX - bounds.left;
            const y1 = ev.pageY - bounds.top;

            let addedWire: WireDefinition = null;

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
        els.push(<Wire key={wire.key} wire={wire} isActive={wire === activeWire} animatingJack={animatingJack} />);
    });

    boxes.forEach((box) => {
        box.sockets.forEach((socket) => {
            els.push(<Socket key={socket.key} socket={socket} />);
        });
    });

    wires.forEach((wire) => {
        els.push(<Jack key={wire.jack1.key} jack={wire.jack1} wire={wire}
            isActive={wire.jack1 === activeJack} isAnimating={wire.jack1 === animatingJack} />);
        els.push(<Jack key={wire.jack2.key} jack={wire.jack2} wire={wire}
            isActive={wire.jack2 === activeJack} isAnimating={wire.jack2 === animatingJack} />);
    });

    return (
        <svg className="rw-WireContainer"
            onMouseDown={onMouseDown}>
            {els}
        </svg>
    );
};