const express = require("express");
const router = express.Router();
const fetch = require("node-fetch"); // Backend Fetch API,

router.get("/:name", async (request, response) => {
  // async / await --> wait to catch errors
  try {
    const summonerName = encodeURI(request.params.name);
    const headers = {
      "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8"
    };
    const res = await fetch(
      `${process.env.SUMMONER_NAME_URL}/${summonerName}/${process.env.RIOT_API_KEY}`,
      headers
    );
    const data = await res.json();

    if (data.status && data.status.status_code == 404) {
      return response.status(404).json({
        message: "Summoner profile not found"
      });
    }

    const accountID = data.id;
    console.log(accountID);

    const res2 = await fetch(
      `${process.env.SUMMONER_DATA_URL}/${accountID}${process.env.RIOT_API_KEY}`
    );
    const summonerData = await res2.json();
    console.log(summonerData);
    response.json(summonerData);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

module.exports = router; // For exporting the router to use elsewhere
