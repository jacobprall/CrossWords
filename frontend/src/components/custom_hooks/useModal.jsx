import { useState } from 'react'; 

export const useModal = () => {
    const [isShowing, setIsShowing] = useState(false); 
    const toggle = (bool) => setIsShowing(bool); 

    return {
        isShowing, 
        toggle
    }
};
