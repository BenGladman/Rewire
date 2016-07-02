import * as React from "react";
import { setState } from "../store";

export default function setTouchMove(func: (ev: React.TouchEvent) => void) {
    const endFunc = (ev: React.TouchEvent) => {
        setState({ onTouchMove: null, onTouchEnd: null });
        return;
    };
    setState({ onTouchMove: func, onTouchEnd: endFunc });
}