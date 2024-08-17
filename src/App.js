import { Route, Routes } from 'react-router-dom';
import './App.css';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage'; 
import DashboardPage from './components/DashboardPage'; 
import HotelsPage from './components/HostelsPage'; 
import BookingsPage from './components/BookingsPage'; 
import NavBar from './components/NavBar'; 
import BookRoomPage from './buttonRelatedPages/BookRoomPage';
import ViewReviewPage from './buttonRelatedPages/ViewReview' ;
import AddReviewPage from './buttonRelatedPages/AddReview' ;


function App() {
  //sessionStorage.setItem("isLoggedIn", false)
  return(
    <>
    {/* <header className='App-header'>Dinesh Stay </header> */}

    {/* <RegistrationPage/> */}
    <NavBar/>
    <Routes>
      <Route path="/" element={<RegistrationPage/>} />
      <Route path="/LoginPage" element={<LoginPage/>} />
      <Route path='/dashboardPage' element={<DashboardPage/>} />
      <Route path='/hotelsPage' element={<HotelsPage/>} />
      <Route path='/bookingsPage' element={<BookingsPage/>} />
      <Route path='/bookRoomPage/:bookRoomHotelId' element={<BookRoomPage/>} />
      <Route path='/viewReviewPage/:hotelId' element={<ViewReviewPage/>} />
      <Route path='/addReviewPage/:addReviewHotelId' element={<AddReviewPage/>} />
      <Route path='/hotelsPage' element={<HotelsPage/>}/>

    </Routes>

    </>
  );
}

export default App;

