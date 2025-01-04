"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollToTop = ({ children }) => {
    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top whenever the route changes
    }, [pathname]);

    return <>{children}</>; // Render the children passed to this component
};

export default ScrollToTop;
