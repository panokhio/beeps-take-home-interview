import './Card.css';

const Card = (data) => {

    //converts timestamp into a proper date string
    const date = new Date(data?.data.timestamp).toLocaleString();

    return (
        <div className="card-container">
            {data?.data ? (
                <div>
                    <div className="user-info-section">
                        <div className="user-info-image-container">
                            <img className="user-info-image" src={data.data.user?.image_url} alt={"profile pic"}/>
                        </div>
                        <div className="user-info">
                            <div>
                                <div className="user-info-name">
                                    {data.data.user?.name}
                                </div>
                                <div className="user-info-username">
                                    @{data.data.user?.username}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-section">
                        {data.data.message}
                    </div>
                    <div className="date-section">
                        {date}
                    </div>
                    <div className="tags-section">
                        {data.data.tags ? Object.values(data.data.tags).map((tag, t) => {
                            return(
                                <div className="tag" key={t}>
                                    {tag}
                                </div>
                            );
                        }) : null}
                    </div>
                </div>
            ) : null}  
        </div>
    );
}

export default Card;
