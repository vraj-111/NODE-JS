import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("I send my data ");
});

const port = 215;

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }

  console.log(`my server running on port ${port}`);
});
