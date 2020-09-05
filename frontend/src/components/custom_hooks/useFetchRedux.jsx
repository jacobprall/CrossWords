import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'; 
// import getStore from '../../store/store';
export const useFetchRedux = () => {
    const [action, setAction] = useState(); 
    const [isLoading, setIsLoading] = useState(); 
    const [error, setError] = useState(); 
    const dispatch = useDispatch();

    useEffect(() => {
        let isSubscribed = true; 
        
        const fetchData = async () => {
            setIsLoading(true);
            try {
                await dispatch(action()); 
            } catch (err) {
                setError(error)
            }
            setIsLoading(false); 
        }
        
        if (isSubscribed && action) fetchData(); 
        
        return () => isSubscribed = false; 
    }, [action])

    return [ setAction, isLoading, error ]; 
} 
