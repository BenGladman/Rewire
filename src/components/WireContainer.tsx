import * as React from "react";
import * as Types from "../types";
import Bezier from "./Bezier";
import Jack from "./Jack";
import addWire from "../actions/addWire";
import moveJack from "../actions/moveJack";
import setMouseMove from "../actions/setMouseMove";

interface WireContainerProps {
    wires: Set<Types.WireDefinition>;
}

export default function WireContainer({wires}: WireContainerProps) {
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

    const wireEls: JSX.Element[] = [];
    const jackEls: JSX.Element[] = [];

    wires.forEach((wire, ix) => {
        const isConnected = !!wire.jack1.box && !!wire.jack2.box;

        wireEls.push(<Bezier key={wire.key} isConnected={isConnected}
            x1={wire.jack1.x} y1={wire.jack1.y} angle1={wire.jack1.angle}
            x2={wire.jack2.x} y2={wire.jack2.y} angle2={wire.jack2.angle} />);

        if (wire.jack1.type) {
            jackEls.push(<Jack key={wire.jack1.key} jack={wire.jack1} />);
        }
        if (wire.jack2.type) {
            jackEls.push(<Jack key={wire.jack2.key} jack={wire.jack2} />);
        }
    });


    return (
        <svg className="rw-wirecontainer"
            onMouseDown={onMouseDown}>
            {wireEls}
            {jackEls}
        </svg>
    );
};