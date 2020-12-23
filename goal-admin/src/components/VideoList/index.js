import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const VideoList = () => {
    const { videoId } = useParams();
    const match = useRouteMatch();
    const [videos, setVideos] = useState([]);

    if (videos.length === 0) {
        axios.get(`http://localhost:3001/video/api/admin/6465`).then(({ data }) => {

            setVideos(data);
        });
    }
    var vlist = []
    return (
        <div>
            <h2>Videos list</h2>
            <Switch>
                <Route path={match.path}>
                    <div id="video_div">
                        {
                            videos.filter(video => video._id === videoId).map((video) => {
                                Object.keys(video.videos).forEach(function (key){
       
                                    var v = video.videos[key].embed.substring(video.videos[key].embed.indexOf("src='")+5, video.videos[key].embed.indexOf("' frameborder="));
                                    vlist+= v+" | "
                                })           
                                return <li key={ video._id }>
                                    { vlist }
                                </li> 
                            })
                        }
                    </div>
                </Route>
            </Switch>
        </div>
    )
}

export default VideoList;