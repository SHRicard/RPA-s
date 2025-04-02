import { useMediaQuery } from "react-responsive";

export const useMobile = (): boolean => {
    const isMobile = useMediaQuery({ query: "(max-width: 992px)" });
    return isMobile;
};
