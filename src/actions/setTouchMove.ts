import * as React from "react";
import { setState } from "../store";

export default function setTouchMove(func: React.TouchEventHandler, endFunc?: React.TouchEventHandler) {
    const endFunc2: React.TouchEventHandler = (ev: React.TouchEvent) => {
        if (endFunc) { endFunc(ev); }
        setState({ onTouchMove: null, onTouchEnd: null });
        return;
    };
    setState({ onTouchMove: func, onTouchEnd: endFunc2 });
}