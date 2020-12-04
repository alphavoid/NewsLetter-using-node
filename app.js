const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

//app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
        const firstname = req.body.fname;
        const lastname = req.body.lname;
        const email = req.body.email;
        console.log("Details"+firstname+ lastname+email);
        const data = {
            members: [
                {
                    email_address: email,
                    status:"subscribed",
                    merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }                
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url ="https://us7.api.mailchimp.com/3.0//lists/9f9a6d2c3a";
    const options = {
        method: "POST",
        auth: "anisha:4cff8da7434379b453c3ed821c91dfe2-us7"
    }
    const request =  https.request(url, options,function(response){
        console.log(response.statusCode);
        if (response.statusCode === 200)
        res.sendFile(__dirname + "/success.html");
        else
        res.sendFile(__dirname + "/failure.html");

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
     })
    // request.write(jsonData);
    request.end();    
})
app.post("/failure",function(req,res){
    res.redirect("/");
}) 
app.listen(process.env.PORT || 3000, function(){
    console.log("Working");
});

// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const request = require("request");
// const https = require("https");

// app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.static("public"));
// //we are accessing static folders and if we want those changes to update
// //in static folder we will use the above method.
// app.get("/",function(req,res){
//     res.sendFile(__dirname+"/signup.html");
// });
//     app.post("/",function(req,res){
//         const f = req.body.fname;
//         const l = req.body.lname;
//         const e = req.body.mail;
//         console.log(f+" "+l+" "+e);

//         let data ={
//             members:[
//                 {
//                     email_address: e,
//                     status:"subscribed",
//                     merge_fields:{
//                         FNAME:f,
//                         LNAME:l
//                     }
//                 }
//             ]
//         };
//         var jsonData = JSON.stringify(data);
         
//         //here we want to post data and not extract
//         const url ="https://us7.api.mailchimp.com/3.0//lists/9f9a6d2c3a";
//         const options={
//             method:"POST",
//             auth:"anisha:ea42a45a789bdccd04531551001bd901-us7"
//         }
//         const request = https.request(url,options,function(response){

//             if(response.statusCode===400){
//                 res.sendFile(__dirname+"/success.html");
//             }
//             else{
//                 res.sendFile(__dirname+"/failure.html");
//             }

//             response.on("data",function(data){
//                 console.log(JSON.parse(data));
//             })
//         })
//         //  request.write(jsonData);
//         request.end();
//     })

//     app.post("/failure",function(req,res){
//         res.redirect("/");
//     })

// app.listen(process.env.PORT || 5500,function(){
//     console.log("Server begins");
// })




// api key -- 4cff8da7434379b453c3ed821c91dfe2-us7

// id --9f9a6d2c3a