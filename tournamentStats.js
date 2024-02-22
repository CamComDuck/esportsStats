function tournamentStats() {
    var codeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Log');
    var gameID_fullArray = codeSheet.getRange(2,3,codeSheet.getLastRow(),1).getValues();
    var tournID_fullArray = codeSheet.getRange(2,7,codeSheet.getLastRow(),1).getValues();
    var teamNames_fullArray = codeSheet.getRange(2,5,codeSheet.getLastRow(),2).getValues();
    var dates_fullArray = codeSheet.getRange(2,1,codeSheet.getLastRow(),1).getValues();
    
    
    var ui = SpreadsheetApp.getUi();
    var user_question = ui.prompt('Which league?', 'Egg/Duckling/Fear OR Gold/Plat/Dia', ui.ButtonSet.OK);
    // Process the user's response.
    if (user_question.getSelectedButton() == ui.Button.OK) {
      var user_input = user_question.getResponseText().toUpperCase();
      if (user_input === "GOLD") {
        var primURL = "https://docs.google.com/spreadsheets/d/14VoJC13n5xUEsS7880ZFNItvAecBvKewfLh6LUOqjNY/";
        var primStats = SpreadsheetApp.openByUrl(primURL).getSheetByName("Top 10 Stats");
        var primStandings = SpreadsheetApp.openByUrl(primURL).getSheetByName("Standings");
        var primTeamStats = SpreadsheetApp.openByUrl(primURL).getSheetByName("Team Stats");
        var primPlayerChamps = SpreadsheetApp.openByUrl(primURL).getSheetByName("Unique Champs");
      } else if (user_input === "PLAT") {
        var primURL = "https://docs.google.com/spreadsheets/d/1GeO0HGPlJa7Z-MzxMWKJ66a42y1U44jzS45TnnAjsKs/";
        var primStats = SpreadsheetApp.openByUrl(primURL).getSheetByName("Top 10 Stats");
        var primStandings = SpreadsheetApp.openByUrl(primURL).getSheetByName("Standings");
        var primTeamStats = SpreadsheetApp.openByUrl(primURL).getSheetByName("Team Stats");
        var primPlayerChamps = SpreadsheetApp.openByUrl(primURL).getSheetByName("Unique Champs");
      } else if (user_input === "DIA") {
        var primURL = "https://docs.google.com/spreadsheets/d/1zfN-z0ZMMxY2ZvkEsF3TQF7rkcsDgXfUnJC6HCG1w98/";
        var primStats = SpreadsheetApp.openByUrl(primURL).getSheetByName("Top 10 Stats");
        var primStandings = SpreadsheetApp.openByUrl(primURL).getSheetByName("Standings");
        var primTeamStats = SpreadsheetApp.openByUrl(primURL).getSheetByName("Team Stats");
        var primPlayerChamps = SpreadsheetApp.openByUrl(primURL).getSheetByName("Unique Champs");
      } else if (user_input === "EGG") {
        var primURL = "https://docs.google.com/spreadsheets/d/11gfHCHfOxmb3_ypZx87PW9qcwCVJePqtVChqA5QS7EA/";
        var primStats = SpreadsheetApp.openByUrl(primURL).getSheetByName("Top 10 Stats");
        var primStandings = SpreadsheetApp.openByUrl(primURL).getSheetByName("Standings");
        var primTeamStats = SpreadsheetApp.openByUrl(primURL).getSheetByName("Team Stats");
        var primPlayerChamps = SpreadsheetApp.openByUrl(primURL).getSheetByName("Unique Champs");
        var primPB = SpreadsheetApp.openByUrl(primURL).getSheetByName("PB");
      } else if (user_input === "DUCKLING") {
        var primURL = "https://docs.google.com/spreadsheets/d/1cdS89RvrY_qJUrsDCkoP56gXYXvRWfKxUGjGKyNYmnc/";
        var primStats = SpreadsheetApp.openByUrl(primURL).getSheetByName("Top 10 Stats");
        var primStandings = SpreadsheetApp.openByUrl(primURL).getSheetByName("Standings");
        var primTeamStats = SpreadsheetApp.openByUrl(primURL).getSheetByName("Team Stats");
        var primPlayerChamps = SpreadsheetApp.openByUrl(primURL).getSheetByName("Unique Champs");
        var primPB = SpreadsheetApp.openByUrl(primURL).getSheetByName("PB");
      } else if (user_input === "FEAR") {
        var primURL = "https://docs.google.com/spreadsheets/d/1Afu7TITLb-dpp_QLPBC96j5qHuZPUo1TxY-lqF_oRHw/";
    var primStats = SpreadsheetApp.openByUrl(primURL).getSheetByName("Top 10 Stats");
    var primStandings = SpreadsheetApp.openByUrl(primURL).getSheetByName("Standings");
    var primTeamStats = SpreadsheetApp.openByUrl(primURL).getSheetByName("Team Stats");
    var primPlayerChamps = SpreadsheetApp.openByUrl(primURL).getSheetByName("Unique Champs");
    var primPB = SpreadsheetApp.openByUrl(primURL).getSheetByName("PB");
      } 
    } else { return SpreadsheetApp.getUi().alert("You didn't input a valid league"); }  
  
    var versions_full = api_call("https://ddragon.leagueoflegends.com/api/versions.json");
    var items_api_list_full = api_call("http://ddragon.leagueoflegends.com/cdn/"+versions_full[0]+"/data/en_US/item.json");
    var champ_api_list_full = api_call("http://ddragon.leagueoflegends.com/cdn/"+ versions_full[0] + "/data/en_US/champion.json")
  
    var apiKey = getApiKey();
    var game_list = [];
    var champ_list = [];
    var kills_list = [];
    var deaths_list = [];
    var assists_list = [];
    var vision_list = [];
    var damage_list = [];
    var fb_list = [];
    var cs_list = [];
    var gameID_cArray = [];
    var teamName_cArray = [];
    var date_cArray = [];
    var dates_sorted = [];
    var dates_sorted = [];
    var ban_list = [];
    var heal_list = [];
    var ult_list = [];
    var flash_list = [];
    var plate_list = [];
    var scuttle_list = [];
    var skillsHit_list = [];
    var playerChamps_list = [];
  
    var teamWL_list = [];
    var teamKill_list = [];
    var teamDeath_list = [];
    var teamAssist_list = [];
    var teamGameT_list = [];
    var teamDrag_list = [];
    var teamHerald_list = [];
    var teamBaron_list = [];
    var teamTower_list = [];
    var teamBan_list = [];
    var teamPick_list = [];
  
    var item_list = [];
    var boots_list = [];
    var itemBanned_list = getNullItems();
    var bootsBanned_list = getBoots();
  
    for (var o in gameID_fullArray) {
      if (tournID_fullArray[o].toString() === user_input) {
        gameID_cArray.push(gameID_fullArray[o]);
        teamName_cArray.push(teamNames_fullArray[o]);
        date_cArray.push(dates_fullArray[o]);
      }
    }
  
    for (var i in gameID_cArray) {
      
      var current_tc = "NA1_" + gameID_cArray[i];
      var match_num = api_call("https://americas.api.riotgames.com/lol/match/v5/matches/"+ current_tc + "?api_key=" + apiKey);
      if (match_num != "Error") {
        var current_tc_info = match_num["info"];
        for (var o = 0; o < 10; o++) { // CREATE STAT AND PICK ARRAYS FOR PLAYERS
          var winloss = current_tc_info["participants"][o]["win"];
          var champNAME = current_tc_info["participants"][o]["championName"]
          if (winloss === true) {winloss = "W";} else {winloss = "L";}
          if (champNAME === "MonkeyKing") champNAME = "Wukong";
  
          var player_name = current_tc_info["participants"][o]["puuid"];
          var player_nameS = current_tc_info["participants"][o]["summonerName"];
  
  
          var kda = current_tc_info["participants"][o]["kills"] + "/" + current_tc_info["participants"][o]["deaths"] + "/" + current_tc_info["participants"][o]["assists"];
          game_list.push(champNAME + "|" + winloss + "|" + kda);
  
          var game_length = current_tc_info['participants'][o]['timePlayed'];
          var game_mins = game_length/60;
  
          var vision_s = current_tc_info["participants"][o]["visionScore"];
          var vis_per_min = (vision_s/game_mins);
  
          var dmg_dealt = current_tc_info["participants"][o]["totalDamageDealtToChampions"];
          var dmg_per_min = (dmg_dealt/game_mins);
  
          var healing_urself = current_tc_info["participants"][o]["totalHeal"];
          var heal_per_min = (healing_urself/game_mins);
  
          kills_list.push(player_name +"|"+ current_tc_info["participants"][o]["kills"]);
          deaths_list.push(player_name +"|"+ current_tc_info["participants"][o]["deaths"]);
          assists_list.push(player_name +"|"+ current_tc_info["participants"][o]["assists"]);
          vision_list.push(player_name +"|"+ vis_per_min);
          damage_list.push(player_name +"|"+ dmg_per_min);
          heal_list.push(player_name + "|"+ heal_per_min);
          ult_list.push(player_name +"|"+ current_tc_info["participants"][o]["spell4Casts"]);
          plate_list.push(player_name +"|"+ current_tc_info["participants"][o]["challenges"]["turretPlatesTaken"]);
          scuttle_list.push(player_name +"|"+ current_tc_info["participants"][o]["challenges"]["scuttleCrabKills"]);
          skillsHit_list.push(player_name +"|"+ current_tc_info["participants"][o]["challenges"]["skillshotsHit"]);
          playerChamps_list.push(player_nameS+"|"+champNAME+"|"+winloss);
          
          var minions_killed = (current_tc_info["participants"][o]["totalMinionsKilled"] + current_tc_info["participants"][o]["neutralMinionsKilled"]);
          var cs_per_min = (minions_killed/game_mins);
          cs_list.push(player_name + "|" + cs_per_min);
          if (current_tc_info["participants"][o]["firstBloodKill"]) fb_list.push(player_name);
  
          if (current_tc_info["participants"][o]["summoner1Id"] === 4) flash_list.push(player_name +"|"+ current_tc_info["participants"][o]["summoner1Casts"]);
          if (current_tc_info["participants"][o]["summoner2Id"] === 4) flash_list.push(player_name +"|"+ current_tc_info["participants"][o]["summoner2Casts"]);
  
          if (o < 5) { // BLUE TEAM
            teamKill_list.push(teamName_cArray[i][0] + "|" + current_tc_info["participants"][o]["kills"]);
            teamDeath_list.push(teamName_cArray[i][0] + "|" + current_tc_info["participants"][o]["deaths"]);
            teamAssist_list.push(teamName_cArray[i][0] + "|" + current_tc_info["participants"][o]["assists"]);
  
          } else { // RED TEAM
            teamKill_list.push(teamName_cArray[i][1] + "|" + current_tc_info["participants"][o]["kills"]);
            teamDeath_list.push(teamName_cArray[i][1] + "|" + current_tc_info["participants"][o]["deaths"]);
            teamAssist_list.push(teamName_cArray[i][1] + "|" + current_tc_info["participants"][o]["assists"]);
          }
  
          for (var v = 0; v < 6; v++) { // Loop through each item
            var currentItem = item_names(current_tc_info["participants"][o]["item" + v], items_api_list_full);
            if (bootsBanned_list.indexOf(currentItem) != -1) {
              boots_list.push(currentItem);
            } else if (itemBanned_list.indexOf(currentItem) === -1) {
              item_list.push(currentItem);
            }
          }
  
        }
  
        for (var p = 0; p < 2; p++) { // CREATE STAT ARRAYS FOR TEAMS
          if (current_tc_info["teams"][p]["win"]) {
            teamWL_list.push(teamName_cArray[i][p] + "|W");
            dates_sorted.push(date_cArray[i][0] + "|" + teamName_cArray[i][p] + "|W")
          } else {
            teamWL_list.push(teamName_cArray[i][p] + "|L");
            dates_sorted.push(date_cArray[i][0] + "|" + teamName_cArray[i][p] + "|L")
          }
          
          for (var j = 0; j < 5; j++) { // CREATE BAN ARRAY
            try {
              var current_ban = champ_names(current_tc_info["teams"][p]["bans"][j]["championId"], champ_api_list_full);
            } catch (err) {
              var current_ban = "NO BAN";
            }
            
            ban_list.push(current_ban)
          }
  
          if (p === 0) {
            teamGameT_list.push(teamName_cArray[i][0] + "|" + current_tc_info["participants"][0]["timePlayed"]);
            
            for (var n = 0; n < 5; n++) {
              try {
                var champNAMET = current_tc_info["teams"][1]["bans"][n]["championId"];
                champNAMET = champ_names(champNAMET, champ_api_list_full);
              } catch (err) {
                var champNAMET = "NO BAN"
              }
              
              teamBan_list.push(teamName_cArray[i][0] + "|" + champNAMET);
              champNAMET = current_tc_info["participants"][n]["championName"];
              if (champNAMET === "MonkeyKing") champNAMET = "Wukong";
              teamPick_list.push(teamName_cArray[i][0] + "|" + champNAMET);
            }
  
          } else {
            teamGameT_list.push(teamName_cArray[i][1] + "|" + current_tc_info["participants"][6]["timePlayed"]);
  
            for (var n = 0; n < 5; n++) {
              try {
                var champNAMET = current_tc_info["teams"][0]["bans"][n]["championId"];
                champNAMET = champ_names(champNAMET, champ_api_list_full);
              } catch (err) {
                var champNAMET = "NO BAN";
              }
              
              teamBan_list.push(teamName_cArray[i][1] + "|" + champNAMET);
              champNAMET = current_tc_info["participants"][n+5]["championName"];
              if (champNAMET === "MonkeyKing") champNAMET = "Wukong";
              teamPick_list.push(teamName_cArray[i][1] + "|" + champNAMET);
            }
  
          }
          
          teamDrag_list.push(teamName_cArray[i][p] + "|" + current_tc_info["teams"][p]["objectives"]["dragon"]["kills"]);
          teamHerald_list.push(teamName_cArray[i][p] + "|" + current_tc_info["teams"][p]["objectives"]["riftHerald"]["kills"]);
          teamBaron_list.push(teamName_cArray[i][p] + "|" + current_tc_info["teams"][p]["objectives"]["baron"]["kills"]);
          teamTower_list.push(teamName_cArray[i][p] + "|" + current_tc_info["teams"][p]["objectives"]["tower"]["kills"]);
  
        }
      } else if (gameID_cArray[i][0] === "FF") {
        dates_sorted.push(date_cArray[i][0] + "|" + teamName_cArray[i][0] + "|F")
        dates_sorted.push(date_cArray[i][0] + "|" + teamName_cArray[i][1] + "|W")
      } else if (gameID_cArray[i][0] === "WIN") {
        dates_sorted.push(date_cArray[i][0] + "|" + teamName_cArray[i][0] + "|W")
        dates_sorted.push(date_cArray[i][0] + "|" + teamName_cArray[i][1] + "|L")
      }
    }
  
    // TOP 10 : COLUMN B - COLUMN F \\
    
    var champ_list = getChampCounterArray(game_list);
    var picked_champs = getChampSortedArray(champ_list);
    var fChampList = getCFinalArray(picked_champs);
    primStats.getRange("C5:F14").setValues(fChampList);
  
    var ban_list_f = getBanCountingArray(ban_list);
    var fBanList = getCFinalArray(ban_list_f);
    primStats.getRange("C18:D27").setValues(fBanList);
  
    var game_num = (game_list.length)/10
    var pickbans = matchpb(picked_champs, ban_list_f, game_num);
    primPB.getRange(3,2,primPB.getLastRow(),primPB.getLastColumn()).clearContent();
    primPB.getRange(3, 2, pickbans.length, 6).setValues(pickbans);
  
    
    var fb_list_f = getBanCountingArray(fb_list);
    var fFBList = getCFinalArray(fb_list_f, "FB");
    primStats.getRange("E18:F27").setValues(fFBList);
    
    var items_list_f = getBanCountingArray(item_list);
    var fItemsList = getCFinalArray(items_list_f);
    primStats.getRange("B31:C40").setValues(fItemsList);
  
    var boots_list_f = getBanCountingArray(boots_list);
    var fBootsList = getCFinalArray(boots_list_f);
    primStats.getRange(31, 5, fBootsList.length, 2).setValues(fBootsList);
    
    // TOP 10 : COLUMN H - COLUMN U \\
    
    var fKillList = getBasicOutput(kills_list, "NONE");
    primStats.getRange("I5:K14").setValues(fKillList);
  
    var fAssistsList = getBasicOutput(assists_list, "NONE");
    primStats.getRange("N5:P14").setValues(fAssistsList);
  
    var fDeathList = getBasicOutput(deaths_list, "REVERSE");
    primStats.getRange("S5:U14").setValues(fDeathList);
  
    var fCSList = getBasicOutput(cs_list, "NONE");
    primStats.getRange("I18:K27").setValues(fCSList);
  
    var fDMGList = getBasicOutput(damage_list, "NONE");
    primStats.getRange("N18:P27").setValues(fDMGList);
  
    var fVisionList = getBasicOutput(vision_list, "NONE");
    primStats.getRange("S18:U27").setValues(fVisionList);
  
    var fHealList = getBasicOutput(heal_list, "NONE");
    primStats.getRange("I31:K40").setValues(fHealList);
  
    var fUltList = getBasicOutput(ult_list, "NONE");
    primStats.getRange("N31:P40").setValues(fUltList);
    
    var fFlashList = getBasicOutput(flash_list, "NONE");
    primStats.getRange("S31:U40").setValues(fFlashList);
    
    var fPlatesList = getBasicOutput(plate_list, "NONE");
    primStats.getRange("I44:K53").setValues(fPlatesList);
    
    var fScuttlesList = getBasicOutput(scuttle_list, "NONE");
    primStats.getRange("N44:P53").setValues(fScuttlesList);
  
    var fSkillsHitList = getBasicOutput(skillsHit_list, "NONE");
    primStats.getRange("S44:U53").setValues(fSkillsHitList);
    
    
    // STANDINGS : ALL \\
    
    var dates_sorted2 = getTeamSeriesDatesCounter(dates_sorted);
    var dates_sorted3 = createTeamPointsArray(dates_sorted2);
    
    if (user_input === "PLAT") var teamSheet = "https://docs.google.com/spreadsheets/d/1lQ1ObK2DR70OYYC1gUt2qkBJX24RxNBTXA01dWCiwX4/";
    if (user_input === "GOLD") var teamSheet = "https://docs.google.com/spreadsheets/d/1TkUyieTa1Ngl66gOwQTpkMi-OdZOHo68uQI6weGcXvA/";
    if (user_input === "DIA") var teamSheet = "https://docs.google.com/spreadsheets/d/1Zi4P6-oikiZ8p7DJBVIQJ22DB3e-CgNX_8djFbdpvlk/";
  
    for (var i = 0; i < dates_sorted3.length; i++) {
      var current_teamINFO = dates_sorted3[i].split("|");
      var currentTeam = SpreadsheetApp.openByUrl(teamSheet).getSheetByName(current_teamINFO[0]);
      currentTeam.getRange("B7").setValue("SERIES: " + current_teamINFO[1]);
      currentTeam.getRange("C7").setValue("TOTAL: " + current_teamINFO[3]);
    }
    
    // TEAM STATS : ALL \\
    
    var teamKill_listF = getHalfOutput(teamKill_list, "NONE");
    var teamDeath_listF = getHalfOutput(teamDeath_list, "NONE");
    var teamAssist_listF = getHalfOutput(teamAssist_list, "NONE");
    var teamGameT_listF = getHalfOutput(teamGameT_list, "NONE");
    var teamDrag_listF = getHalfOutput(teamDrag_list, "NO AVG");
    var teamHerald_listF = getHalfOutput(teamHerald_list, "NO AVG");
    var teamBaron_listF = getHalfOutput(teamBaron_list, "NO AVG");
    var teamTower_listF = getHalfOutput(teamTower_list, "NO AVG");
  
    var fTeamStats = getTeamStatsArray(dates_sorted3, teamKill_listF, teamDeath_listF, teamAssist_listF, teamGameT_listF, teamDrag_listF, teamHerald_listF, teamBaron_listF, teamTower_listF, user_input);
    var fteamStatsA = getCCCSFinalArray(fTeamStats, user_input, "A")
    primTeamStats.getRange("C5:N12").setValues(fteamStatsA);
    
    if (user_input === "GOLD" || user_input === "PLAT") {
      var fteamStatsB = getCCCSFinalArray(fTeamStats, user_input, "B")
      primTeamStats.getRange("C16:N23").setValues(fteamStatsB);
  
      if (user_input === "GOLD") {
        var fteamStatsC = getCCCSFinalArray(fTeamStats, user_input, "C")
        primTeamStats.getRange("C27:N34").setValues(fteamStatsC);
      }
    }
    
    // UNIQUE CHAMPS \\
    
    var playerChamps_list2 = getPlayerChampCounterArray(playerChamps_list);
    var playerChamps_list3 = getPlayerChampSortedArray(playerChamps_list2);
    primPlayerChamps.getRange(4,2,primPlayerChamps.getLastRow(),primPlayerChamps.getLastColumn()).clearContent();
    for (var i = 0; i < playerChamps_list3.length; i++) {
      primPlayerChamps.getRange(i+4,2,1,playerChamps_list3[i].length).setValues([playerChamps_list3[i]]);
    }
    
    // TEAM DOC :  COLUMN O - COLUMN S \\
    
    var teamPick_list_f = getPBCountingArray(teamPick_list);
    var teamBan_list_f = getPBCountingArray(teamBan_list);
    teamPick_list_f = getSortedTPBArray(teamPick_list_f, user_input);
    teamBan_list_f = getSortedTPBArray(teamBan_list_f, user_input);
  
    createPickOutput(teamPick_list_f, user_input, "PICK");
    createPickOutput(teamBan_list_f, user_input, "BAN");
    
  }
  