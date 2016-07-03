import * as React from "react";
import { BoxDefinition, WireDefinition, JackDefinition, mouseHandler } from "../../types";
import Wire from "../Wire";
import Jack from "../Jack";
import Socket from "../Socket";
import addWire from "../../actions/addWire";
import moveJack from "../../actions/moveJack";
import setMouseMove from "../../actions/setMouseMove";
import setMovingItem from "../../actions/setMovingItem";
import "./index.css";

interface WireContainerProps {
    wires: Set<WireDefinition>;
    boxes: Set<BoxDefinition>;
    activeWire: WireDefinition;
    activeJack: JackDefinition;
    movingItem: BoxDefinition | JackDefinition;
}

export default function WireContainer({ wires, boxes, activeWire, activeJack, movingItem }: WireContainerProps) {
    const onMouseDown = (ev: React.MouseEvent) => {
        const target = ev.currentTarget;
        if (target instanceof SVGSVGElement) {
            const bounds = target.getBoundingClientRect();
            const x1 = ev.pageX - bounds.left;
            const y1 = ev.pageY - bounds.top;

            let addedWire: WireDefinition = null;

            const onMouseMove: mouseHandler = (ev) => {
                const x2 = ev.pageX - bounds.left;
                const y2 = ev.pageY - bounds.top;

                if (addedWire === null) {
                    const distTrigger = 20;
                    if (Math.abs(x2 - x1) > distTrigger || Math.abs(y2 - y1) > distTrigger) {
                        addedWire = addWire(x1, y1, x2, y2);
                        setMovingItem(null, addedWire, addedWire.jack2);
                    }
                } else {
                    moveJack(addedWire.jack2, x2, y2);
                }
            };

            const onMouseUp: mouseHandler = (ev) => {
                setMovingItem(null, null, null);
            };

            setMouseMove(onMouseMove, onMouseUp);
        }

        // prevent text selection
        ev.preventDefault();
    };

    const els: JSX.Element[] = [];

    wires.forEach((wire) => {
        els.push(<Wire key={wire.key} wire={wire} isActive={wire === activeWire} movingItem={movingItem} />);
    });

    boxes.forEach((box) => {
        box.sockets.forEach((socket) => {
            els.push(<Socket key={socket.key} socket={socket} />);
        });
    });

    wires.forEach((wire) => {
        els.push(<Jack key={wire.jack1.key} jack={wire.jack1} wire={wire}
            isActive={wire.jack1 === activeJack} movingItem={movingItem} />);
        els.push(<Jack key={wire.jack2.key} jack={wire.jack2} wire={wire}
            isActive={wire.jack2 === activeJack} movingItem={movingItem} />);
    });

    return (
        <svg className="rw-WireContainer"
            onMouseDown={onMouseDown}>
            {els}
        </svg>
    );
};