import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("send your massage");
});

const port = 5000;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`Server running on port ${port}`);
});
