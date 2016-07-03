import * as React from "react";
import { touchHandler } from "../Types";
import { setState } from "../store";

export default function setTouchMove(func: touchHandler, endFunc?: touchHandler) {
    const endFunc2: touchHandler = (ev: React.TouchEvent) => {
        if (endFunc) { endFunc(ev); }
        setState({ onTouchMove: null, onTouchEnd: null });
        return;
    };
    setState({ onTouchMove: func, onTouchEnd: endFunc2 });
}