import { DARK_MODE } from "../../types/types.ts";

const defaultState = {
    isDarkMode: !!JSON.parse(localStorage.getItem('darkMode')),
}

export const darkModeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'DARK_MODE':
            return { ...state, isDarkMode: action.payload };

        default:
            return state;
    }
}