import useTheme from "./ThemeContext.ts";
import React from "react";

export default function ThemeToggle() {

    const {themeMode, darkTheme, lightTheme} = useTheme();

    const handleOnChange = (e) => {
        const theme_mode_status = e.currentTarget.checked;

        if (theme_mode_status) {
            darkTheme();
        } else {
            lightTheme();
        }
    }

    return (
        <div className="checkbox-wrapper-6">
            <input
                role="themeToggle"
                className="tgl tgl-light" id="cb1-6" type="checkbox"
                onChange={handleOnChange}
                checked={themeMode === "dark"}
            />
            <label className="tgl-btn" htmlFor="cb1-6"/>
        </div>
    )
}