import { useState, useEffect } from "react";

export default function useDarkMode() {
    const [enabled, setEnabled] = useState(() => {
        if (typeof window !== "undefined") {
            return (
                localStorage.getItem("theme") === "dark" ||
                window.matchMedia("(prefers-color-scheme: dark)").matches
            );
        }
        return false;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (enabled) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [enabled]);

    return [enabled, setEnabled];
}
