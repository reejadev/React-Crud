import { Routes,Route } from "react-router-dom"
import Home from '../pages/Home.js'
import About from '../pages/About.js'
import Contact from '../pages/Contact.js'
import StudentList from '../pages/Student.js'
import StudentCreate from '../pages/StudentCreate.js'
import StudentEdit from '../pages/StudentEdit.js'


function MyRouter(){

    return(
<Routes>
    <Route path="/" element={< Home/>}></Route>
    <Route path="/about" element={< About/>}></Route>
    <Route path="/contact-us" element={< Contact/>}></Route>
    <Route path="/students" element={< StudentList/>}></Route>
    <Route path="/students/create" element={< StudentCreate/>}></Route>
    <Route path="/students/:id/edit" element={< StudentEdit/>}></Route>


</Routes>
    )

}
export default MyRouter;