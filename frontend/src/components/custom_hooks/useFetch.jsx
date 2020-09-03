import { useEffect } from 'react';
import { useDispatch } from 'react-redux'; 

export const useFetch = () => {
    const [action, setAction] = useState(null); 
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState(null); 
    const dispatch = useDispatch(); 

    useEffect(() => {
        let isSubscribed = true; 
        
        const fetchData = async () => {
            setIsLoading(true);
            try {
                await dispatch(action); 
            } catch (err) {
                setError(error)
            }
            setIsLoading(false); 
        }
        
        fetchData(); 
        
        return () => isSubscribed = false; 
    }, [action])

    return { setAction, isLoading, error }; 
}

