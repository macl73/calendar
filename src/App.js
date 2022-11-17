import './main.css';
import Calendar from './components/Calendar.js';


function App() {
  
  const now = new Date();
  return (
    <Calendar date = {now} />
  );
}

export default App;
