import express from "express";

const app = express();

const port = 5000;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

let StudentList = [
  {
    id: 1,
    name: "Bacho",
  },
  {
    id: 2,
    name: "Baggo",
  },
];

app.get("/", (req, res) => {
  res.render("index", { StudentList });
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).send("Student name is required");
  }

  const newStudent = {
    id: Date.now(),
    name: name.trim(),
  };

  StudentList.push(newStudent);

  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  const id = Number(req.params.id);

  StudentList = StudentList.filter((student) => student.id !== id);

  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const id = Number(req.params.id);

  const student = StudentList.find((student) => student.id === id);

  if (!student) {
    return res.status(404).send("Student not found");
  }

  res.render("edit", { student });
});

app.post("/edit/:id", (req, res) => {
  const id = Number(req.params.id);

  const student = StudentList.find((student) => student.id === id);

  if (!student) {
    return res.status(404).send("Student not found");
  }

  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).send("Student name is required");
  }

  student.name = name.trim();

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});