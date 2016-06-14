import * as React from "react";
import * as Types from "../types";
import Bezier from "./Bezier";
import Endpoint from "./Endpoint";
import Straight from "./Straight";
import addLine from "../actions/addLine";
import moveEndpoint from "../actions/moveEndpoint";
import setMouseMove from "../actions/setMouseMove";
import lineAngleDegrees from "../util/lineAngleDegrees";

interface LineContainerProps {
    lines: Set<Types.LineDefinition>;
}

export default function LineContainer({lines}: LineContainerProps) {
    const onMouseDown = (ev: React.MouseEvent) => {
        const target = ev.currentTarget;
        if (target instanceof SVGSVGElement) {
            const bounds = target.getBoundingClientRect();
            const x1 = ev.pageX - bounds.left;
            const y1 = ev.pageY - bounds.top;

            let addedLine: Types.LineDefinition = null;

            const onMouseMove = (ev: React.MouseEvent) => {
                const x2 = ev.pageX - bounds.left;
                const y2 = ev.pageY - bounds.top;

                if (addedLine === null) {
                    const distTrigger = 20;
                    if (Math.abs(x2 - x1) > distTrigger || Math.abs(y2 - y1) > distTrigger) {
                        addedLine = addLine(x1, y1, x2, y2);
                    }
                } else {
                    moveEndpoint(addedLine.endpoint2, x2, y2);
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

        const lineprops = {
            key: line.key,
            x1: line.endpoint1.x,
            y1: line.endpoint1.y,
            x2: line.endpoint2.x,
            y2: line.endpoint2.y
        };

        if (line.endpoint1.angle === undefined) {
            angle1 = lineAngleDegrees(line.endpoint2.x, line.endpoint2.y, line.endpoint1.x, line.endpoint1.y);
            angle2 = angle1 + 180;
            lineEls.push(<Straight {...lineprops} />);
        } else {
            angle1 = line.endpoint1.angle;
            angle2 = line.endpoint2.angle === undefined ? angle1 : line.endpoint2.angle;
            lineEls.push(<Bezier {...lineprops} angle1={angle1} angle2={angle2} />);
        }

        if (line.endpoint1.endpointType) {
            endpointEls.push(<Endpoint key={line.endpoint1.key} endpoint={line.endpoint1} angle={angle1} />);
        }
        if (line.endpoint2.endpointType) {
            endpointEls.push(<Endpoint key={line.endpoint2.key} endpoint={line.endpoint2} angle={angle2} />);
        }
    });


    return (
        <svg className="pb-linecontainer"
            onMouseDown={onMouseDown}>
            {lineEls}
            {endpointEls}
        </svg>
    );
};