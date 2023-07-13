import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

function StudentEdit(){

let {id} = useParams();

   // const navigate= useNavigate();
//const [loading, setLoading] = useState([true]);
const [inputErrorList, setInputErrorList] = useState({})
const [student, setStudent] = useState({})

useEffect(()=>{

    axios.get(`http://127.0.0.1:8000/api/edit-student/${id}`).then(res => {
     console.log(res)
     setStudent(res.data.student);
     //setLoading(false);
    })
    .catch(function (error){

        if(error.response){
           
            if(error.response.status === 404){
                alert(error.response.data.message)
                //setLoading(false);
            }
            if(error.response.status === 500){
                alert(error.response.data)
                //setLoading(false);
            }
        }
    
     });
    
 
   }, [id]);

const handleInput = (e) => {
    e.persist();
    setStudent({...student,[ e.target.name]:  e.target.value });
}


const updateStudent = (e) => {
 e.preventDefault();

 //setLoading(true);
 const data = {
    name: student.name,
    email: student.email,
    phone: student.phone,
    course: student.course,
    
 }

 axios.put(`http://127.0.0.1:8000/api/update-student/${id}`,data)
 .then(res => {

    alert(res.data.message);
    //navigate('/students');
    //setLoading(false);
 })

 .catch(function (error){

    if(error.response){
        if(error.response.status === 422){
            setInputErrorList(error.response.data.validate_err)
            //setLoading(false);
        }
        if(error.response.status === 404){
            alert(error.response.data.message)
            //setLoading(false);
        }
        if(error.response.status === 500){
            alert(error.response.data)
            //setLoading(false);
        }
    }

 });

}

if(Object.keys(student).length === 0){
    return(
      <div classNmae="container"><h4>No student data available</h4></div>
    )
      }

    return(
        <div>
            <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Edit Students 
                <Link className="btn btn-danger float-end" to="/students">Back</Link>
              </h4>
            </div>
            <div className="card-body">

            <form onSubmit={updateStudent}>
<div className="form-group mb-3">
    <label>Student Name</label>
    <input type="text" name="name" onChange={handleInput} value={student.name} className="form-control"/>
    <span className="text-danger">{inputErrorList.name}</span>

</div>

<div className="form-group mb-3">
    <label>Student Course</label>
    <input type="text" name="course" onChange={handleInput} value={student.course} className="form-control"/>
<span className="text-danger">{inputErrorList.course}</span>
</div>

<div className="form-group mb-3">
    <label>Student Email</label>
    <input type="text" name="email" onChange={handleInput} value={student.email} className="form-control"/>
    <span className="text-danger">{inputErrorList.email}</span>

</div>

<div className="form-group mb-3">
    <label>Student Phone</label>
    <input type="text" name="phone" onChange={handleInput} value={student.phone} className="form-control"/>
    <span className="text-danger">{inputErrorList.phone}</span>

</div>

<div className="form-group mb-3">
   <button type="submit" className="btn btn-primary">Update Student</button>

</div>
</form>

        </div>
        </div>
          </div>
        </div>
      </div>
    </div>
    )

}

export default StudentEdit;