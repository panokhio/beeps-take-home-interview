import './App.css';
import Header from './components/Header';
import Body from './components/Body';

import {useState, useEffect} from 'react';

const App = () => {

    // state variable declarations
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    const [websocket, setWebsocket] = useState();
    const [startWS, setStartWS] = useState(false);

    // start feed button onclick function
    const handleStart = () => {
        setStartWS((prevStartWS) => !prevStartWS);
        setData([]);
        setLoading(true);
        setStartTime(new Date());
        setEndTime(new Date());
    }

    // end feed button onclick function
    const handleClose = () => {
        websocket.close();
        setWebsocket(undefined);
    }

    // useEffect hook for the websocket connection
    useEffect(() => {
        const ws = new WebSocket("ws://beeps.gg/stream");
        setWebsocket(ws);

        ws.onopen = () => {
            console.log("Connection Established!");
        };
        ws.onmessage = (event) => {
            const response = JSON.parse(event.data);
            
            if(data.length === 0){
                setData((prevData) => [...prevData, response]);
            } else {
                setInterval(() => {
                    setData((prevData) => [...prevData, response]);
                }, 1000000000);
            }
            setLoading(false);
            setEndTime(new Date());
        };
        ws.onclose = () => {
            console.log("Connection Closed!");
        };
        ws.onerror = () => {
            console.log("WS Error");
        };

        return () => {
          ws.close();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startWS]);

    //main app return
    return (
        <div className="app-container">
            <Header/>
            <Body data={data} loading={loading} start={startTime} end={endTime} handleStart={handleStart} handleClose={handleClose} websocket={websocket}/>
        </div>
    );
}

export default App;
