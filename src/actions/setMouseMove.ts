import { mouseHandler } from "../Types";
import { setState } from "../store";

export default function setMouseMove(moveFunc: mouseHandler, upFunc?: mouseHandler) {
    const upFunc2: mouseHandler = (ev) => {
        if (upFunc) { upFunc(ev); }
        setState({ onMouseMove: null, onMouseUp: null });
        return;
    };

    const moveFunc2: mouseHandler = (ev) => {
        if (!(ev.buttons & 1)) {
            // left button released
            upFunc2(ev);
            return;
        }
        moveFunc(ev);
    };

    setState({ onMouseMove: moveFunc2, onMouseUp: upFunc2 });
}