const express = require("express");
const app = express();

app.use(express.json());

let students = [];
let id = 1;

/* CREATE student */
app.post("/students", (req, res) => {
  const { name, email, course } = req.body;

  const student = {
    id: id++,
    name,
    email,
    course
  };

  students.push(student);
  res.status(201).json(student);
});

/* READ all students */
app.get("/students", (req, res) => {
  res.json(students);
});

/* READ student by id */
app.get("/students/:id", (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  if (!student) return res.status(404).json({ msg: "Student not found" });
  res.json(student);
});

/* UPDATE student */
app.put("/students/:id", (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  if (!student) return res.status(404).json({ msg: "Student not found" });

  student.name = req.body.name || student.name;
  student.email = req.body.email || student.email;
  student.course = req.body.course || student.course;

  res.json(student);
});

/* DELETE student */
app.delete("/students/:id", (req, res) => {
  students = students.filter(s => s.id != req.params.id);
  res.json({ msg: "Student deleted" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
