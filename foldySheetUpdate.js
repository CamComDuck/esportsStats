function foldySheet() {
    var foldyURL = "https://docs.google.com/spreadsheets/d/1ZDcmwqvkcCdEvAhpJp9iD73x6uI0CF4-plzTc54oN84/";
    var primASheet = SpreadsheetApp.openByUrl(foldyURL).getSheetByName("Groups");
    var chancesFullV = primASheet.getRange(11, 2, primASheet.getLastRow()-10, primASheet.getLastColumn()-3).getValues();
    var chancesFullC = primASheet.getRange(11, 2, primASheet.getLastRow()-10, primASheet.getLastColumn()-3).getBackgroundObjects();
    var last_col = primASheet.getLastColumn();
    var current_standings = primASheet.getRange("F2:G9").getValues();
    
    for (var i in chancesFullC) {    
  
      for (var j in chancesFullC[i]) {
        if (chancesFullC[i][j].asRgbColor().asHexString() === "#00ff00") { // Win
          chancesFullV[i][j] = chancesFullV[i][j] + "|W"
        } else {
          chancesFullV[i][j] = chancesFullV[i][j] + "|L"
        }
        
      }
      var currentChanceV = chancesFullV[i];
  
      for (var m = 0; m < current_standings.length; m++) {
        var current_wl = current_standings[m][1].split("-");
        for (var b = 0; b < current_wl[0]; b++) {
          currentChanceV.push(current_standings[m][0] + "|W");
        }
        for (var b = 0; b < current_wl[1]; b++) {
          currentChanceV.push(current_standings[m][0] + "|L");
        }
      }
  
      var teamWL_f = getTeamWLCounterArray(currentChanceV);
      teamWL_f = getTeamWLSortedArray(teamWL_f);
      var outputCell = parseInt(i)+11;
  
      var team1 = teamWL_f[0].split("|");
      var team2 = teamWL_f[1].split("|");
      var team3 = teamWL_f[2].split("|");
      var team4 = teamWL_f[3].split("|");
      var team5 = teamWL_f[4].split("|");
      var team6 = teamWL_f[5].split("|");
      var team7 = teamWL_f[6].split("|");
      var team8 = teamWL_f[7].split("|");
  
      if (team1[0] === team2[0] && team2[0] === team3[0] && team3[0] === team4[0] && team4[0] === team5[0] && team5[0] === team6[0] && team6[0] === team7[0] && team7[0] === team8[0]) {
        // 8 TIED
        primASheet.getRange(outputCell, last_col, 1, 8).setBackground("#B7B7B7"); 
  
      }  else if (team1[0] === team2[0] && team2[0] === team3[0] && team3[0] === team4[0] && team4[0] === team5[0] && team5[0] != team6[0]){
        // FIRST 5 TIED ; LAST 3 OUT
        primASheet.getRange(outputCell, last_col, 1, 5).setBackground("#B7B7B7"); 
        primASheet.getRange(outputCell, last_col+5, 1, 3).setBackground("#ff0000");
  
      } else if (team2[0] === team3[0] && team3[0] === team4[0] && team4[0] === team5[0] && team5[0] != team6[0]){
        // FIRST 1 IN ; 2-5 TIED ; LAST 3 OUT
        primASheet.getRange(outputCell, last_col, 1, 1).setBackground("#00ff00"); 
        primASheet.getRange(outputCell, last_col+1, 1, 4).setBackground("#B7B7B7"); 
        primASheet.getRange(outputCell, last_col+5, 1, 3).setBackground("#ff0000");
  
      } else if (team2[0] === team3[0] && team3[0] === team4[0] && team4[0] === team5[0] && team5[0] === team6[0] && team6[0] === team7[0] && team7[0] === team8[0]){
        // FIRST 1 IN ; LAST 7 TIED
        primASheet.getRange(outputCell, last_col).setBackground("#00ff00"); 
        primASheet.getRange(outputCell, last_col+1, 1, 7).setBackground("#B7B7B7");
  
      } else if (team3[0] === team4[0] && team4[0] === team5[0] && team5[0] === team6[0] && team6[0] === team7[0] && team7[0] === team8[0]){
        // FIRST 2 IN ; LAST 6 TIED
        primASheet.getRange(outputCell, last_col, 1, 2).setBackground("#00ff00");
        primASheet.getRange(outputCell, last_col+2, 1, 6).setBackground("#B7B7B7");
  
      } else if (team3[0] === team4[0] && team4[0] === team5[0] && team5[0] != team6[0]){
        // FIRST 2 IN ; 3-5 TIED ; 6-8 OUT
        primASheet.getRange(outputCell, last_col, 1, 2).setBackground("#00ff00");
        primASheet.getRange(outputCell, last_col+2, 1, 3).setBackground("#B7B7B7");
        primASheet.getRange(outputCell, last_col+5, 1, 3).setBackground("#ff0000");
  
      }
      else if (team4[0] === team5[0] && team5[0] === team6[0] && team6[0] === team7[0] && team7[0] === team8[0]){
        // FIRST 3 IN ; LAST 5 TIED
        primASheet.getRange(outputCell, last_col, 1, 3).setBackground("#00ff00");
        primASheet.getRange(outputCell, last_col+3, 1, 5).setBackground("#B7B7B7");
  
      } else if (team4[0] === team5[0] && team5[0] === team6[0] && team6[0] != team7[0]){
        // FIRST 3 IN ; LAST 4-6 TIED ; 7-8 OUT
        primASheet.getRange(outputCell, last_col, 1, 3).setBackground("#00ff00");
        primASheet.getRange(outputCell, last_col+3, 1, 3).setBackground("#B7B7B7");
        primASheet.getRange(outputCell, last_col+6, 1, 2).setBackground("#ff0000");
  
      } else if (team4[0] === team5[0] && team5[0] === team6[0] && team6[0] === team7[0] && team7[0] != team8[0]){
        // FIRST 3 IN ; LAST 4-7 TIED ; 8 OUT
        primASheet.getRange(outputCell, last_col, 1, 3).setBackground("#00ff00");
        primASheet.getRange(outputCell, last_col+3, 1, 4).setBackground("#B7B7B7");
        primASheet.getRange(outputCell, last_col+7, 1, 1).setBackground("#ff0000");
  
      }
      else if (team4[0] === team5[0] && team5[0] === team6[0] && team6[0] === team7[0]){
        // TEAM 4 - TEAM 7 TIED
        primASheet.getRange(outputCell, last_col, 1, 3).setBackground("#00ff00");
        primASheet.getRange(outputCell, last_col+4, 1, 3).setBackground("#B7B7B7");
        primASheet.getRange(outputCell, last_col+8, 1, 1).setBackground("#ff0000");
  
      } else if (team4[0] === team5[0] && team5[0] === team6[0]){
        // TEAM 4 - TEAM 6 TIED
        primASheet.getRange(outputCell, last_col, 1, 3).setBackground("#00ff00");
        primASheet.getRange(outputCell, last_col+4, 1, 2).setBackground("#B7B7B7");
        primASheet.getRange(outputCell, last_col+7, 1, 2).setBackground("#ff0000");
  
      } else if (team4[0] === team5[0]){
        // TEAM 4 - TEAM 5 TIED
        primASheet.getRange(outputCell, last_col, 1, 3).setBackground("#00ff00");
        primASheet.getRange(outputCell, last_col+3, 1, 2).setBackground("#B7B7B7");
        primASheet.getRange(outputCell, last_col+5, 1, 3).setBackground("#ff0000");
  
      } else {
        // NONE TIED
        primASheet.getRange(outputCell, last_col, 1, 4).setBackground("#00ff00");
        primASheet.getRange(outputCell, last_col+4, 1, 4).setBackground("#ff0000");
      }
  
      var outputStandings = [];
      var outputStandings2 = [];
      for (var b = 0; b < teamWL_f.length; b++) {
        var bSPLIT = teamWL_f[b].split("|");
        var bOUTPUT = bSPLIT[0] + "-" + bSPLIT[1] + " | " + bSPLIT[2];
        outputStandings.push(bOUTPUT);
      }
      outputStandings2.push(outputStandings);
      primASheet.getRange("M"+outputCell+":T"+outputCell).setValues(outputStandings2);
  
    }
    
  
  
    var percentFullV = primASheet.getRange(11, last_col, primASheet.getLastRow()-10, 8).getValues();
    var percentFullC = primASheet.getRange(11, last_col, primASheet.getLastRow()-10, 8).getBackgroundObjects();
    var fullCounter = [];
  
    for (var i in percentFullC) {
      for (var j in percentFullC[i]) {
        var percentSPLIT = percentFullV[i][j].split(" | ")
        if (percentFullC[i][j].asRgbColor().asHexString() === "#00ff00") { // Win
          fullCounter.push(percentSPLIT[1] + "|W")
        } else if (percentFullC[i][j].asRgbColor().asHexString() === "#ff0000") { // Loss
          fullCounter.push(percentSPLIT[1] + "|L")
        } else { // Tie
          fullCounter.push(percentSPLIT[1] + "|T")
        }
      }
      
    }
    fullCounter.sort();
    var counterAfter = getTeamWLCounterArrayTies(fullCounter);
    var counterAfter2 = getTeamWLSortedArrayTies(counterAfter);
    var counterOUTPUT2 = [];
    for (var i in counterAfter2) {
      var counterSPLIT = counterAfter2[i].split("|");
      var divider =32; 
      var outputWINS = ((parseInt(counterSPLIT[0])/divider)*100).toFixed(2) + "%";
      var outputLOSSES = ((parseInt(counterSPLIT[1])/divider)*100).toFixed(2)+ "%";
      var outputTIES = ((parseInt(counterSPLIT[2])/divider)*100).toFixed(2)+ "%";
      var counterOUTPUT = [counterSPLIT[3], outputWINS, outputLOSSES, outputTIES]
      counterOUTPUT2.push(counterOUTPUT);
    }
    primASheet.getRange("B2:E9").setValues(counterOUTPUT2);
  }
  
  // #ff0000 RED (OUT)
  // #00ff00 GREEN (IN)
  // #B7B7B7 GRAY (TIED)
  
  // #696880 DARK GRAY (BYE LOCK)
  // #7C6E7F MED GRAY (BYE TIE)
  
