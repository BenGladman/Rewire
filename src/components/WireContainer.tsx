import * as React from "react";
import * as Types from "../types";
import Bezier from "./Bezier";
import Jack from "./Jack";
import Straight from "./Straight";
import addWire from "../actions/addWire";
import moveJack from "../actions/moveJack";
import setMouseMove from "../actions/setMouseMove";
import lineAngleDegrees from "../util/lineAngleDegrees";

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
        let angle1: number;
        let angle2: number;

        const wireprops = {
            key: wire.key,
            x1: wire.jack1.x,
            y1: wire.jack1.y,
            x2: wire.jack2.x,
            y2: wire.jack2.y
        };

        if (wire.jack1.angle === undefined) {
            angle1 = lineAngleDegrees(wire.jack2.x, wire.jack2.y, wire.jack1.x, wire.jack1.y);
            angle2 = angle1 + 180;
            wireEls.push(<Straight {...wireprops} />);
        } else {
            angle1 = wire.jack1.angle;
            angle2 = wire.jack2.angle === undefined ? angle1 : wire.jack2.angle;
            wireEls.push(<Bezier {...wireprops} angle1={angle1} angle2={angle2} />);
        }

        if (wire.jack1.type) {
            jackEls.push(<Jack key={wire.jack1.key} jack={wire.jack1} angle={angle1} />);
        }
        if (wire.jack2.type) {
            jackEls.push(<Jack key={wire.jack2.key} jack={wire.jack2} angle={angle2} />);
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