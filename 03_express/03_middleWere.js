
import express from "express"
const app = express();

app.get("/", (req, res) => {
  res.send("Bachha's Server is Running");
});

app.get("/about", (req, res) => {
  res.json({ page: "This is About Section" });
});

app.use("/json", (req, res, next) => {
  res.json({ page: "JSON FROMAT" });
});

const person = [
  {
    name: "VRAJ",
    age: 17,
    language: "English",
  },
];

app.use("/person", (req, res) => {
  res.json(person);
});

const port = 5000;

app.listen(port, (err) => {
  if (err) {
    console.log(err);

    return;
  }

  console.log(`server running on port ${port}`);
});