function foldySheetTop6() {
    var foldyURL = "https://docs.google.com/spreadsheets/d/16VIMlbqwu0cbd-7UcqZNRO56zhB_DAfTA94mbiBXEWo/";
    var primASheet = SpreadsheetApp.openByUrl(foldyURL).getSheetByName("Hextech [P]");
    var chancesFullV = primASheet.getRange(11, 2, primASheet.getLastRow()-10, primASheet.getLastColumn()-3).getValues();
    var chancesFullC = primASheet.getRange(11, 2, primASheet.getLastRow()-10, primASheet.getLastColumn()-3).getBackgroundObjects();
    var last_col = primASheet.getLastColumn();
    var current_standings = primASheet.getRange("H2:I9").getValues();
  
    
    for (var i in chancesFullC) { // Loop through schedule
  
      for (var j in chancesFullC[i]) { // Count future win/loss
        if (chancesFullC[i][j].asRgbColor().asHexString() === "#00ff00") { // Win
          chancesFullV[i][j] = chancesFullV[i][j] + "|W"
        } else {
          chancesFullV[i][j] = chancesFullV[i][j] + "|L"
        }
        
      }
      var currentChanceV = chancesFullV[i];
  
      for (var m = 0; m < current_standings.length; m++) { // Count past win/loss
        var current_wl = current_standings[m][1].split("-");
        for (var b = 0; b < current_wl[0]; b++) {
          currentChanceV.push(current_standings[m][0] + "|W");
        }
        for (var b = 0; b < current_wl[1]; b++) {
          currentChanceV.push(current_standings[m][0] + "|L");
        }
      }
  
  
      // Count standings for this scenario
      var teamWL_f = getTeamWLCounterArray(currentChanceV);
      teamWL_f = getTeamWLSortedArray(teamWL_f);
      var outputCell = parseInt(i)+11;
  
      var team1 = teamWL_f[0].split("|");
      var team2 = teamWL_f[1].split("|");
      var team3 = teamWL_f[2].split("|");
      var team4 = teamWL_f[3].split("|");
      var team5 = teamWL_f[4].split("|");
      var team6 = teamWL_f[5].split("|");
      var team7 = teamWL_f[6].split("|");
      var team8 = teamWL_f[7].split("|");
  
  
      // Determine tiebreakers
      if (team1[0] === team2[0] && team2[0] === team3[0] && team3[0] === team4[0] && team4[0] === team5[0] && team5[0] === team6[0] && team6[0] === team7[0] && team7[0] === team8[0]) {
        // 8 TIED
        primASheet.getRange(outputCell, last_col, 1, 8).setBackground("#B7B7B7"); 
  
      }  else if (team1[0] != team2[0] && team2[0] === team3[0] && team3[0] === team4[0] && team4[0] === team5[0] && team5[0] === team6[0] && team6[0] === team7[0] && team7[0] != team8[0]){
        // 2-7 TIED
        primASheet.getRange(outputCell, last_col, 1, 1).setBackground("#00ff00"); 
        primASheet.getRange(outputCell, last_col+1, 1, 6).setBackground("#B7B7B7"); 
        primASheet.getRange(outputCell, last_col+7, 1, 1).setBackground("#ff0000");
  
      } else if (team1[0] != team2[0] &&team2[0] === team3[0] && team3[0] === team4[0] && team4[0] === team5[0] && team5[0] === team6[0] && team6[0] === team7[0] && team7[0] != team8[0]){
        // 2-8 TIED
        primASheet.getRange(outputCell, last_col, 1, 1).setBackground("#00ff00"); 
        primASheet.getRange(outputCell, last_col+1, 1, 7).setBackground("#B7B7B7"); 
  
      } else if (team2[0] != team3[0] && team3[0] === team4[0] && team4[0] === team5[0] && team5[0] === team6[0] && team6[0] === team7[0] && team7[0] != team8[0]){
        // 3-7 TIED
        primASheet.getRange(outputCell, last_col, 1, 2).setBackground("#00ff00"); 
        primASheet.getRange(outputCell, last_col+2, 1, 5).setBackground("#B7B7B7");
        primASheet.getRange(outputCell, last_col+7, 1, 1).setBackground("#ff0000");
  
      } else if (team2[0] != team3[0] && team3[0] === team4[0] && team4[0] === team5[0] && team5[0] === team6[0] && team6[0] === team7[0] && team7[0] === team8[0]){
        // 3-8 TIED
        primASheet.getRange(outputCell, last_col, 1, 2).setBackground("#00ff00"); 
        primASheet.getRange(outputCell, last_col+2, 1, 6).setBackground("#B7B7B7");
  
      } else if (team3[0] != team4[0] && team4[0] === team5[0] && team5[0] === team6[0] && team6[0] === team7[0] && team7[0] != team8[0]){
        // 4-7 TIED
        primASheet.getRange(outputCell, last_col, 1, 3).setBackground("#00ff00"); 
        primASheet.getRange(outputCell, last_col+3, 1, 4).setBackground("#B7B7B7");
        primASheet.getRange(outputCell, last_col+7, 1, 1).setBackground("#ff0000");
  
      } else if (team3[0] != team4[0] && team4[0] === team5[0] && team5[0] === team6[0] && team6[0] === team7[0] && team7[0] === team8[0]){
        // 4-8 TIED
        primASheet.getRange(outputCell, last_col, 1, 3).setBackground("#00ff00"); 
        primASheet.getRange(outputCell, last_col+3, 1, 5).setBackground("#B7B7B7");
  
      } else if (team4[0] != team5[0] && team5[0] === team6[0] && team6[0] === team7[0] && team7[0] != team8[0]){
        // 5-7 TIED
        primASheet.getRange(outputCell, last_col, 1, 4).setBackground("#00ff00"); 
        primASheet.getRange(outputCell, last_col+4, 1, 3).setBackground("#B7B7B7");
        primASheet.getRange(outputCell, last_col+7, 1, 1).setBackground("#ff0000");
  
      } else if (team4[0] != team5[0] && team5[0] === team6[0] && team6[0] === team7[0] && team7[0] === team8[0]){
        // 5-8 TIED
        primASheet.getRange(outputCell, last_col, 1, 4).setBackground("#00ff00"); 
        primASheet.getRange(outputCell, last_col+4, 1, 4).setBackground("#B7B7B7"); 
  
      } else if (team5[0] != team6[0] && team6[0] === team7[0] && team7[0] != team8[0]){
        // 6-7 TIED
        primASheet.getRange(outputCell, last_col, 1, 5).setBackground("#00ff00"); 
        primASheet.getRange(outputCell, last_col+5, 1, 2).setBackground("#B7B7B7"); 
        primASheet.getRange(outputCell, last_col+7, 1, 1).setBackground("#ff0000");
  
      } else if (team5[0] != team6[0] && team6[0] === team7[0] && team7[0] === team8[0]){
        // 6-8 TIED
        primASheet.getRange(outputCell, last_col, 1, 5).setBackground("#00ff00"); 
        primASheet.getRange(outputCell, last_col+5, 1, 3).setBackground("#B7B7B7"); 
  
      } else {
        // NONE TIED
        primASheet.getRange(outputCell, last_col, 1, 6).setBackground("#00ff00");
        primASheet.getRange(outputCell, last_col+6, 1, 2).setBackground("#ff0000");
  
      }
      
      if (team2[0] != team3[0]){
        // BYE LOCK
        primASheet.getRange(outputCell, last_col, 1, 2).setBackground("#696880"); 
      } else if (team1[0] === team2[0] && team2[0] === team3[0]){
        // BYE TIE 1-3
        primASheet.getRange(outputCell, last_col, 1, 3).setBackground("#7C6E7F"); 
      } else if (team2[0] === team3[0] && team3[0] != team4[0]){
        // BYE TIE 2-3
        primASheet.getRange(outputCell, last_col, 1, 1).setBackground("#696880"); 
        primASheet.getRange(outputCell, last_col+1, 1, 2).setBackground("#7C6E7F"); 
      } else if (team1[0] === team2[0] && team2[0] === team3[0] && team3[0] === team4[0] && team4[0] != team5[0]){
        // BYE TIE 1-4
        primASheet.getRange(outputCell, last_col, 1, 4).setBackground("#7C6E7F"); 
      } else if (team1[0] != team2[0] && team2[0] === team3[0] && team3[0] === team4[0] && team4[0] != team5[0]){
        // BYE TIE 2-4
        primASheet.getRange(outputCell, last_col, 1, 1).setBackground("#696880"); 
        primASheet.getRange(outputCell, last_col+1, 1, 3).setBackground("#7C6E7F"); 
      } else if (team1[0] === team2[0] && team2[0] === team3[0] && team3[0] === team4[0] && team4[0] === team5[0] && team5[0] != team6[0]){
        // BYE TIE 1-5
        primASheet.getRange(outputCell, last_col, 1, 5).setBackground("#7C6E7F"); 
      } else if (team1[0] != team2[0] && team2[0] === team3[0] && team3[0] === team4[0] && team4[0] === team5[0] && team5[0] != team6[0]){
        // BYE TIE 2-5
        primASheet.getRange(outputCell, last_col, 1, 1).setBackground("#696880"); 
        primASheet.getRange(outputCell, last_col+1, 1, 4).setBackground("#7C6E7F"); 
      } else if (team1[0] === team2[0] && team2[0] === team3[0] && team3[0] === team4[0] && team4[0] === team5[0] && team5[0] === team6[0] && team6[0] != team7[0]){
        // BYE TIE 1-6
        primASheet.getRange(outputCell, last_col, 1, 6).setBackground("#7C6E7F"); 
      } else if (team1[0] != team2[0] && team2[0] === team3[0] && team3[0] === team4[0] && team4[0] === team5[0] && team5[0] === team6[0] && team6[0] != team7[0]){
        // BYE TIE 2-6
        primASheet.getRange(outputCell, last_col, 1, 1).setBackground("#696880"); 
        primASheet.getRange(outputCell, last_col+1, 1, 5).setBackground("#7C6E7F"); 
      }
      
      
      
      var outputStandings = [];
      var outputStandings2 = [];
      for (var b = 0; b < teamWL_f.length; b++) {
        var bSPLIT = teamWL_f[b].split("|");
        var bOUTPUT = bSPLIT[0] + "-" + bSPLIT[1] + " | " + bSPLIT[2];
        outputStandings.push(bOUTPUT);
      }
      outputStandings2.push(outputStandings);
      primASheet.getRange("K"+outputCell+":R"+outputCell).setValues(outputStandings2);
    
    }
    
  
    
    var percentFullV = primASheet.getRange(11, last_col-7, primASheet.getLastRow()-10, 8).getValues();
    var percentFullC = primASheet.getRange(11, last_col-7, primASheet.getLastRow()-10, 8).getBackgroundObjects();
    var fullCounter = [];
  
    for (var i in percentFullC) { // Count total win/loss/tie
      for (var j in percentFullC[i]) {
        var percentSPLIT = percentFullV[i][j].split(" | ")
        if (percentFullC[i][j].asRgbColor().asHexString() === "#00ff00") { // Win
          fullCounter.push(percentSPLIT[1] + "|W")
        } else if (percentFullC[i][j].asRgbColor().asHexString() === "#ff0000") { // Loss
          fullCounter.push(percentSPLIT[1] + "|L")
        } else if (percentFullC[i][j].asRgbColor().asHexString() === "#696880") { // Bye Lock
          fullCounter.push(percentSPLIT[1] + "|BL")
        } else if (percentFullC[i][j].asRgbColor().asHexString() === "#7C6E7F") { // Bye Tie
          fullCounter.push(percentSPLIT[1] + "|BT")
        } else { // Tie
          fullCounter.push(percentSPLIT[1] + "|T")
        }
      }
    }
  
    fullCounter.sort();
    var counterAfter = getTeamWLCounterArrayTies(fullCounter);
    var counterAfter2 = getTeamWLSortedArrayTies(counterAfter);
    var counterOUTPUT2 = [];
  
    for (var i in counterAfter2) { // Create output array
      var counterSPLIT = counterAfter2[i].split("|");
      var divider = 8; 
      var outputWINS = ((parseInt(counterSPLIT[0])/divider)*100).toFixed(2) + "%";
      var outputLOSSES = ((parseInt(counterSPLIT[1])/divider)*100).toFixed(2)+ "%";
      var outputTIES = ((parseInt(counterSPLIT[2])/divider)*100).toFixed(2)+ "%";
      var outputBL = ((parseInt(counterSPLIT[0])/divider)*100).toFixed(2)+ "%";
      var outputBT = ((parseInt(counterSPLIT[2])/divider)*100).toFixed(2)+ "%";
      var counterOUTPUT = [counterSPLIT[3], outputWINS, outputLOSSES, outputTIES]
      counterOUTPUT2.push(counterOUTPUT);
    }
    primASheet.getRange("B2:E9").setValues(counterOUTPUT2);
  }
  
  function foldySheet6Teams() {
    var foldyURL = "https://docs.google.com/spreadsheets/d/1Vyyb82C4fKa0V97OPMbf-JOssIUXY00jyoJlckeHsp0/";
    var primASheet = SpreadsheetApp.openByUrl(foldyURL).getSheetByName("VRD");
    var chancesFullV = primASheet.getRange(9, 2, primASheet.getLastRow()-8, primASheet.getLastColumn()-3).getValues();
    var chancesFullC = primASheet.getRange(9, 2, primASheet.getLastRow()-8, primASheet.getLastColumn()-3).getBackgroundObjects();
    var last_col = primASheet.getLastColumn();
    var current_standings = primASheet.getRange("F2:G7").getValues();
    
    for (var i in chancesFullC) {    
  
      for (var j in chancesFullC[i]) {
        if (chancesFullC[i][j].asRgbColor().asHexString() === "#00ff00") { // Win
          chancesFullV[i][j] = chancesFullV[i][j] + "|W"
        } else {
          chancesFullV[i][j] = chancesFullV[i][j] + "|L"
        }
        
      }
      var currentChanceV = chancesFullV[i];
  
      for (var m = 0; m < current_standings.length; m++) {
        var current_wl = current_standings[m][1].split("-");
        for (var b = 0; b < current_wl[0]; b++) {
          currentChanceV.push(current_standings[m][0] + "|W");
        }
        for (var b = 0; b < current_wl[1]; b++) {
          currentChanceV.push(current_standings[m][0] + "|L");
        }
      }
  
      var teamWL_f = getTeamWLCounterArray(currentChanceV);
      teamWL_f = getTeamWLSortedArray(teamWL_f);
      var outputCell = parseInt(i)+9;
  
      var team1 = teamWL_f[0].split("|");
      var team2 = teamWL_f[1].split("|");
      var team3 = teamWL_f[2].split("|");
      var team4 = teamWL_f[3].split("|");
      var team5 = teamWL_f[4].split("|");
      var team6 = teamWL_f[5].split("|");
  
      if (team1[0] === team2[0] && team2[0] === team3[0] && team3[0] === team4[0] && team4[0] === team5[0] && team5[0] === team6[0]) {
        // 1-6 TIED
        primASheet.getRange(outputCell, last_col, 1, 6).setBackground("#B7B7B7"); 
  
      }  else if (team1[0] === team2[0] && team2[0] === team3[0] && team3[0] === team4[0] && team4[0] === team5[0] && team5[0] != team6[0]){
        // 1-5 TIED ; 6 OUT
        primASheet.getRange(outputCell, last_col, 1, 5).setBackground("#B7B7B7"); 
        primASheet.getRange(outputCell, last_col+5, 1, 1).setBackground("#ff0000");
  
      } else if (team1[0] != team2[0] && team2[0] === team3[0] && team3[0] === team4[0] && team4[0] === team5[0] && team5[0] != team6[0]){
        // 1 IN ; 2-5 TIED ; 6 OUT
        primASheet.getRange(outputCell, last_col, 1, 1).setBackground("#00ff00"); 
        primASheet.getRange(outputCell, last_col+1, 1, 4).setBackground("#B7B7B7"); 
        primASheet.getRange(outputCell, last_col+5, 1, 1).setBackground("#ff0000");
  
      } else if (team1[0] != team2[0] && team2[0] === team3[0] && team3[0] === team4[0] && team4[0] === team5[0] && team5[0] === team6[0]){
        // 1 IN ; 2-6 TIED
        primASheet.getRange(outputCell, last_col).setBackground("#00ff00"); 
        primASheet.getRange(outputCell, last_col+1, 1, 5).setBackground("#B7B7B7");
  
      } else if (team2[0] != team3[0] && team3[0] === team4[0] && team4[0] === team5[0] && team5[0] === team6[0]){
        // 1-2 IN ; 3-6 TIED
        primASheet.getRange(outputCell, last_col, 1, 2).setBackground("#00ff00");
        primASheet.getRange(outputCell, last_col+2, 1, 4).setBackground("#B7B7B7");
  
      } else if (team2[0] != team3[0] && team3[0] === team4[0] && team4[0] === team5[0] && team5[0] != team6[0]){
        // 1-2 IN ; 3-5 TIED ; 6 OUT
        primASheet.getRange(outputCell, last_col, 1, 2).setBackground("#00ff00");
        primASheet.getRange(outputCell, last_col+2, 1, 3).setBackground("#B7B7B7");
        primASheet.getRange(outputCell, last_col+5, 1, 1).setBackground("#ff0000");
  
      } else if (team3[0] != team4[0] && team4[0] === team5[0] && team5[0] === team6[0]){
        // 1-3 IN ; 4-6 TIED
        primASheet.getRange(outputCell, last_col, 1, 3).setBackground("#00ff00");
        primASheet.getRange(outputCell, last_col+3, 1, 3).setBackground("#B7B7B7");
  
      } else if (team3[0] != team4[0] && team4[0] === team5[0] && team5[0] != team6[0]){
        // 1-3 IN ; 4-5 TIED ; 6 OUT
        primASheet.getRange(outputCell, last_col, 1, 3).setBackground("#00ff00");
        primASheet.getRange(outputCell, last_col+3, 1, 2).setBackground("#B7B7B7");
        primASheet.getRange(outputCell, last_col+5, 1, 1).setBackground("#ff0000");
  
      } else {
        // NONE TIED
        primASheet.getRange(outputCell, last_col, 1, 4).setBackground("#00ff00");
        primASheet.getRange(outputCell, last_col+4, 1, 2).setBackground("#ff0000");
      }
  
      var outputStandings = [];
      var outputStandings2 = [];
      for (var b = 0; b < teamWL_f.length; b++) {
        var bSPLIT = teamWL_f[b].split("|");
        var bOUTPUT = bSPLIT[0] + "-" + bSPLIT[1] + " | " + bSPLIT[2];
        outputStandings.push(bOUTPUT);
      }
      outputStandings2.push(outputStandings);
      primASheet.getRange("I"+outputCell+":N"+outputCell).setValues(outputStandings2);
  
    }
    
  
  
    var percentFullV = primASheet.getRange(9, last_col, primASheet.getLastRow()-8, 6).getValues();
    var percentFullC = primASheet.getRange(9, last_col, primASheet.getLastRow()-8, 6).getBackgroundObjects();
    var fullCounter = [];
  
    for (var i in percentFullC) {
      for (var j in percentFullC[i]) {
        var percentSPLIT = percentFullV[i][j].split(" | ")
        if (percentFullC[i][j].asRgbColor().asHexString() === "#00ff00") { // Win
          fullCounter.push(percentSPLIT[1] + "|W")
        } else if (percentFullC[i][j].asRgbColor().asHexString() === "#ff0000") { // Loss
          fullCounter.push(percentSPLIT[1] + "|L")
        } else { // Tie
          fullCounter.push(percentSPLIT[1] + "|T")
        }
      }
      
    }
    fullCounter.sort();
    var counterAfter = getTeamWLCounterArrayTies(fullCounter);
    var counterAfter2 = getTeamWLSortedArrayTies(counterAfter);
    var counterOUTPUT2 = [];
    for (var i in counterAfter2) {
      var counterSPLIT = counterAfter2[i].split("|");
      var divider = 8;
      var outputWINS = ((parseInt(counterSPLIT[0])/divider)*100).toFixed(2) + "%";
      var outputLOSSES = ((parseInt(counterSPLIT[1])/divider)*100).toFixed(2)+ "%";
      var outputTIES = ((parseInt(counterSPLIT[2])/divider)*100).toFixed(2)+ "%";
      var counterOUTPUT = [counterSPLIT[3], outputWINS, outputLOSSES, outputTIES]
      counterOUTPUT2.push(counterOUTPUT);
    }
    primASheet.getRange("B2:E7").setValues(counterOUTPUT2);
  }