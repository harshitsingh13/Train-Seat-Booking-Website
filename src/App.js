import logo from './logo.svg';
import './App.css';
import BookTicket from './BookTicket';
import ShowBookings from './ShowBookings';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (

    <Routes>
        <Route path="/" element={<BookTicket />} />
        <Route path="ShowBookings" element={<ShowBookings />} />
      </Routes>
  );
}

export default App;


