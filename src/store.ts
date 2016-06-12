import * as Types from "./types";

export let getState = (): Types.State => {
    console.warn("getState not initialised.");
    return {};
};

export let setState = (state: Types.State): void => {
    console.warn("setState not initialised.");
};

export let initialiseStore = (newGetState: () => Types.State, newSetState: (state: Types.State) => void) => {
    getState = newGetState;
    setState = newSetState;
};