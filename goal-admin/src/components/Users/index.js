import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import User from "../User";

const Users = () => {
    const match = useRouteMatch();
    console.log(match);
    return (
        <div>
            <h1>Users</h1>

            <Switch>
                <Route path={`${match.path}/:userId`}>
                    <User/>
                </Route>
                <Route path={match.path}>
                    <h2>Select a user</h2>
                    <div id="users_div">
                        <ul id="users_ul">
                            <li>
                                <Link to={`${match.path}/1`}>
                                    User 1
                                </Link>
                            </li>
                            <li>
                                <Link to={`${match.path}/2`}>
                                    User 2
                                </Link>
                            </li>
                            <li>
                                <Link to={`${match.path}/3`}>
                                    User 3
                                </Link>
                            </li>
                        </ul>
                    </div>
                </Route>
            </Switch>
        </div>
    );
}

export default Users;