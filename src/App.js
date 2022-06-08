import {Route, Routes} from 'react-router-dom';
import SurveyJS from "./SurveyJS";
import Hello from "./Hello";
import Login from "./Login"
import Page404 from "./Page404";

function App() {
    return (
        <Routes>
            <Route path='*' element={<Page404/>} />
            <Route path='/' element={<Hello/>} s/>
            <Route path='/login' element={<Login/>} />
            <Route path='/survey' element={<SurveyJS/>} />
        </Routes>
    );
}


export default App
