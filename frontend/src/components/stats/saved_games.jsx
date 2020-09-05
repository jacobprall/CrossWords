import React from 'react'; 
import { SavedGame } from './saved_game'; 
import { useFetchRedux } from '../custom_hooks/useFetchRedux'; 

export const SavedGames = () => {
    const [ setAction, isLoading, error ] = useFetchRedux(); 
    //setAction(fetchSavedGames())
    //fetch saved games by doing setAction(whatever action that needs to be dispatched to fetch the data)
    //useFetchRedux is already set up to use the useDispatch hook to dispatch the action that you set.
    //isLoading tells you if useFetch is still doing its thing
    //error tells you if it returned an error while fetching
    //Loop through them, 
    //Display each as SavedGame
    return (
        <div>

        </div>
    )
}