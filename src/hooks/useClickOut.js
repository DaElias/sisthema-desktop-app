import { useEffect, useRef, useState } from "react"

export default function useClickOut() {
    const ref = useRef()
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (isOpen && ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", checkIfClickedOutside);
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [isOpen]);
    return [ref, isOpen, setIsOpen]
}

