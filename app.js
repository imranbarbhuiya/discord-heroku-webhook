const express = require("express");
const app = express();
const request = require("request");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/webhook", async (req, res) => {
  const Payload = req.body;
  //Respond To Heroku Webhook
  res.sendStatus(200);

  const options = {
    method: "POST",
    url: "https://discord.com/api/webhooks/904706503099957288/C5kFmuQD0iDLQqabE20IkGvduUeUGHI9Iq8YXNrs_wacpAuxmDnX8qjOBKCTSe94tUyb",
    headers: {
      "Content-type": "application/json",
    },
    //Format JSON DATA
    body: JSON.stringify({
      content: `This is A Webhook notification!A build for your app ${Payload.data.app.name} was just triggered`,
    }),
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response);
  });
});
app.listen(process.env.PORT || 3000, () => console.log("App started"));
