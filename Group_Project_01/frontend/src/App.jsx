import './App.css'
import Form from './components/Form';
import { Routes ,  Route } from "react-router-dom";
import InsertPost from './components/InsertPost';
import ShowPost from './components/ShowPost';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element = { <Form /> } />
        <Route path="/post" element = { <InsertPost /> } />
        <Route path="/post/:id" element = { <ShowPost /> } />
      </Routes>
    </div>
  )
}

export default App
