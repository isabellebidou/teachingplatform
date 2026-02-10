import React, { useEffect, useState } from 'react';



function Buttons() {
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        fetchData();
    }, []);
    const [data, setData] = useState([]);
    const [audios, setAudios] = useState([]);
    const fetchData = async () => {
        const userData = await fetch(`/api/user_data/`);
        const data = await userData.json();
        setData(data);

    };

    return (
        <section>
            <div className="grid-container">
                {
                    items.map(audio => {
                        return (

                            <div className="" key={audio._id}>
                                <div className="item photoThumbnail">
                                    <p className="item">
                                        {audio.comments} recording sent on: {new Date(audio.dateSent).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                        );

                    })
                }
            </div>
        </section>
    );
}

export default Buttons