import React from 'react';
import { useState } from 'react'

function Mainpage() {
    //  all useState
    const [studentsName, setStudentsName] = useState("");
    const [students, setStudents] = useState([]);
    const [editAble,setEditable]=useState(false);
    const [editableName,setEditableName]=useState(null);
    // add student button function
    const addStudent = (event, name) => {
        event.preventDefault();
        if (name) {
            const newStudent = {
                id: Date.now(),
                name,
            }
            setStudents([newStudent, ...students]);
            setStudentsName("")

        }
        else {
            alert("Please Enter a valid student name")
        }
    }
    
    // delete student name button function
    const deleteHandler = (studentid) => {
        const newStudentlist=students.filter((student) =>(
            student.id !== studentid)
        )
        setStudents(newStudentlist);
    }

    //  Edit handler for edit button

    const editHandler=(studentid)=>{
        setEditable(true);
        const neweditableStudent=students.find((item)=>item.id === studentid);
        setEditableName(neweditableStudent);
        setStudentsName(neweditableStudent.name);
    }

    // update the eiditable name with update handler

    const updateHandler=(event,name) => {
        event.preventDefault();
        if(!name){
           alert('Please enter a valid name')
        }
        else{
            editableName.name = name || editableName.name;
            setStudentsName("");
            setEditable(false);
            setEditableName(null);
        }
    }

    // Present hadnder for present student
    const presentHandler = (studentid) => {
        const student=students.find((item)=>item.id===studentid);
        if(student.isPresent===undefined){
            student.isPresent=true;
            
        }
        else if(student.isPresent===true){
           alert("the student is already  present list")
        }
        else{
            alert("the studentis alrady absent list")
        }
        setStudents([...students])
    }

    // absent handler for absent student
    const absentHandler = (studentid) => {
        const student=students.find((item)=>item.id===studentid);
        if(student.isPresent===undefined){
            student.isPresent=false;
            
        }
        else if(student.isPresent===false){
           alert("the student is already  absent list")
        }
        else{
            alert("the studentis alrady present list")
        }
        setStudents([...students])
    }

    // toggle handler
    const toggleHandler = (studentid) => {
        const student=students.find((item)=>item.id===studentid);
        student.isPresent=!student.isPresent
        setStudents([...students])
    }


    return (
        <div className="mainpage">
            <form action="text-form">
                <input value={studentsName} onChange={(e) => setStudentsName(e.target.value)} type="text" name="student-name" placeholder="Enter Students Name"/>
                {/* <button onClick={(e) => addStudent(e, studentsName)}>Add Student</button> */}
                <button onClick={(e) => editAble ? updateHandler(e, studentsName) :addStudent(e, studentsName)}>{editAble? "Update":"Add Student"}</button>
            </form>
            <div className="portal">

                <div className="nameportal">
                    <h3>Student Name</h3>

                    
                        {students.map(student => (
                            <div  className="studentsname">
                                <span>{student.name}</span>
                                <div className="allbtn">
                                <button className="editbtn" onClick={()=>editHandler(student.id)}>Edit</button>
                                <button className="dltbtn" onClick={()=>deleteHandler(student.id)}>Delete</button>
                                <button className="presentbtn" onClick={()=>presentHandler(student.id)}>Present</button>
                                <button className="absentbtn" onClick={()=>absentHandler(student.id)}>Absent</button>
                                </div>
                                
                            </div>


                        ))}
                    
                </div>

                <div className="present">
                    <h3>Present</h3>
                    <div>
                        {students.filter(item => item.isPresent===true).map((student)=>(
                            <div className="finalshow">
                                <span>{student.name}</span><br />
                                <button className="togglebtn1" onClick={()=>toggleHandler(student.id)}>Absent</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absent">
                    <h3>Absent</h3>
                    <div>
                        {students.filter(item => item.isPresent===false).map((student)=>(
                            <div  className="finalshow">
                                <span>{student.name}</span><br />
                                <button className="togglebtn" onClick={()=>toggleHandler(student.id)}>Present</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </div>
    )



}

export default Mainpage;
