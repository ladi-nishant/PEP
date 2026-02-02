// import express from 'express';
// const app=express();
// app.use(express.json())
// let users=[
//     {id : 1, name : "vikash", email : "vikash@example.com"},
//     {id : 2, name : "suresh", email : "suresh@example.com"},
//     {id : 3, name : "ramesh", email : "ramesh@example.com"},
//     {id : 4, name : "mahesh", email : "mahesh@example.com"}
// ]

// app.post("/students",(req,res)=>{
//     const newUser=req.body;
//     users.push(newUser);
//     res.send("Student added successfully");
// })
// app.get('/students',(req,res)=>{
//     res.json(users);
// })

// app.get('/student/:id',(req,res)=>{
//     const id=parseInt(req.params.id);
//     const user=users.find(u=>u.id===id);
//     if(user){
//         res.json(user);
//     }else{
//         res.status(404).send("Student not found");
//     }
// })
// app.listen(3000,()=>{
//     console.log("Server started on port 3000");
// })




const express = require("express");
const app = express();
app.use(express.json());
let students = [];
let id = 1;
app.post("/students",(req, res)=>{
  const {name,email,course } = req.body;
  const student = {id: id++,name,email,course };
  students.push(student);
  res.json(student);
});

app.get("/students",(req, res)=>{
  res.json(students);
});

app.get("/students/:id",(req, res)=>{
  const student = students.find(s => s.id == req.params.id);
  if (!student) return ;
  res.json(student);
});

app.put("/students/:id",(req, res)=>{
  const student = students.find(s => s.id == req.params.id);
  if (!student) return ;
  student.name = req.body.name || student.name;
  student.email = req.body.email || student.email;
  student.course = req.body.course || student.course;
  res.json(student);
});
app.delete("/students/:id", (req, res) => {
  students = students.filter(s => s.id != req.params.id);
  res.json({ msg: "Student deleted" });
});

app.listen(3000);