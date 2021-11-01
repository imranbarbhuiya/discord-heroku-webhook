const express = require("express");
const app = express();
const request = require("request");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (_, res) {
  res.send("Hello World");
});

app.post("/webhook", async (req, res) => {
  const Payload = req.body;
  //Respond To Heroku Webhook
  res.sendStatus(200);

  const options = {
    method: "POST",
    url: process.env.URL,
    headers: {
      "Content-type": "application/json",
    },
    //Format JSON DATA
    body: JSON.stringify({
      username: "Heroku Build",
      embeds: [
        {
          author: {
            name: `${Payload.data.user.email}`,
            icon_url:
              "https://cdn.discordapp.com/avatars/758880890159235083/d1967a6f5040ad22cfaaf3e13ab5c3f1.png?size=4096",
          },
          title: "Codversity Build Report",
          url: "https://codversity.herokuapp.com/",
          color: `${Payload.data.status == "succeeded" ? "GREEN" : "RED"}`,
          description: `App Name: ${Payload.data.app.name}`,
        },
      ],
    }),
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response);
  });
});
app.listen(process.env.PORT || 3000, () => console.log("App started"));
