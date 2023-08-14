import './App.css'
import { Feed } from './components/feed/Feed.jsx';
import { peeps } from '../src/assets/samplePeeps.js'

function App() {
  return (
    <Feed peeps={peeps} />
  );
}

export default App;
