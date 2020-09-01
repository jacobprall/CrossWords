import { useEffect, useState, useRef } from 'react';

function useStick() {
    const [stick, setStick] = useState(false)
    const ele = useRef(null)

    const handleScroll = () => {
        if (window.scrollY > ele.current.getBoundingClientRect().bottom) {
            setStick(true);
        } else {
            setStick(false);
        }
    }
    const debounce = (fun, wait = 25, immediate = false) => {
        let timer;

        return () => {
            let context = this;
            let args = arguments;

            const postpone = () => {
                timer = null;
                if (!immediate) fun.apply(context, args);
            }

            const callNow = immediate && !timer;
            clearTimeout(timer);
            timer = setTimeout(postpone, wait);
            if (callNow) fun.apply(context, args);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", debounce(handleScroll));
        return () => {
            window.removeEventListener("scroll", () => handleScroll);
        }
    })

    return { stick, ele };
}

export default useStick;
//Analysis of how debouncing works:

//This incredibly interesting function works like this: 
//Suppose immediate is false: 
//In this case we can ignore callNow because it will always be false 
//A timer is set for the time specified by "wait"
//When this timer expires, "later" will execute, and our handleScroll will trigger.

//Suppose immediate is true: 
//In this case, we can ignore the condition inside later,
//since it will never be satisfied. 
//callNow will be true if and only if the user stops scrolling 
//for the time specified by "wait"
//Once the timer expires, timeOut will be set to null by "later".
//On the next scroll, !timeOut will be true in callNow = immediate && !timeout;
//Therefore, callNow will be true, and the function will be executed. 
//Not that in this scenario, it's almost like the function is being queud to trigger 
//the next time you trigger a debounce.

//I set immediate to false because I want the navbar to immediately adjust itself to position:fixed
//after the elapsed "wait" time. 

//fun fact: there's a useDebounce hook