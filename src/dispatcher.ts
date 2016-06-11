class Dispatcher {
    dispatch: (action: string, parameters: any) => void;
}

// export instance
export default (new Dispatcher());
