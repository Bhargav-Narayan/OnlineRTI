var express = require("express");
var mongo = require("mongodb");
var ejs = require("ejs");
var path = require("path");
var bodyParser = require("body-parser");
var host = "127.0.0.1";
var app = express();
            /*db connection*/
var db;

var mongoClient = mongo.MongoClient;
mongo.connect("mongodb://onlineRTI:narayankp@ds056998.mongolab.com:56998/studentdb", function(error, r) {
    if (error)
        throw error;
    else {
        console.log("COnnected to db");
        db = r;
    }
})

app.set('view engine', 'ejs');

app.use(express.bodyParser());

app.use(express.static('/public'));

app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require("ejs").renderFile);

app.use('public/stylesheets', express.static(path.join(__dirname, 'public/stylesheets')));
/*routers*/
app.get('/', function(req, res) {//
    res.render("home");
})

app.post('/processInsert', function(req, res) {

    var studentName = req.body.Name;
    var studentUsn = req.body.Usn;
    var studentEmail = req.body.EmailId;
    var studentPhone = req.body.Phone;
    var studentBranch = req.body.Dept;
    var studentSem = req.body.Sem;
    var studentGrade = req.body.Grade;

    db.collection("studentDetail", function(error, collection) {
        collection.find({
            USN: studentUsn
        }, function(error, cursor) {
            cursor.toArray(function(error, rows) {
                if (error)
                    console.log("error while performing query");
                else {
                    if (rows.length !== 0) {
                        console.log("Exists");
                        res.send("Exists")
                    } else {
                        collection.insert({
                            Name: studentName,
                            USN: studentUsn,
                            Email: studentEmail,
                            Phone: studentPhone,
                            Branch: studentBranch,
                            Sem: studentSem,
                            Grade: studentGrade
                        }, function() {
                            res.send("Inserted");
                        })
                    }
                }

            })
        })
    })

});

app.get('/details', function(req, res) {
    res.render('detail');
})

app.post('/processDetails', function(req, res) {

    db.collection("studentDetail", function(error, collection) {
        collection.find({}, function(error, cursor) {
            cursor.toArray(function(error, rows) {
                if (error)
                    console.log("error while performing query");
                else {
                    var dbData = rows;
                    res.send(dbData);
                }
            })
        })
    })

})

app.post('/processSearch', function(req, res) {

    var usn = req.body.studentUsn;
    console.log(usn);
    db.collection("studentDetail", function(error, collection) {
        collection.find({
            USN: usn
        }, function(error, cursor) {
            cursor.toArray(function(error, rows) {
                if (error)
                    console.log("error while performing query");
                else {
                    if (rows.length != 0) {
                        var dbData = rows;
                        console.log(dbData)
                        res.send(dbData);
                    } else {
                        res.send("empty");
                    }
                }
            })
        })
    })
})

app.get('/assignment', function(req, res) {
    res.render('assignment');
})

app.get('/server', function(req, res) {
    res.render('index');
})

app.get('/problem', function(req, res) {
    res.render('assignment');
})

app.get('/home', function(req, res) {
    res.render('home');
})

var port = Number(process.env.PORT || 4333);

app.listen(port);
console.log(port);
