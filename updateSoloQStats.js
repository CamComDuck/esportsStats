function updateSoloQStats() {
    var primTeamsURL = "https://docs.google.com/spreadsheets/d/1lQ1ObK2DR70OYYC1gUt2qkBJX24RxNBTXA01dWCiwX4/";
    var goldTeamsURL = "https://docs.google.com/spreadsheets/d/1TkUyieTa1Ngl66gOwQTpkMi-OdZOHo68uQI6weGcXvA/";
    var diaTeamsURL = "https://docs.google.com/spreadsheets/d/1Zi4P6-oikiZ8p7DJBVIQJ22DB3e-CgNX_8djFbdpvlk/"
    var primTeamsList = getPlatTeams();
    var goldTeamsList = getGoldTeams();
    var diaTeamsList = getDiaTeams();
    var apiKey = getApiKey();
  
    var ui = SpreadsheetApp.getUi();
    var user_question = ui.prompt('Which league?', 'Prim or Gold or Dia', ui.ButtonSet.OK);
    // Process the user's response.
    if (user_question.getSelectedButton() == ui.Button.OK) {
      var user_input = user_question.getResponseText().toUpperCase();
      if (!(user_input === "PRIM" || user_input === "GOLD" || user_input === "DIA")) {
        return SpreadsheetApp.getUi().alert("You didn't input a valid league");
      }
    } else { return; }
  
    if (user_input === "GOLD") {
      for (var i = 0; i < goldTeamsList.length; i++) {
      var currentTeam = SpreadsheetApp.openByUrl(goldTeamsURL).getSheetByName(goldTeamsList[i]);
      var summonerFullList = currentTeam.getRange("F2:F8").getValues();
  
      for (var o = 0; o < summonerFullList.length; o++) {
        var summonerName = summonerFullList[o];
        var api_call1 = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ summonerName + "?api_key=" + apiKey;
        var summonerObject = api_call(api_call1);
  
        if(summonerObject != "Error"){
  
          // API Call w/ Information from the Summoner API Call
  
          var api_call2 = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + summonerObject["id"] + "?api_key=" + apiKey
          var rankedObject = api_call(api_call2);
          
          var tier = "Unranked";
          var division = "";
  
          for (var queue in rankedObject){
            if (rankedObject[queue]['queueType']=="RANKED_SOLO_5x5"){
  
              tier = (rankedObject[queue]['tier']).charAt(0) + (rankedObject[queue]['tier']).slice(1).toLowerCase();
              rank = rankedObject[queue]['rank']
              switch (rank){
                case "I":	division = 1;	break;
                case "II":	division = 2;	break;
                case "III":	division = 3;	break;
                case "IV":	division = 4;	break;
              }
            }
          }
  
          var outputValue = tier + " " + division
          var currentCol = "I" + (parseInt(o) + 2);
          currentTeam.getRange(currentCol).setValue(outputValue);
          
        } else {
          var outputValue = tier + " " + division
          var currentCol = "I" + (parseInt(o) + 2);
          currentTeam.getRange(currentCol).clearContent();
        }
  
      }
      }
    } else if (user_input === "PRIM"){
      for (var i = 0; i < primTeamsList.length; i++) {
      var currentTeam = SpreadsheetApp.openByUrl(primTeamsURL).getSheetByName(primTeamsList[i]);
      var summonerFullList = currentTeam.getRange("F2:F8").getValues();
  
      for (var o = 0; o < summonerFullList.length; o++) {
        var summonerName = summonerFullList[o];
        var api_call1 = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ summonerName + "?api_key=" + apiKey;
        var summonerObject = api_call(api_call1);
  
        if(summonerObject != "Error"){
  
          // API Call w/ Information from the Summoner API Call
  
          var api_call2 = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + summonerObject["id"] + "?api_key=" + apiKey
          var rankedObject = api_call(api_call2);
          
          var tier = "Unranked";
          var division = "";
  
          for (var queue in rankedObject){
            if (rankedObject[queue]['queueType']=="RANKED_SOLO_5x5"){
  
              tier = (rankedObject[queue]['tier']).charAt(0) + (rankedObject[queue]['tier']).slice(1).toLowerCase();
              rank = rankedObject[queue]['rank']
              switch (rank){
                case "I":	division = 1;	break;
                case "II":	division = 2;	break;
                case "III":	division = 3;	break;
                case "IV":	division = 4;	break;
              }
            }
          }
  
          var outputValue = tier + " " + division
          var currentCol = "I" + (parseInt(o) + 2);
          currentTeam.getRange(currentCol).setValue(outputValue);
          
        } else {
          var outputValue = tier + " " + division
          var currentCol = "I" + (parseInt(o) + 2);
          currentTeam.getRange(currentCol).clearContent();
        }
  
      }
    }
    } else if (user_input === "DIA"){
      for (var i = 0; i < diaTeamsList.length; i++) {
      var currentTeam = SpreadsheetApp.openByUrl(diaTeamsURL).getSheetByName(diaTeamsList[i]);
      var summonerFullList = currentTeam.getRange("F2:F8").getValues();
  
      for (var o = 0; o < summonerFullList.length; o++) {
        var summonerName = summonerFullList[o];
        var api_call1 = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+ summonerName + "?api_key=" + apiKey;
        var summonerObject = api_call(api_call1);
  
        if(summonerObject != "Error"){
  
          // API Call w/ Information from the Summoner API Call
  
          var api_call2 = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + summonerObject["id"] + "?api_key=" + apiKey
          var rankedObject = api_call(api_call2);
          
          var tier = "Unranked";
          var division = "";
  
          for (var queue in rankedObject){
            if (rankedObject[queue]['queueType']=="RANKED_SOLO_5x5"){
  
              tier = (rankedObject[queue]['tier']).charAt(0) + (rankedObject[queue]['tier']).slice(1).toLowerCase();
              rank = rankedObject[queue]['rank']
              switch (rank){
                case "I":	division = 1;	break;
                case "II":	division = 2;	break;
                case "III":	division = 3;	break;
                case "IV":	division = 4;	break;
              }
            }
          }
  
          var outputValue = tier + " " + division
          var currentCol = "I" + (parseInt(o) + 2);
          currentTeam.getRange(currentCol).setValue(outputValue);
          
        } else {
          var outputValue = tier + " " + division
          var currentCol = "I" + (parseInt(o) + 2);
          currentTeam.getRange(currentCol).clearContent();
        }
  
      }
    }
    }
    
  }
  