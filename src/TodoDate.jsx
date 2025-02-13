import { useState, useEffect } from "react";

export const TodoDate = () => {
    const [dateTime, setDateTime] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const formattedDate = now.toLocaleDateString();
            const formattedTime = now.toLocaleTimeString();
            setDateTime(`${formattedDate} - ${formattedTime}`);
        }, 1000);

        return () => clearInterval(interval); // Cleanup to prevent memory leaks
    }, []); // Runs only once on mount

    return <h2 className="date-time">{dateTime}</h2>;
};