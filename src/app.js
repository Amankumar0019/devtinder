const express = require("express");

const app = express();

// if we have / route then /hello and /secret will not work as it first get / route

// sequence of code matter 

// app.use("/", (req, res) => {
//   res.send("hello Welcome to the '/' end point!!");
// });

// comment above 2 lines to make it work

// if we type /hello/anything... it will go to /hello
app.get("/user/:userid/:name/:password", (req, res) => {
  console.log(req.params)
  res.send({firstNmae:"Aman",lastName:"Kumar"});
});

app.post("/user", (req, res) => {
  res.send("post user endpoint");
});
//Rejesxt the /user route to handle any path that ends with fly
app.get(/.*fly$/, (req, res) => {
  res.send("post user  aman");
});

app.use("/hello", (req, res) => {
  res.send("hello how are you!!");
});

app.use("/secret", (req, res) => {
  res.send("How do you find me ? Are you god ??");
});

app.listen(3000, () => {
  console.log("Server is listing on port 3000...");
});
