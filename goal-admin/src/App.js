import './stylesheet.css';
import { BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Header from './components/Header';
import Users from './components/Users';
import Videos from './components/Videos';
import History from './components/History';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <main>
          <Switch>
            <Route path="/Users">
              <Users/>
            </Route>
            <Route path="/History">
              <History/>
            </Route>
            <Route path="/Videos">
              <Videos/>
            </Route>
            <Route path="/">
              <h1>Home</h1>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
