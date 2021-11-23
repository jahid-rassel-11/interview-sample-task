import { useState, useEffect } from 'react'

export const useFetchDataHook = (API_URL) => {
    var [isPending, setIsPending] = useState(true);         //  For Showing Loading Screen
    var [errorMessage, setErrorMessage] = useState(true);         //  For Showing Error Text
    
    //  Data From JSON feed [ Start ]    
    const [returnData, setReturnData] = useState(null);

    //  AbortController INTERFACE REPRESENTS A CONTROLLER OBJECT THAT ALLOWS TO ABORAT ONE OF MORE WEB REQUESTS
    //  https://developer.mozilla.org/en-US/docs/Web/API/AbortController
    const abrotCont = new AbortController();

    //  '[]' is used as we want to use this just 1 time at the first time rendering
    //  To understand the reason for using 'AbortController' and 'single' see this video
    //  https://www.youtube.com/watch?v=aKOQtGLT-Yk&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=24
    useEffect(()=>{
        
        fetch( API_URL, { signal: abrotCont.signal } )
            .then( (response) => {
                //  Check if there is a response
                if( response.ok === true ) {
                    //  Converting and returning the Response to a JS object to work with that later on
                    return response.json()
                }
                else {
                    //  WAY 2
                    throw Error('Something want wrong, Could Not Fetch DATA.');
                }    
            }).then( (data) => {
                //  Receiving the JS Object which is in JSON format now to work with it on this block
                setReturnData(data);
                setErrorMessage(null);
                setIsPending(false);
            }).catch( (errorObj) => {
                if( errorObj.name === 'AbortError' ) {
                    console.log('AbortController Signal AbortError');
                }
                else {
                    setErrorMessage(errorObj.message);
                    setIsPending(false);
                }
            });
        
        return () => {
            //console.log("cleanup");
            abrotCont.abort();
        }
        
    }, [API_URL]);
    //  New Version Getting Data From JSON feed [ End ]
    

    return { isPending, errorMessage, returnData }
}
 
export default useFetchDataHook;