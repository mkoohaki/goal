import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const History = () => {

    const match = useRouteMatch();
    const [histories, setHistory] = useState([]);

        if (histories.length === 0) {
            axios.get(`http://localhost:3001/history/api/german/18/admin/6465`).then(({ data }) => {
            
                setHistory(data);
            });
        }

    return (
        <div>
            <h1>History</h1>

            <Switch>
                <Route path={`${match.path}/:historyId`}>
                    <div>Single History</div>
                    <Link to={match.path}>Back to list</Link>
                </Route>
                <Route path={match.path}>
                    <div id="history_div">
                        {
                            histories.map((history) => {
                                return <h2 id="history_h2" key={ history._id } > { history.HomeTeam } { history.FTHG }   -   { history.FTAG } { history.AwayTeam }</h2>
                            })
                        }
                    </div>
                </Route>
            </Switch>
        </div>
    );
}

export default History;