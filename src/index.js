import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useParams,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom"

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/myapps" element={<Navigate replace to="/learn" />}/>
      <Route path="/learn" element={<Learn/>}>
        <Route path="courses" element={<Course/>}>
          <Route path=":courseid" element={<CourseId/>}/>
        </Route>
        <Route path="bundles" element={<Bundle/>} />
      </Route>
      <Route path="/dashboard" element={<DashBoard/>}/>
      {/* <Route path="/learn/coursesTwo" element={<Course/>} /> */}
    </Routes>
  </Router>,
  document.getElementById('root')
);

function Home (){
  return(
    <div>
      <h1>HOMEPAGE ROUTE</h1>
    </div>
  )
}

function Learn (){
  return(
    <div>
      <h1>LEARNING ROUTE</h1>
      <h4>All courses are listed here!</h4>
      <Link className='btn btn-success' to="/learn/courses">courses</Link>  
      <Link className='btn btn-warning ms-1' to="/learn/bundles">bundle</Link>
      <Outlet/>
    </div>
  )
}

function Course (){
  const courseList = ["React", "Angular", "Vue", "NodeJS"]
  const randomCourseName = courseList[Math.floor(Math.random()*courseList.length)]
  return(
    <div>
      <h1>COURSES LIST ROUTE</h1>
      <h4>Course Card</h4>
      <p>More Test</p>
      <NavLink
      style={({isActive}) => {
        return{
          backgroundColor: isActive ? "orange" : "yellow",
          padding: "5px",
        }
      }}
      to={`/learn/courses/${randomCourseName}`}>
        {randomCourseName}
      </NavLink>
      <NavLink className="btn btn-light ms-2" to={`/learn/courses/tests`}>Tests</NavLink>
      <Outlet/>
    </div>
  )
}

function Bundle (){
  return(
    <div>
      <h1>BUNDLES LIST ROUTE</h1>
      <h4>Bundle Card</h4>
    </div>
  )
}

function CourseId (){
  const { courseid } = useParams()
  const navigate = useNavigate()
 
  return(
    <div>
      <h1>URL Params is: {courseid}</h1>
      <button onClick={() =>{
        navigate("/dashboard", { state: "399" } )  //navigate(-1 / 1 / ..)
      }}  className='btn btn-info'>Price</button>
      <Link to="/dashboard" state={`${courseid}`}>CourseID</Link>
    </div>
  )
}


function DashBoard (){
  const location = useLocation()
  return(
    <div>
      <h1>DASHBOARD ROUTE</h1>
      <h4>Info that I got here is: {location.state}</h4>
    </div>
  )
}



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
