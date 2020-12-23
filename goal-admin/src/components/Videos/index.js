import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Video from "../VideoList";

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) return next();
        res.redirect('/');
};

const Videos = () => {

    const match = useRouteMatch();
    const [videos, setVideos] = useState([]);

    if (videos.length === 0) {
        axios.get(`http://localhost:3001/video/api/admin/6465`).then(({ data }) => {
        
            setVideos(data);
        });
    }

    return (
        <div>
            <h1>Videos</h1>
            <Switch>
                <Route path={`${match.path}/:videoId`}>
                    <Video/>
                </Route>
                <Route path={match.path}>
                    <div id="video_div">
                        {
                            videos.map((video) => {
                                return <li key={ video._id }>
                                    <Link to={`${ match.path}/${video._id}`}>
                                        { video.team1 } - { video.team2 }
                                    </Link>
                                </li>
                            })
                        }
                    </div>
                </Route>
            </Switch>
        </div>
    );
}

export default Videos;