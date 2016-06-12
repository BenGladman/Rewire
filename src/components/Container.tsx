import * as React from "react";
import * as Types from "../types";
import Bezier from "./Bezier";
import Endpoint from "./Endpoint";
import Straight from "./Straight";
import addLine from "../actions/addLine";
import moveEndpoint from "../actions/moveEndpoint";
import setMouseMove from "../actions/setMouseMove";

const rad2deg = 180 / Math.PI;

interface ContainerProps {
    lines: Types.LineDefinition[];
}

export default function Container({lines}: ContainerProps) {
    const onMouseDown = (ev: React.MouseEvent) => {
        const target = ev.currentTarget;
        if (target instanceof SVGSVGElement) {
            const bounds = target.getBoundingClientRect();
            const x1 = ev.pageX - bounds.left;
            const y1 = ev.pageY - bounds.top;

            let starting = true;
            const onMouseMove = (ev: React.MouseEvent) => {
                const x2 = ev.pageX - bounds.left;
                const y2 = ev.pageY - bounds.top;

                if (starting) {
                    const distTrigger = 20;
                    if (Math.abs(x2 - x1) > distTrigger || Math.abs(y2 - y1) > distTrigger) {
                        addLine(x1, y1, x2, y2);
                        starting = false;
                    }
                } else {
                    moveEndpoint(true, 0, { x2, y2 });
                }
            };

            setMouseMove(onMouseMove);
        }

        // prevent text selection
        ev.preventDefault();
    };

    const lineEls: JSX.Element[] = [];
    const endpointEls: JSX.Element[] = [];

    lines.forEach((line, ix) => {
        let angle1: number;
        let angle2: number;

        const lineprops = { lineId: ix, key: ix, x1: line.x1, y1: line.y1, x2: line.x2, y2: line.y2 };
        if (line.angle1 === undefined) {
            angle1 = Math.atan2(line.y2 - line.y1, line.x2 - line.x1) * rad2deg;
            angle2 = angle1 + 180;
            lineEls.push(<Straight {...lineprops} />);
        } else {
            angle1 = line.angle1;
            angle2 = line.angle2 === undefined ? angle1 : line.angle2;
            lineEls.push(<Bezier {...lineprops} angle1={angle1} angle2={angle2} />);
        }

        if (line.endpointType1) {
            const endpoint1props = { lineId: ix, key: ix + "e1", type: line.endpointType1, x: line.x1, y: line.y1, angle: angle1 };
            endpointEls.push(<Endpoint {...endpoint1props} lineEnd={1} />);
        }
        if (line.endpointType2) {
            const endpoint2props = { lineId: ix, key: ix + "e2", type: line.endpointType2, x: line.x2, y: line.y2, angle: angle2 };
            endpointEls.push(<Endpoint {...endpoint2props} lineEnd={2} />);
        }
    });


    return (
        <svg className="pb-svg"
            onMouseDown={onMouseDown}>
            {lineEls}
            {endpointEls}
        </svg>
    );
};