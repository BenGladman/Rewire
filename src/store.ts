export let getState = (): any => {
    console.warn("getState not initialised.");
    return {};
};

export let setState = (state: any): void => {
    console.warn("setState not initialised.");
};

export let initialiseStore = (newGetState: () => any, newSetState: (state: any) => void) => {
    getState = newGetState;
    setState = newSetState;
};