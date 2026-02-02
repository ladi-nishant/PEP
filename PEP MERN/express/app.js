const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());
let students = JSON.parse(fs.readFileSync("students.json", "utf8"));
let id = 1;
const save =()=>fs.writeFileSync("students.json", JSON.stringify(students));
app.post("/students", (req, res) => {
  students.push({ id: id++, ...req.body });
  save();
  res.json(students[students.length - 1]);
});
app.get("/students", (req, res) => res.json(students));
app.get("/students/:id", (req, res) =>
  res.json(students.find(s => s.id == req.params.id))
);
app.put("/students/:id", (req, res) => {
  let s = students.find(s => s.id == req.params.id);
  Object.assign(s, req.body);
  save();
  res.json(s);
});
app.delete("/students/:id", (req, res) => {
  students = students.filter(s => s.id != req.params.id);
  save();
});
app.listen(3000);
