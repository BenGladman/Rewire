import * as React from "react";
import { setState } from "../store";

export default function setMouseMove(func: (ev: React.MouseEvent) => void) {
    const mouseMoveFunc = (ev: React.MouseEvent) => {
        if (!(ev.buttons & 1)) {
            // left button released
            setState({ onMouseMove: null });
            return;
        }
        func(ev);
    };
    setState({ onMouseMove: mouseMoveFunc });
}