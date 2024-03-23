(require('dotenv').config());
const express = require("express");
const bodyParser = require("body-parser");

const https = require("https");
const app = express();

const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", (req, res) => {
  const emailAdress = req.body.email;
  const secondName = req.body.second;
  const firstName = req.body.first;
  const data = {
    members: [
      {
        email_address: emailAdress,
        status: "subscribed",
        merge_feilds: {
          FNAME: firstName,
          LNAME: secondName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us5.admin.mailchimp.com/lists/b8278d6a45";
  const option = {
    method: "POST",
    auth: "emeke:process.env.API_KEY",
  };

app.post("/failure", function(req, res) {
  res.redirect("/")
})

  const request = https.request(url, option, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");

    }
    response.on("data", function (data) {
    
    });
  });
  request.write(jsonData);
  request.end();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
