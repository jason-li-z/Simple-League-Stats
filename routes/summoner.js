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
        message: `User data for ${summonerName} was not found`
      });
    }

    if (data.status && data.status.status_code == 403) {
      return response.status(403).json({
        message: "Developer needs to update API Key"
      });
    }

    const accID = data.accountId;
    //const mmrResponse = await fetch(`${process.env.MMR_DATA_URL}${data.name}`);

    const accountID = data.id;

    const res2 = await fetch(
      `${process.env.SUMMONER_DATA_URL}/${accountID}${process.env.RIOT_API_KEY}`
    );
    const summonerData = await res2.json();
    let unicodeName = encodeURI(data.name);
    const res3 = await fetch(`${process.env.MMR_DATA_URL}${unicodeName}`);
    const mmrData = await res3.json();
    console.log(res3);
    var result = "";
    var tier = "";
    var max = -1;

    if (res3.status == 404) {
      result = "Data not found";
      tier = "";
      max = "";
    } else if (res3.status != 404 && mmrData.ranked.avg == null) {
      result = "Ranked Data not found";
      tier = "";
      max = "";
    } else {
      result = "~" + mmrData.ranked.avg + " within ";
      tier = mmrData.ranked.tierData[1].name;
      max = ` —— Max MMR in ${mmrData.ranked.tierData[1].name} is ${mmrData.ranked.tierData[1].max}`;
    }

    response.json({
      summonerData,
      name: data.name,
      mmr: result,
      avgMmrRank: tier,
      maxMmr: max
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

module.exports = router; // For exporting the router to use elsewhere
