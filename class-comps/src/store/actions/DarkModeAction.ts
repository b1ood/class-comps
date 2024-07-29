import { DARK_MODE } from "../../types/types";

export const handleDarkMode = (e) => {
    localStorage.setItem('darkMode', e);

    return {
        type: DARK_MODE,
        payload: e,
    };
};