const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');


app.use(express.json());

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

mongoose.connect("mongodb://localhost:27017/adminDB");


const adminSchema = {
  name: String,
  password: String,
  quizCount: Number,
  quizes: [
  { quiz: 
    [{
    question: String,
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    correct: String
  }],
  scores:
  [{
    name: String,
    score: String
  }],
  title: String
  // startTime: Date,
  // endTime: Date
}
]
};

const Admin = mongoose.model("Admin",adminSchema);

app.get("/:adminId",function(req,res){
  const requiredAdminId = req.params.adminId;
  Admin.findOne({_id:requiredAdminId},function(err,admin){
    res.json(admin);
  });

});

app.get("/take-quiz/:quizId",function(req,res){
  const requiredQuizId = req.params.quizId;
  Admin.findOne({'quizes._id': requiredQuizId},function(err,data){
    res.json(data);
  });

});

app.post("/create-admin",function(req,res){
   console.log(req.body);
  const admin = new Admin({
    name: req.body.name,
    password: req.body.password,
    quizCount: 0,
    quizes: []
  });
  admin.save(function(err, obj) {
    if (err)
        res.send(err);

    res.send(obj);
});
});

app.post("/login",function(req,res){
  console.log(req.body);
 Admin.findOne({name: req.body.name, password: req.body.password},function(err, admin) {
   if (err){
       console.log(err);
       res.status(500).send();
   }
   if(!admin)
   res.status(404).send();
   res.send(admin);
});
});

app.post("/create-quiz/:adminId",function(req,res){
  const requiredAdminId = req.params.adminId;
  console.log(req.body);
  const obj ={
     quiz: [{ 
    question: req.body.question,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4,
    correct: req.body.correct
  }],
  title: req.body.title
}
   Admin.findOneAndUpdate({_id:requiredAdminId},{ $inc: {"quizCount": 1}, 
  //  $set:{"startTime": req.body.startTime},
  // $set:{"endTime": req.body.endTime},
    $push: { "quizes": obj }},{ returnDocument: 'after' },(err, doc) => {
      if (err) {
          console.log("Something wrong when updating data!");
      }
      res.send(doc);
  });
});

app.post("/add-ques/:quizId",function(req,res){
  const requiredQuizId = req.params.quizId;
  console.log(req.body);
  const ques ={ 
    question: req.body.question,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4,
    correct: req.body.correct
}
  Admin.findOneAndUpdate({'quizes._id': requiredQuizId},{ $push: { "quizes.$.quiz": ques }},{ returnDocument: 'after' },(err, doc) => {
      if (err) {
          console.log("Something wrong when updating data!");
      }
      res.send(doc);
  });
});

app.post("/submit-quiz/:quizId",function(req,res){
  const requiredQuizId = req.params.quizId;
  console.log(req.body);
  const taker ={ 
    name: req.body.name,
    score: req.body.score
}
  Admin.findOneAndUpdate({'quizes._id': requiredQuizId},{ $push: { "quizes.$.scores": taker }},{ returnDocument: 'after' },(err, doc) => {
      if (err) {
          console.log("Something wrong when updating data!");
      }
      res.send(doc);
  });
});


app.listen(9000, function() {
  console.log("Server started on port 9000");
});
