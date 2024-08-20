import WorkoutList from './WorkoutLists'
import CreateWorkout from './CreateWorkout'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Recommendations from './Recommendations';
import './App.css';

function App() {
 
  return (
<div>
<nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/AddWorkout">Add Workout</a></li>
      <li><a href="/Recommendations">Recommendations</a></li>
   
    </ul>
  </nav>

    <BrowserRouter>
   <Routes>
      <Route path="/" element={<WorkoutList />} />
    <Route path="/AddWorkout" element={<CreateWorkout />} />
      <Route path="/Recommendations" element={<Recommendations />} />
      </Routes>
</BrowserRouter>

</div>
  )
}

export default App
