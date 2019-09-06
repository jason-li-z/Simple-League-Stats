const express = require("express");
const router = express.Router();
const fetch = require("node-fetch"); // Backend Fetch API,

// acc id = Es0kQQvanM8vBY6QHZVRm0IGrCLgDPVX1Ob24V0fOjpq568

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
        message: `User data for ${summonerName} was not found`
      });
    }

    if (data.status && data.status.status_code == 403) {
      return response.status(403).json({
        message: "Developer needs to update API Key"
      });
    }

    const accID = data.accountId;
    console.log(": " + accID);

    const accountID = data.id;

    const res2 = await fetch(
      `${process.env.SUMMONER_DATA_URL}/${accountID}${process.env.RIOT_API_KEY}`
    );
    const summonerData = await res2.json();
    response.json(summonerData);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

module.exports = router; // For exporting the router to use elsewhere
