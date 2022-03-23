export const getState = (key: string) => {
    try {
        const serializedState = localStorage.getItem(key);

        if (serializedState === null) {
            return undefined;
        }

        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
};

export const saveState = (key: string, state: any) => {
    try {
        const serializedState = JSON.stringify(state);

        localStorage.setItem(key, serializedState);
    } catch (e) {
        console.log(e);
    }
};

export const clearState = (key: string) => {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.log(e);
    }
};
