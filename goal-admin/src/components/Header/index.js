import { Link } from 'react-router-dom';

const Header = () => (
    <header>
        <div id="div_nav">
            <nav>
                <ul>
                    <li>
                        <Link to ="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/Videos">Videos</Link> 
                    </li>
                    <li>
                        <Link to="/Users">Users</Link> 
                    </li>
                    <li>
                        <Link to="/History">History</Link> 
                    </li>
                </ul>
            </nav>
        </div>
    </header>
);

export default Header;