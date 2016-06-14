import * as Types from "../types";
import { getState, setState } from "../store";
import lineAngleDegrees from "../util/lineAngleDegrees";

export default function (endpoint: Types.EndpointDefinition, x: number, y: number) {
    const {activeBox} = getState();

    if (activeBox) {
        const centrex = activeBox.x + (activeBox.width / 2);
        const centrey = activeBox.y + (activeBox.height / 2);
        const angle = lineAngleDegrees(centrex, centrey, x, y);

        let side: Types.BoxSide;
        if (angle < 45) {
            side = "top";
        } else if (angle < 135) {
            side = "right";
        } else if (angle < 225) {
            side = "bottom";
        } else if (angle < 315) {
            side = "left";
        } else {
            side = "top";
        }
        endpoint.box = { box: activeBox, side };
    } else {
        endpoint.box = null;
        endpoint.x = x;
        endpoint.y = y;
    }
    setState({});
};