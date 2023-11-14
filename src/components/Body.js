import './Body.css';
import Card from './Card';

const Body = (data, loading, start, end, handleStart, handleClose, websocket) => {

    const minutesElapsed = (data.end - data.start) / 60000;

    return (
        <div className="body-container">
            <div className="left-side">
                <div className="connection-buttons">
                    <div className="connection-button green" onClick={data.handleStart}>
                        Start Feed
                    </div>
                    <div className={!data.websocket ? "connection-button disabled" : "connection-button"} onClick={data.handleClose}>
                        End Feed
                    </div>
                </div>
                <div className="event-analytics">
                    <div className="event-analytic">
                        <div className="event-analytic-title">
                            Total events displayed:&nbsp;
                        </div>
                        <div className="event-analytic-value">
                            {data.data.length}
                        </div>
                    </div>
                    <div className="event-analytic">
                        <div className="event-analytic-title">
                            Events displayed per minute:&nbsp;
                        </div>
                        <div className="event-analytic-value">
                            {(minutesElapsed > 1) ? (data.data.length / minutesElapsed).toFixed(3)
                        : (
                            <div className="loading-container">
                                <img className="loading-image small" src={require('./../images/purple-loading-svg.gif')}/>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
            <div className={data.loading ? "right-side loading" : "right-side"}>
                {!data.loading ? Object.values(data.data).reverse().map((item, i) => <Card key={i} data={item }/>) : (
                    <div className="loading-container">
                        <img className="loading-image" src={require('./../images/purple-loading-svg.gif')}/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Body;