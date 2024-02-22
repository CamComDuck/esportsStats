function postGameStatsUpdate() {
    var codeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Post Game');
    var gameId = "NA1_" + codeSheet.getRange("A1").getValues();
    var apiKey = getApiKey();
    var gameIdJSON = api_call("https://americas.api.riotgames.com/lol/match/v5/matches/"+ gameId + "?api_key=" + apiKey);
    var dmg_chart = [];
  
    for (var i = 0; i < 10; i++) {
      var input = [gameIdJSON['info']["participants"][i]["summonerName"],gameIdJSON['info']["participants"][i]["totalDamageDealtToChampions"]]
      dmg_chart.push(input);
  
      var response = UrlFetchApp.fetch("http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/" + gameIdJSON['info']["participants"][i]["championName"] + ".png");
      var binaryData = response.getContent();
      var blob = Utilities.newBlob(binaryData, 'image/png', 'MyImageName');
  
      var kda = gameIdJSON['info']["participants"][i]["kills"]+"/"+gameIdJSON['info']["participants"][i]["deaths"]+"/"+gameIdJSON['info']["participants"][i]["assists"]
      var minions_killed = gameIdJSON["info"]["participants"][i]["totalMinionsKilled"] + gameIdJSON["info"]["participants"][i]["neutralMinionsKilled"]
  
  
      if (i === 0) {
        var outputr = 6;
        var outputc = 11;
        codeSheet.getRange("G12").setValue(gameIdJSON['info']["participants"][i]["summonerName"]);
        codeSheet.getRange("G13").setValue(kda);
        codeSheet.getRange("G14").setValue(minions_killed + " CS");
      } else if (i === 1) {
        var outputr = 6;
        var outputc = 16;
        codeSheet.getRange("G17").setValue(gameIdJSON['info']["participants"][i]["summonerName"]);
        codeSheet.getRange("G18").setValue(kda);
        codeSheet.getRange("G19").setValue(minions_killed + " CS");
      } else if (i === 2) {
        var outputr = 6;
        var outputc = 21;
        codeSheet.getRange("G22").setValue(gameIdJSON['info']["participants"][i]["summonerName"]);
        codeSheet.getRange("G23").setValue(kda);
        codeSheet.getRange("G24").setValue(minions_killed + " CS");
      } else if (i === 3) {
        var outputr = 6;
        var outputc = 26;
        codeSheet.getRange("G27").setValue(gameIdJSON['info']["participants"][i]["summonerName"]);
        codeSheet.getRange("G28").setValue(kda);
        codeSheet.getRange("G29").setValue(minions_killed + " CS");
      } else if (i === 4) {
        var outputr = 6;
        var outputc = 31;
        codeSheet.getRange("G32").setValue(gameIdJSON['info']["participants"][i]["summonerName"]);
        codeSheet.getRange("G33").setValue(kda);
        codeSheet.getRange("G34").setValue(minions_killed + " CS");
      } else if (i === 5) {
        var outputr = 8;
        var outputc = 11;
        codeSheet.getRange("I12").setValue(gameIdJSON['info']["participants"][i]["summonerName"]);
        codeSheet.getRange("I13").setValue(kda);
        codeSheet.getRange("I14").setValue(minions_killed + " CS");
      } else if (i === 6) {
        var outputr = 8;
        var outputc = 16;
        codeSheet.getRange("I17").setValue(gameIdJSON['info']["participants"][i]["summonerName"]);
        codeSheet.getRange("I18").setValue(kda);
        codeSheet.getRange("I19").setValue(minions_killed + " CS");
      } else if (i === 7) {
        var outputr = 8;
        var outputc = 21;
        codeSheet.getRange("I22").setValue(gameIdJSON['info']["participants"][i]["summonerName"]);
        codeSheet.getRange("I23").setValue(kda);
        codeSheet.getRange("I24").setValue(minions_killed + " CS");
      } else if (i === 8) {
        var outputr = 8;
        var outputc = 26;
        codeSheet.getRange("I27").setValue(gameIdJSON['info']["participants"][i]["summonerName"]);
        codeSheet.getRange("I28").setValue(kda);
        codeSheet.getRange("I29").setValue(minions_killed + " CS");
      } else if (i === 9) {
        var outputr = 8;
        var outputc = 31;
        codeSheet.getRange("I32").setValue(gameIdJSON['info']["participants"][i]["summonerName"]);
        codeSheet.getRange("I33").setValue(kda);
        codeSheet.getRange("I34").setValue(minions_killed + " CS");
      } 
  
  
      codeSheet.insertImage(blob, outputr, outputc);
  
    }
  
    codeSheet.getRange("A4:B13").setValues(dmg_chart);
  
    if (gameIdJSON['info']["participants"][0]["win"] === true) {
      codeSheet.getRange("F10").setValue("Victory").setFontColor("#4A86E8");
      codeSheet.getRange("H10").setValue("Defeat").setFontColor("#FF0000");
    } else {
      codeSheet.getRange("F10").setValue("Defeat").setFontColor("#FF0000");
      codeSheet.getRange("H10").setValue("Victory").setFontColor("#4A86E8");
    }
    
  }