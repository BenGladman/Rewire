import * as React from "react";
import { setState } from "../store";

export default function setMouseMove(moveFunc: React.MouseEventHandler, upFunc?: React.MouseEventHandler) {
    const upFunc2: React.MouseEventHandler = (ev) => {
        if (upFunc) { upFunc(ev); }
        setState({ onMouseMove: null, onMouseUp: null });
        return;
    };

    const moveFunc2: React.MouseEventHandler = (ev) => {
        if (!(ev.buttons & 1)) {
            // left button released
            upFunc2(ev);
            return;
        }
        moveFunc(ev);
    };

    setState({ onMouseMove: moveFunc2, onMouseUp: upFunc2 });
}