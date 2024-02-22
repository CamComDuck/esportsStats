// Make an api call to Riot server \\
function api_call(url) {
    var url2 = url;
    var options = {'method':'get', 'muteHttpExceptions': true};
    var response = UrlFetchApp.fetch(url2, options);
    if (response.getResponseCode() === 200) {
        return JSON.parse(response.getContentText());
    } else if (response.getResponseCode() === 429 || response.getResponseCode() === 504) {
        while (response.getResponseCode() === 429 || response.getResponseCode() === 504) {
            var responseHeader = response.getHeaders();
            var timeoutFor = 0 + (responseHeader['Retry-After']);
            Utilities.sleep((timeoutFor*1000));
            var response = UrlFetchApp.fetch(url, options);
            if (response.getResponseCode() === 200) {
                return JSON.parse(response.getContentText());
            } else if (response.getResponseCode() != 429 && response.getResponseCode() != 504){
                console.log("In Loop Error: " + response.getResponseCode());
                return "Error";
            }
        }
    } else {
        console.log ("Out of Loop Error: " + response.getResponseCode());
        return "Error";
    }
}
  
// Custom Menu
function onOpen(){
    SpreadsheetApp.getUi()
        .createMenu("Cam's Custom Codes")
        .addItem('Post Game','createPostGame')
        .addToUi();
}

// Returns champ name from champ id \\
function champ_names(champ_id, champ_api_list_fulli) {
    var champ_api_list_full = champ_api_list_fulli
    var champ_api_list_simple = Object.entries(champ_api_list_full.data);
    var champID = champ_id;
    var champs_array = [];
    var small_array = ["", ""];
    for (var i = 0; i < champ_api_list_simple.length; i++) {
        small_array[0] = champ_api_list_simple[i][1]["key"];
        if (champ_api_list_simple[i][1]["id"] === "MonkeyKing") {
        small_array[1] = "Wukong";
        } else {
        small_array[1] = champ_api_list_simple[i][1]["id"];
        }
        champs_array.push(small_array);
        small_array = ["", ""];
    }
    for (var i = 0; i < champs_array.length; i++) {
        if (champs_array[i][0].toString() === champID.toString()) return champs_array[i][1];
    }
    return "None";
}

// Create Counting Array \\
function getCountingArray(arrayCName) {
    var kills_list = arrayCName;
    kills_list.sort();

    var kill_list_f = [];
    var current_kill = "";
    var current_kill_count = 0;
    var game_count = 1;
    var split_kills = [];

    for (var t = 0; t < kills_list.length; t++) {
        split_kills = kills_list[t].split("|");

        if (t === 0) {
        current_kill = split_kills[0];
        current_kill_count = parseFloat(split_kills[1]);
        } else if (t === ((kills_list.length)-1)) {

        if (split_kills[0] === current_kill) {
            game_count += 1;
            current_kill_count += parseFloat(split_kills[1]);
        } else {
            kill_list_f.push(current_kill_count + "|" + current_kill + "|" + game_count);
            current_kill = split_kills[0];
            game_count = 1;
        }
            
        kill_list_f.push(current_kill_count + "|" + current_kill + "|" + game_count);

        } else if (split_kills[0] === current_kill) {
        game_count += 1;
        current_kill_count += parseFloat(split_kills[1]);
        } else {
        kill_list_f.push(current_kill_count + "|" + current_kill + "|" + game_count);
        current_kill = split_kills[0];
        current_kill_count = parseFloat(split_kills[1]);
        game_count = 1;
        }
    }
    kill_list_f.sort();
    kill_list_f.reverse();
    return kill_list_f;
}

// Create Team Pick/Ban Counting Array \\
function getPBCountingArray(arrayPBName) {
    var pb_list = arrayPBName;
    pb_list.sort();
    var pb_list_f = [];
    var current_team = "";
    var current_pb = "";
    var current_pb_count = 1;
    var split_pb = [];

    for (var i = 0; i < pb_list.length; i++) {
        split_pb = pb_list[i].split("|");

        if (i === 0) { // First entry
        current_team = split_pb[0];
        current_pb = split_pb[1];
        } else if (i === ((pb_list.length)-1)) { // Last entry

        if (split_pb[0] === current_team) { // Same team
            if (split_pb[1] === current_pb) { // Same champ
            current_pb_count += 1;
            pb_list_f.push(current_team + "|" + current_pb_count + "|" + current_pb);
            } else { // Diff champ
            pb_list_f.push(current_team + "|" + current_pb_count + "|" + current_pb);
            current_pb = split_pb[1];
            current_pb_count = 1;
            pb_list_f.push(current_team + "|" + current_pb_count + "|" + current_pb);
            }
        } else { // Diff team
            pb_list_f.push(current_team + "|" + current_pb_count + "|" + current_pb);
            current_team = split_pb[0]
            current_pb = split_pb[1];
            current_pb_count = 1;
            pb_list_f.push(current_team + "|" + current_pb_count + "|" + current_pb);
        }

        } else if (split_pb[0] === current_team) { // Same team
        if (split_pb[1] === current_pb) { // Same champ
            current_pb_count += 1;
        } else { // Diff champ
            pb_list_f.push(current_team + "|" + current_pb_count + "|" + current_pb);
            current_pb = split_pb[1];
            current_pb_count = 1;
        }
        } else { // Diff team
        pb_list_f.push(current_team + "|" + current_pb_count + "|" + current_pb);
        current_team = split_pb[0];
        current_team_count = 1;
        current_pb = split_pb[1];
        current_pb_count = 1;
        }
    }
    pb_list_f.sort();
    pb_list_f.reverse();
    return pb_list_f;
}

// Create Ban List Counting Array \\
function getBanCountingArray(arrayBName) {
    var fb_list = arrayBName;
    var fb_list_f = [];

    fb_list.sort();
    var fb_counter = 1;
    var fb_list_f = []
    var current_fb = "";

    for (var t = 0; t < fb_list.length; t++) {
        if (t === 0) { // First
            current_fb = fb_list[0];
        } else if (t === ((fb_list.length)-1)) { // Last

            if (fb_list[t] === current_fb) {
            fb_counter += 1;
            } else {
            fb_list_f.push(fb_counter + "|" + current_fb);
            current_fb = fb_list[t];
            fb_counter = 1;
            }
                
            fb_list_f.push(fb_counter + "|" + current_fb);

        } else if (fb_list[t] === current_fb) { // Same
            fb_counter += 1;
        } else { // Different
            fb_list_f.push(fb_counter + "|" + current_fb);
            current_fb = fb_list[t];
            fb_counter = 1;
        }
    }

    fb_list_f.sort();
    fb_list_f.reverse();

    // Ban FINAL ARRAY SORTER
    fb_list_f.sort(function(a,b){
        if(parseFloat(a.split("|")[0]) === parseFloat(b.split("|")[0])) {
            return parseFloat(b.split("|")[0]) - parseFloat(a.split("|")[0]);
        } else if(parseFloat(a.split("|")[0]) > parseFloat(b.split("|")[0])) {
            return -1;
        }  
        return 1;
    });
    return fb_list_f;
}

// Create Team Series Score and Points Array \\
function createTeamPointsArray(arrayINPUT) {
    var series_array = arrayINPUT;
    var split_array = "";
    var output_array = [];
    var current_team = "";
    var current_wins = 0;
    var current_losses = 0;
    var current_points = 0;
    var total_wins = 0;
    var total_losses = 0;

    for (var t = 0; t < series_array.length; t++) {
        split_array = series_array[t].split("|")

        if (t === 0) { // First
            current_team = split_array[0];
            total_wins = parseInt(split_array[1])
            total_losses = parseInt(split_array[2])
            if (split_array[1] > split_array[2]) {
            current_wins = 1;
            current_losses = 0;
            } else {
            current_wins = 0;
            current_losses = 1;
            }

            if (split_array[1] === "2" && split_array[2] === "0") {
            current_points = 6;
            } else if (split_array[1] === "2" && split_array[2] === "1") {
            current_points = 5;
            } else if (split_array[1] === "1" && split_array[2] === "2") {
            current_points = 3;
            } else if (split_array[1] === "0" && split_array[2] === "2") {
            current_points = 2;
            } else if (split_array[2] === "1" && split_array[3] === "1") {
            current_points = 1;
            } else if (split_array[2] === "0" && split_array[3] === "2") {
            current_points = 0;
            }

        } else if (t === ((series_array.length)-1)) { // Last

            if (split_array[0] === current_team) { // Same team
            total_wins += parseInt(split_array[1])
            total_losses += parseInt(split_array[2])
            if (split_array[1] > split_array[2]) {
                current_wins += 1;
            } else {
                current_losses += 1;
            }

            if (split_array[1] === "2" && split_array[2] === "0") {
                current_points += 6;
            } else if (split_array[1] === "2" && split_array[2] === "1") {
                current_points += 5;
            } else if (split_array[1] === "1" && split_array[2] === "2") {
                current_points += 3;
            } else if (split_array[1] === "0" && split_array[2] === "2") {
                current_points += 2;
            } else if (split_array[2] === "1" && split_array[3] === "1") {
                current_points += 1;
            } else if (split_array[2] === "0" && split_array[3] === "2") {
                current_points += 0;
            }


            } else { // Diff team
            output_array.push(current_team + "|" + current_wins + "-" + current_losses + "|" + current_points + "|" + total_wins + "-" + total_losses);
            current_team = split_array[0];
            total_wins = parseInt(split_array[1])
            total_losses = parseInt(split_array[2])
            if (split_array[1] > split_array[2]) {
                current_wins = 1;
                current_losses = 0;
            } else {
                current_wins = 0;
                current_losses = 1;
            }

            if (split_array[1] === "2" && split_array[2] === "0") {
                current_points = 6;
            } else if (split_array[1] === "2" && split_array[2] === "1") {
                current_points = 5;
            } else if (split_array[1] === "1" && split_array[2] === "2") {
                current_points = 3;
            } else if (split_array[1] === "0" && split_array[2] === "2") {
                current_points = 2;
            } else if (split_array[2] === "1" && split_array[3] === "1") {
                current_points = 1;
            } else if (split_array[2] === "0" && split_array[3] === "2") {
                current_points = 0;
            }
            }
                
            output_array.push(current_team + "|" + current_wins + "-" + current_losses + "|" + current_points + "|" + total_wins + "-" + total_losses);

        } else if (split_array[0] === current_team) { // Same team
            total_wins += parseInt(split_array[1])
            total_losses += parseInt(split_array[2])

            if (split_array[1] > split_array[2]) {
                current_wins += 1;
            } else {
                current_losses += 1;
            }

            if (split_array[1] === "2" && split_array[2] === "0") {
                current_points += 6;
            } else if (split_array[1] === "2" && split_array[2] === "1") {
                current_points += 5;
            } else if (split_array[1] === "1" && split_array[2] === "2") {
                current_points += 3;
            } else if (split_array[1] === "0" && split_array[2] === "2") {
                current_points += 2;
            } else if (split_array[2] === "1" && split_array[3] === "1") {
                current_points += 1;
            } else if (split_array[2] === "0" && split_array[3] === "2") {
                current_points += 0;
            }
        } else { // Diff team
            output_array.push(current_team + "|" + current_wins + "-" + current_losses + "|" + current_points + "|" + total_wins + "-" + total_losses);
            current_team = split_array[0];
            total_wins = parseInt(split_array[1])
            total_losses = parseInt(split_array[2])

            if (split_array[1] > split_array[2]) {
            current_wins = 1;
            current_losses = 0;
            } else {
            current_wins = 0;
            current_losses = 1;
            }

            if (split_array[1] === "2" && split_array[2] === "0") {
            current_points = 6;
            } else if (split_array[1] === "2" && split_array[2] === "1") {
            current_points = 5;
            } else if (split_array[1] === "1" && split_array[2] === "2") {
            current_points = 3;
            } else if (split_array[1] === "0" && split_array[2] === "2") {
            current_points = 2;
            } else if (split_array[2] === "1" && split_array[3] === "1") {
            current_points = 1;
            } else if (split_array[2] === "0" && split_array[3] === "2") {
            current_points = 0;
            }
        }
    }

    output_array.sort();

    // Ban FINAL ARRAY SORTER
    output_array.sort(function(a,b){
        if(parseFloat(a.split("|")[1]) === parseFloat(b.split("|")[1])) {
            return parseFloat(b.split("|")[2]) - parseFloat(a.split("|")[2]);
        } else if(parseFloat(a.split("|")[1]) > parseFloat(b.split("|")[1])) {
            return -1;
        }  
        return 1;
    });
    return output_array;
}

// Create Sorted Array \\
function getSortedArray(arraySName) {
    var kill_list_f = arraySName;
    var outputLIST = [];
    // KILL FINAL ARRAY MAKER
    for (var i = 0; i < kill_list_f.length; i++) {
        var kills_split2 = kill_list_f[i].split("|");

        var avg_kills = (parseFloat(kills_split2[0])/parseFloat(kills_split2[2])).toFixed(2);
        outputLIST.push(avg_kills + "|" + kills_split2[1] + "|" + kills_split2[2]);
    }

    // KILL FINAL ARRAY SORTER
    outputLIST.sort(function(a,b){
        if(parseFloat(a.split("|")[0]) === parseFloat(b.split("|")[0])) {
        return parseFloat(b.split("|")[2]) - parseFloat(a.split("|")[2]);
        } else if (parseFloat(a.split("|")[0]) > parseFloat(b.split("|")[0])) {
        return -1;
        }  
        return 1;
    });
    return outputLIST;
}

// Create Sorted Not Averages Array \\
function getSortedNAArray(arraySNAName) {
    var kill_list_f = arraySNAName;
    // KILL FINAL ARRAY MAKER
    for (var i = 0; i < kill_list_f.length; i++) {
        var kills_split2 = kill_list_f[i].split("|");
        kill_list_f[i] = kills_split2[0] + "|" + kills_split2[1] + "|" + kills_split2[2];
    }

    // KILL FINAL ARRAY SORTER
    kill_list_f.sort(function(a,b){
        if(parseFloat(a.split("|")[0]) === parseFloat(b.split("|")[0])) {
            return parseFloat(b.split("|")[2]) - parseFloat(a.split("|")[2]);
        } else if(parseFloat(a.split("|")[0]) > parseFloat(b.split("|")[0])) {
            return -1;
        }  
        return 1;
    });
    return kill_list_f;
}

// Create Sorted Team Pick/Ban Array \\
function getSortedTPBArray(arraySTPBName, user_input) {
    var pb_list_f = arraySTPBName;
    if (user_input === "PLAT") {
        var outputF = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
    } else if (user_input === "GOLD") {
        var outputF = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
    } else if (user_input === "DIA") {
        var outputF = [[],[],[],[],[],[],[],[]];
    }

    var current_team = "";
    var team_count = 0;

    // PB FINAL ARRAY MAKER
    for (var i = 0; i < pb_list_f.length; i++) {
        var pb_split = pb_list_f[i].split("|");
        
        if (i === 0) {
        current_team = pb_split[0];
        outputF[team_count].push(current_team);
        outputF[team_count].push(pb_split[2] + "|" + pb_split[1]);
        } else if (pb_split[0] === current_team) {
        outputF[team_count].push(pb_split[2] + "|" + pb_split[1]);
        } else {
        current_team = pb_split[0];
        team_count += 1;
        outputF[team_count].push(current_team);
        outputF[team_count].push(pb_split[2] + "|" + pb_split[1]);
        }
    }
    return outputF;
}

// Output Team Pick/Ban Arrays \\
function createPickOutput(arrayOPName, userInput, type) {
    var pick_list = arrayOPName;
    var league_picked = userInput;
    var pbType = type;


    if (league_picked === "PLAT") var teamSheet = "https://docs.google.com/spreadsheets/d/1lQ1ObK2DR70OYYC1gUt2qkBJX24RxNBTXA01dWCiwX4/";
    if (league_picked === "GOLD") var teamSheet = "https://docs.google.com/spreadsheets/d/1TkUyieTa1Ngl66gOwQTpkMi-OdZOHo68uQI6weGcXvA/";
    if (league_picked === "DIA") var teamSheet = "https://docs.google.com/spreadsheets/d/1Zi4P6-oikiZ8p7DJBVIQJ22DB3e-CgNX_8djFbdpvlk/";

    for (var i = 0; i < pick_list.length; i++) {
        var currentTeam = SpreadsheetApp.openByUrl(teamSheet).getSheetByName(pick_list[i][0]);
        var input_list = ["", ""];
        var output_list = [];
        var counter = 0;
        for (var o = 0; o < pick_list[i].length; o++) {
        var pick_list_split = pick_list[i][o].split("|");
        if (counter < 6 && o != 0 && pick_list_split[0] != "NO BAN") {
            counter += 1;
            input_list[0] = pick_list_split[0];
            input_list[1] = pick_list_split[1];
            output_list.push(input_list);
            input_list = ["", ""];
        }
        }
        try {
        
        if (pbType === "PICK") {
        currentTeam.getRange("R3:S8").setValues(output_list);
        } else if (pbType === "BAN") {
        currentTeam.getRange("O3:P8").setValues(output_list);
        }

        } catch (err) {
        if (pbType === "PICK") {
        currentTeam.getRange("R3:S8").setValue(["Not Enough Games"]);
        } else if (pbType === "BAN") {
        currentTeam.getRange("O3:P8").setValue(["Not Enough Games"]);
        }
        }
    }
}

// Create Output Array \\
function getFinalArray(arrayName) {
    var kill_list_f = arrayName;
    var total_games = 1; 
    var counter = 0;
    var fkillList = [];
    for (var i = 0; i < kill_list_f.length; i++) {
        var kill_list_fs = kill_list_f[i].split("|");
        if (parseFloat(kill_list_fs[2]) >= (total_games*.5) && counter < 10) {
        kill_list_fs[1] = getSummonerName(kill_list_fs[1]);
        fkillList.push(kill_list_fs);
        counter++
        }
    }
    return fkillList;
}

// Create Team Output Array \\
function getCCCFinalArray(arrayCOName, league, div) {
    var kill_list_f = arrayCOName;
    var counter = 0;
    var fkillList = [];

    if (league === "PLAT") {
        if (div === "A") {
        var teamList = getPlatInfernalTeams();
        } else {
        var teamList = getPlatHextechTeams();
        }
    } else if (league === "GOLD"){
        if (div === "A") {
        var teamList = getGoldCloudTeams();
        } else if (div === "B"){
        var teamList = getGoldMountainTeams();
        } else {
        var teamList = getGoldOceanTeams();
        }
    }

    for (var i = 0; i < kill_list_f.length; i++) {
        var kill_list_fs = kill_list_f[i].split("|");
        if (counter < 10 && teamList.indexOf(kill_list_fs[2]) != -1) {
        kill_list_fs.pop();
        fkillList.push(kill_list_fs);
        counter++
        }
    }
    return fkillList;
}

// Create Team Stat Output Array \\
function getCCCSFinalArray(arrayCOName, league, div) {
    var kill_list_f = arrayCOName;
    var counter = 0;
    var fkillList = [];

    if (league === "PLAT") {
        if (div === "A") {
        var teamList = getPlatInfernalTeams();
        } else {
        var teamList = getPlatHextechTeams();
        }
    } else if (league === "GOLD"){
        if (div === "A") {
        var teamList = getGoldCloudTeams();
        } else if (div === "B"){
        var teamList = getGoldMountainTeams();
        } else if (div === "C") {
        var teamList = getGoldOceanTeams();
        }
    } else if (league === "DIA"){
        var teamList = getDiaTeams();
        
    } else if (league === "EGG"){
        var teamList = getEggTeams();
        
    } else if (league === "DUCKLING"){
        var teamList = getDucklingTeams();
        
    }

    for (var i = 0; i < kill_list_f.length; i++) {

        if (counter < 10 && teamList.indexOf(kill_list_f[i][0]) != -1) {
        fkillList.push(kill_list_f[i]);
        counter++
        }
    }
    return fkillList;
}

// Create Champion Output Array \\
function getCFinalArray(arrayCOName, special) {
    var kill_list_f = arrayCOName;
    var current_special = special;
    var counter = 0;
    var fkillList = [];

    for (var i = 0; i < kill_list_f.length; i++) {
        var kill_list_fs = kill_list_f[i].split("|");
        if (counter < 10 && kill_list_fs[1] != "NO BAN") {
        if (current_special === "FB") kill_list_fs[1] = getSummonerName(kill_list_fs[1]);
        fkillList.push(kill_list_fs);
        counter++
        }
    }
    return fkillList;
}

// Create Champ Counter Array \\
function getChampCounterArray(arrayCCName) {
    var game_list = arrayCCName;
    var champ_list = [];
    // CHAMPS PICKED COUNTER
    game_list.sort();
    var count_champ = 0;
    var current_champ = "";
    var current_kills = 0;
    var current_deaths = 0;
    var current_assists = 0;
    var current_losses = 0;
    var current_wins = 0;
    var game_count = 0;
    var split_array = [];
    var picked_champs = [];

    for (var m = 0; m < game_list.length; m++) {

        split_array = game_list[m].split("|");
        split_kda = split_array[2].split("/");

        if (m === 0) { // First Game

            current_champ = split_array[0];
            count_champ = 1;
            current_kills += parseFloat(split_kda[0]);
            current_deaths += parseFloat(split_kda[1]);
            current_assists += parseFloat(split_kda[2]);
            if (split_array[1] === "L") {
                current_losses += 1;
            } else {
                current_wins += 1;
            }

        } else if (m === ((game_list.length)-1)) { // Last Game

            if (split_array[0] === current_champ) {
                count_champ += 1;
                if (split_array[1] === "L") {
                    current_losses += 1;
                } else {
                    current_wins += 1;
                }
                current_kills += parseFloat(split_kda[0]);
                current_deaths += parseFloat(split_kda[1]);
                current_assists += parseFloat(split_kda[2]);
            } else {
                champ_list.push(count_champ + "|" + current_champ + "|" + current_wins + "/" + current_losses + "|" + current_kills +
                "/" + current_deaths + "/" + current_assists);

                current_champ = split_array[0];
                count_champ = 1;
                current_kills = parseFloat(split_kda[0]);
                current_deaths = parseFloat(split_kda[1]);
                current_assists = parseFloat(split_kda[2]);
                if (split_array[1] === "L") {
                    current_losses = 1;
                    current_wins = 0;
                } else {
                    current_wins = 1;
                    current_losses = 0;
                }
            }
            
            champ_list.push(count_champ + "|" + current_champ + "|" + current_wins + "/" + current_losses + "|" + current_kills +
            "/" + current_deaths + "/" + current_assists);

        } else if (split_array[0] === current_champ) { // Matching champ

            count_champ += 1;
            current_kills += parseFloat(split_kda[0]);
            current_deaths += parseFloat(split_kda[1]);
            current_assists += parseFloat(split_kda[2]);
            if (split_array[1] === "L") {
                current_losses += 1;
            } else {
                current_wins += 1;
            }

        } else { // Not matching champ

            champ_list.push(count_champ + "|" + current_champ + "|" + current_wins + "/" + current_losses + "|" + current_kills +
            "/" + current_deaths + "/" + current_assists);
            current_champ = split_array[0];
            count_champ = 1;
            current_kills = parseFloat(split_kda[0]);
            current_deaths = parseFloat(split_kda[1]);
            current_assists = parseFloat(split_kda[2]);
            if (split_array[1] === "L") {
                current_losses = 1;
                current_wins = 0;
            } else {
                current_wins = 1;
                current_losses = 0;
            }

        }

    }

    champ_list.sort();
    return champ_list;
}

// Create Sorted Champ Array \\
function getChampSortedArray(arrayCSName) {
    var champ_list = arrayCSName;
    var picked_champs = [];

    for (var j = 0; j < champ_list.length; j++) {

        var champs_split = champ_list[j].split("|");

        var win_loss_split = champs_split[2].split("/");
        var win_loss = Math.floor(parseFloat(win_loss_split[0])/(parseFloat(win_loss_split[0])+parseFloat(win_loss_split[1]))*100) + "% (" + win_loss_split[0] + "-" + win_loss_split[1] + ")";
        champs_split[2] = win_loss;
        var kda_split = champs_split[3].split("/");
        var total_games = parseFloat(champs_split[0]);
        var avg_kda = (parseFloat(kda_split[0])/total_games).toFixed(2) + "/" + (parseFloat(kda_split[1])/total_games).toFixed(2) + "/" + (parseFloat(kda_split[2])/total_games).toFixed(2)
        champs_split[3] = avg_kda;


        if (champs_split[0] === "1") {
            picked_champs.push("1|" + champs_split[2] + "|" + champs_split[1] + "|" + champs_split[3]);
        } else {
            picked_champs.push(champs_split[0] + "|" + champs_split[2] + "|" + champs_split[1] + "|" + champs_split[3])
        }

    }

    // CHAMP FINAL ARRAY SORTER
    picked_champs.sort(function(a,b){
        if(parseFloat(a.split("|")[0]) === parseFloat(b.split("|")[0])) {
            return parseFloat(b.split("|")[1]) - parseFloat(a.split("|")[1]);
        } else if(parseFloat(a.split("|")[0]) > parseFloat(b.split("|")[0])) {
            return -1;
        }  
        return 1;
    });

    return picked_champs;
}

function matchpb(picked, banned, game_num) {

    var output_array = [];

    for (var i = 0; i < picked.length; i++) {
        var pickedC = picked[i].split("|");
        for (var o = 0; o < banned.length; o++) {
        var bannedC = banned[o].split("|");
        if (pickedC[2] === bannedC[1]) {
            var pickban = (((parseInt(pickedC[0]) + parseInt(bannedC[0]))/game_num)*100).toFixed(2)
            var output = [pickban, pickedC[0], bannedC[0], pickedC[2], pickedC[1], pickedC[3]]
            o = banned.length;
            output_array.push(output)
        }
        }
    }

    // CHAMP FINAL ARRAY SORTER
    output_array.sort(function(a,b){
        if(parseFloat(a[0]) === parseFloat(b[0])) {
        return parseFloat(b[1]) - parseFloat(a[1]);
        } else if(parseFloat(a[0]) > parseFloat(b[0])) {
        return -1;
        }  
        return 1;
    });
    return output_array;
}

// Create Player Champ Counter Array \\
function getPlayerChampCounterArray(arrayCCName) {
    var game_list = arrayCCName;
    var champ_list = [];
    // CHAMPS PICKED COUNTER
    game_list.sort();
    var count_champ = 0;
    var current_player = "";
    var current_champ = "";
    var current_losses = 0;
    var current_wins = 0;
    var split_array = [];

    for (var m = 0; m < game_list.length; m++) {

        split_array = game_list[m].split("|");

        if (m === 0) { // First Game

            current_player = split_array[0];
            current_champ = split_array[1];
            count_champ = 1;
            if (split_array[2] === "L") {
                current_losses += 1;
            } else {
                current_wins += 1;
            }

        } else if (m === ((game_list.length)-1)) { // Last Game

            if (split_array[0] === current_player && split_array[1] === current_champ) { // Same player + same champ
                count_champ += 1;
                if (split_array[2] === "L") {
                current_losses += 1;
                } else {
                current_wins += 1;
                }
            } else {
                champ_list.push(current_player + "|" + count_champ + "|" + current_champ + "|" + current_wins + "|" + current_losses);

                current_player = split_array[0];
                current_champ = split_array[1];
                count_champ = 1;
                if (split_array[2] === "L") {
                    current_losses = 1;
                    current_wins = 0;
                } else {
                    current_wins = 1;
                    current_losses = 0;
                }
            }
            
            champ_list.push(current_player + "|" + count_champ + "|" + current_champ + "|" + current_wins + "|" + current_losses);

        } else if (split_array[0] === current_player && split_array[1] === current_champ) { // Matching player + champ

            count_champ += 1;
            if (split_array[2] === "L") {
                current_losses += 1;
            } else {
                current_wins += 1;
            }

        } else { // Not matching player or champ

            champ_list.push(current_player + "|" + count_champ + "|" + current_champ + "|" + current_wins + "|" + current_losses);
            current_player = split_array[0];
            current_champ = split_array[1];
            count_champ = 1;
            if (split_array[2] === "L") {
                current_losses = 1;
                current_wins = 0;
            } else {
                current_wins = 1;
                current_losses = 0;
            }

        }

    }

    // CHAMP FINAL ARRAY SORTER
    champ_list.sort();
    champ_list.reverse();
    return champ_list;
}

// Create Player Champ Sorted Array \\
function getPlayerChampSortedArray(arrayCCName) {
    var game_list = arrayCCName;
    var champ_list = [];
    // CHAMPS PICKED COUNTER
    var count_champ = 0;
    var all_players = []
    var current_player = ["","",""];
    var current_losses = 0;
    var current_wins = 0;
    var split_array = [];
    var currentWR = "";

    for (var m = 0; m < game_list.length; m++) {

        split_array = game_list[m].split("|");

        if (m === 0) { // First Game

            current_player[0] = split_array[0];

            current_player.push(split_array[1]+"x "+split_array[2]+" ("+split_array[3]+"-"+split_array[4]+")");
            count_champ = 1;
            current_wins += parseInt(split_array[3]);
            current_losses += parseInt(split_array[4]);

        } else if (m === ((game_list.length)-1)) { // Last Game

            if (split_array[0] === current_player[0]) { // Same player

                current_player.push(split_array[1]+"x "+split_array[2]+" ("+split_array[3]+"-"+split_array[4]+")");
                count_champ += 1;
                current_wins += parseInt(split_array[3]);
                current_losses += parseInt(split_array[4]);
                current_player[1] = count_champ;
                currentWR = ((current_wins/(current_wins+current_losses))*100).toFixed(0);
                current_player[2] = currentWR+"% ("+current_wins+"-"+current_losses+")"
                current_player[0] = (current_player[0]);

            } else { // Diff player

                current_player[0] = (current_player[0]);
                current_player[1] = count_champ;
                currentWR = ((current_wins/(current_wins+current_losses))*100).toFixed(0);
                current_player[2] = currentWR+"% ("+split_array[3]+"-"+split_array[4]+")"
                all_players.push(current_player);

                current_player[0] = (current_player[0]);
                current_wins = parseInt(split_array[3]);
                current_losses = parseInt(split_array[4]);
                currentWR = ((current_wins/(current_wins+current_losses))*100).toFixed(0);
                current_player = [split_array[0], 1, currentWR+"% ("+current_wins+"-"+current_losses+")",split_array[1]+"x "+split_array[2]+" ("+split_array[3]+"-"+split_array[4]+")"];
                
            }
            
            all_players.push(current_player);

        } else if (split_array[0] === current_player[0]) { // Matching player

            count_champ += 1;
            current_player.push(split_array[1]+"x "+split_array[2]+" ("+split_array[3]+"-"+split_array[4]+")");
            current_wins += parseInt(split_array[3]);
            current_losses += parseInt(split_array[4]);

        } else { // Diff player

            current_player[1] = count_champ;
            currentWR = ((current_wins/(current_wins+current_losses))*100).toFixed(0);
            current_player[2] = currentWR+"% ("+current_wins+"-"+current_losses+")"
            current_player[0] = (current_player[0]);
            all_players.push(current_player);

            current_player = [split_array[0],"",""];
            current_player.push(split_array[1]+"x "+split_array[2]+" ("+split_array[3]+"-"+split_array[4]+")");
            count_champ = 1;
            current_wins = parseInt(split_array[3]);
            current_losses = parseInt(split_array[4]);

        }

    }

    // CHAMP FINAL ARRAY SORTER
    all_players.sort(function(a,b){
        if(parseFloat(a[1]) === parseFloat(b[1])) {
            return parseFloat(b[2]) - parseFloat(a[2]);
        } else if(parseFloat(a[1]) > parseFloat(b[1])) {
            return -1;
        }  
        return 1;
    });
    return all_players;
    }

    // Create Champ Counter Array \\
    function getTeamSeriesDatesCounter(arayINPUT) {
    var game_list = arayINPUT;
    var champ_list = [];
    // CHAMPS PICKED COUNTER
    game_list.sort();
    var current_date = "";
    var current_team = "";
    var current_losses = 0;
    var current_wins = 0;
    var current_ffs = 0;
    var split_array = [];


    for (var m = 0; m < game_list.length; m++) {

        split_array = game_list[m].split("|");

        if (m === 0) { // First Game

            current_date = split_array[0];
            current_team = split_array[1]

            if (split_array[2] === "L") {
            current_losses += 1;
            } else if (split_array[2] === "W"){
            current_wins += 1;
            } else {
            current_ffs += 1;
            }

        } else if (m === ((game_list.length)-1)) { // Last Game

            if (split_array[0] === current_date) { // Same date

            if (split_array[1] === current_team) { // Same date + team

                if (split_array[2] === "L") {
                current_losses += 1;
                } else if (split_array[2] === "W"){
                current_wins += 1;
                } else {
                current_ffs += 1;
                }

            } else { // Same date - Diff team

                champ_list.push(current_team + "|" + current_wins + "|" + current_losses + "|" + current_ffs);
                current_team = split_array[1]

                if (split_array[2] === "L") {
                current_losses = 1;
                current_wins = 0;
                current_ffs = 0;
                } else  if (split_array[2] === "W") {
                current_wins = 1;
                current_losses = 0;
                current_ffs = 0;
                } else {
                current_wins = 0;
                current_losses = 0;
                current_ffs = 1;
                }

            }
                
            } else { // Diff date - Diff team
            champ_list.push(current_team + "|" + current_wins + "|" + current_losses + "|" + current_ffs);

            current_date = split_array[0];
            current_team = split_array[1]

            if (split_array[2] === "L") {
                current_losses = 1;
                current_wins = 0;
                current_ffs = 0;
            } else  if (split_array[2] === "W") {
                current_wins = 1;
                current_losses = 0;
                current_ffs = 0;
            } else {
                current_wins = 0;
                current_losses = 0;
                current_ffs = 1;
            }
            }
            
            champ_list.push(current_team + "|" + current_wins + "|" + current_losses + "|" + current_ffs);

        } else if (split_array[0] === current_date) { // Same date

            if (split_array[1] === current_team) { // Same date + team

            if (split_array[2] === "L") {
                current_losses += 1;
                } else if (split_array[2] === "W"){
                current_wins += 1;
                } else {
                current_ffs += 1;
                }

            } else { // Same date - diff team
            champ_list.push(current_team + "|" + current_wins + "|" + current_losses + "|" + current_ffs);
            current_date = split_array[0];
            current_team = split_array[1]

            if (split_array[2] === "L") {
                current_losses = 1;
                current_wins = 0;
                current_ffs = 0;
            } else  if (split_array[2] === "W") {
                current_wins = 1;
                current_losses = 0;
                current_ffs = 0;
            } else {
                current_wins = 0;
                current_losses = 0;
                current_ffs = 1;
            }

            }
            

        } else { // Diff date

            champ_list.push(current_team + "|" + current_wins + "|" + current_losses + "|" + current_ffs);
            current_date = split_array[0];
            current_team = split_array[1]

            if (split_array[2] === "L") {
            current_losses = 1;
            current_wins = 0;
            current_ffs = 0;
            } else  if (split_array[2] === "W") {
            current_wins = 1;
            current_losses = 0;
            current_ffs = 0;
            } else {
            current_wins = 0;
            current_losses = 0;
            current_ffs = 1;
            }

        }

    }

    champ_list.sort();
    return champ_list;
}

// Create Team WL Counter Array \\
function getTeamWLCounterArray(arrayCTName) {
    var game_list = arrayCTName;
    var champ_list = [];
    // CHAMPS PICKED COUNTER
    game_list.sort();
    var count_champ = 0;
    var current_champ = "";
    var current_losses = 0;
    var current_wins = 0;
    var split_array = [];

    for (var m = 0; m < game_list.length; m++) {

        split_array = game_list[m].split("|");

        if (m === 0) { // First Game

            current_champ = split_array[0];
            count_champ = 1;
            if (split_array[1] === "L") {
                current_losses += 1;
            } else {
                current_wins += 1;
            }

        } else if (m === ((game_list.length)-1)) { // Last Game

            if (split_array[0] === current_champ) {
                count_champ += 1;
                if (split_array[1] === "L") {
                    current_losses += 1;
                } else {
                    current_wins += 1;
                }
            } else {
                champ_list.push(count_champ + "|" + current_champ + "|" + current_wins + "/" + current_losses);

                current_champ = split_array[0];
                count_champ = 1;
                if (split_array[1] === "L") {
                    current_losses = 1;
                    current_wins = 0;
                } else {
                    current_wins = 1;
                    current_losses = 0;
                }
            }
            
            champ_list.push(count_champ + "|" + current_champ + "|" + current_wins + "/" + current_losses);

        } else if (split_array[0] === current_champ) { // Matching champ

            count_champ += 1;
            if (split_array[1] === "L") {
                current_losses += 1;
            } else {
                current_wins += 1;
            }

        } else { // Not matching champ

            champ_list.push(count_champ + "|" + current_champ + "|" + current_wins + "/" + current_losses);
            current_champ = split_array[0];
            count_champ = 1;
            if (split_array[1] === "L") {
                current_losses = 1;
                current_wins = 0;
            } else {
                current_wins = 1;
                current_losses = 0;
            }

        }

    }

    champ_list.sort();
    return champ_list;
}

// Create Sorted Champ Array \\
function getTeamWLSortedArray(arrayCSTName) {
    var champ_list = arrayCSTName;
    var picked_champs = [];

    for (var j = 0; j < champ_list.length; j++) {

        var champs_split = champ_list[j].split("|");
        var win_loss_split = champs_split[2].split("/");
        var win_percent = ((win_loss_split[0]/champs_split[0])*100).toFixed(0);
        picked_champs.push(win_loss_split[0] + "|" + win_loss_split[1] + "|" + champs_split[1] + "|" + win_percent);


    }

    // CHAMP FINAL ARRAY SORTER
    picked_champs.sort(function(a,b){
        if(parseFloat(a.split("|")[3]) === parseFloat(b.split("|")[3])) {
        return parseFloat(a.split("|")[0]) - parseFloat(b.split("|")[0]);
        } else if(parseFloat(a.split("|")[3]) > parseFloat(b.split("|")[3])) {
        return -1;
        }  
        return 1;
    });
    return picked_champs;
    }

    // Create Team Stats Output Array \\
    function getTeamStatsArray(iTeamWL, iTeamKill, iTeamDeath, iTeamAssist, iTeamGameT, iTeamDrag, iTeamHerald, iTeamBaron, iTeamTower, userINPUT) {
    var wl_list = iTeamWL;
    var kill_list = iTeamKill;
    var death_list = iTeamDeath;
    var assist_list = iTeamAssist;
    var gameT_list = iTeamGameT;
    var drag_list = iTeamDrag;
    var herald_list = iTeamHerald;
    var baron_list = iTeamBaron;
    var tower_list = iTeamTower;
    if (userINPUT === "PLAT") {
        var output_list = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    } else if (userINPUT === "GOLD") {
        var output_list = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    } else {
        var output_list = [[], [], [], [], [], [], [], []];
    }

    for (var i = 0; i < output_list.length; i++) { // Cycle through each team
        var wlSPLIT = wl_list[i].split("|");

        output_list[i].push(wlSPLIT[0]);
        output_list[i].push(wlSPLIT[1]);
        output_list[i].push(wlSPLIT[2]);
        output_list[i].push(wlSPLIT[3]);

        for (var o = 0; o < output_list.length; o++) { // Kills
        var killSPLIT = kill_list[o].split("|");
        if (killSPLIT[1] === wlSPLIT[0]) output_list[i].push(killSPLIT[0]);
        }
    }

    for (var i = 0; i < output_list.length; i++) { // Cycle through each team
        var wlSPLIT = wl_list[i].split("|");
        for (var o = 0; o < output_list.length; o++) { // Deaths
        var deathSPLIT = death_list[o].split("|");
        if (deathSPLIT[1] === wlSPLIT[0]) output_list[i].push(deathSPLIT[0]);
        }
    }

    for (var i = 0; i < output_list.length; i++) { // Cycle through each team
        var wlSPLIT = wl_list[i].split("|");
        for (var o = 0; o < output_list.length; o++) { // Assists
        var assistSPLIT = assist_list[o].split("|");
        if (assistSPLIT[1] === wlSPLIT[0]) output_list[i].push(assistSPLIT[0]);
        }
    }

    for (var i = 0; i < output_list.length; i++) { // Cycle through each team
        var wlSPLIT = wl_list[i].split("|");
        for (var o = 0; o < output_list.length; o++) { // Game Time
        var gameTSPLIT = gameT_list[o].split("|");
        if (gameTSPLIT[1] === wlSPLIT[0]) {
            var current_time = gameTSPLIT[0];
            var currentMins = current_time/86400;
            output_list[i].push(currentMins);
        }
        
        }
    }

    for (var i = 0; i < output_list.length; i++) { // Cycle through each team
        var wlSPLIT = wl_list[i].split("|");
        for (var o = 0; o < output_list.length; o++) { // Dragons
        var dragSPLIT = drag_list[o].split("|");
        if (dragSPLIT[1] === wlSPLIT[0]) output_list[i].push(dragSPLIT[0]);
        }
    }

    for (var i = 0; i < output_list.length; i++) { // Cycle through each team
        var wlSPLIT = wl_list[i].split("|");
        for (var o = 0; o < output_list.length; o++) { // Heralds
        var heraldSPLIT = herald_list[o].split("|");
        if (heraldSPLIT[1] === wlSPLIT[0]) output_list[i].push(heraldSPLIT[0]);
        }
    }

    for (var i = 0; i < output_list.length; i++) { // Cycle through each team
        var wlSPLIT = wl_list[i].split("|");
        for (var o = 0; o < output_list.length; o++) { // Barons
        var baronSPLIT = baron_list[o].split("|");
        if (baronSPLIT[1] === wlSPLIT[0]) output_list[i].push(baronSPLIT[0]);
        }
    }

    for (var i = 0; i < output_list.length; i++) { // Cycle through each team
        var wlSPLIT = wl_list[i].split("|");
        for (var o = 0; o < output_list.length; o++) { // Towers
        var towerSPLIT = tower_list[o].split("|");
        if (towerSPLIT[1] === wlSPLIT[0]) output_list[i].push(towerSPLIT[0]);
        }
    }
    return output_list;
}

function getSummonerName(puuidENTER) {
    var summerPUUID = puuidENTER;
    var apiKey = getApiKey();
    var summonerObject = api_call("https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/"+ summerPUUID + "?api_key=" + apiKey);
    return summonerObject["name"];
}

function item_names(item_id, itemLIST) {
    var items_api_list_full = itemLIST
    var itemID = item_id.toString();
    try {
        var itemNAME = items_api_list_full["data"][itemID]["name"];
    } catch (err) {
        var itemNAME = "None";
    }

    return itemNAME;
}

function getBasicOutput(basicInput, special) {
    var currentArray = basicInput;
    var currentSpecial = special;
    var currentArrayF = getCountingArray(currentArray);
    currentArrayF = getSortedArray(currentArrayF);
    if (currentSpecial === "REVERSE") currentArrayF.reverse()
    var fcurrentArray = getFinalArray(currentArrayF);
    return fcurrentArray;
}

function getHalfOutput(halfInput, special) {
    var currentArray = halfInput;
    var currentSpecial = special;
    var currentArrayF = getCountingArray(currentArray);
    if (currentSpecial === "NONE") currentArrayF = getSortedArray(currentArrayF);
    if (currentSpecial === "NO AVG") currentArrayF = getSortedNAArray(currentArrayF);
    return currentArrayF;
}

// Create Team WL Counter Array With Ties\\
function getTeamWLCounterArrayTies(arrayCTName) {
    var game_list = arrayCTName;
    var champ_list = [];
    // CHAMPS PICKED COUNTER
    game_list.sort();
    var count_champ = 0;
    var current_champ = "";
    var current_losses = 0;
    var current_wins = 0;
    var current_ties = 0;
    var split_array = [];

    for (var m = 0; m < game_list.length; m++) {

        split_array = game_list[m].split("|");

        if (m === 0) { // First Game

            current_champ = split_array[0];
            count_champ = 1;
            if (split_array[1] === "L") {
                current_losses += 1;
            } else if (split_array[1] === "W"){
                current_wins += 1;
            } else {
                current_ties += 1;
            }

        } else if (m === ((game_list.length)-1)) { // Last Game

            if (split_array[0] === current_champ) {
                count_champ += 1;
                if (split_array[1] === "L") {
                    current_losses += 1;
                } else if (split_array[1] === "W"){
                    current_wins += 1;
                } else {
                    current_ties += 1;
                }
            } else {
                // champ_list.push(count_champ+"|"+current_champ+"|"+current_bl+"/"+current_wins+"/"+current_bt+"/"+current_ties+"/"+current_losses)
                champ_list.push(count_champ+"|"+current_champ+"|"+current_wins+"/"+current_losses+"/"+current_ties)

                current_champ = split_array[0];
                count_champ = 1;
                if (split_array[1] === "L") {
                    current_losses = 1;
                    current_wins = 0;
                    current_ties = 0;
                } else if (split_array[1] === "W"){
                    current_wins = 1;
                    current_losses = 0;
                    current_ties = 0;
                } else {
                    current_wins = 0;
                    current_losses = 0;
                    current_ties = 1;
                } 
            }
            
            // champ_list.push(count_champ+"|"+current_champ+"|"+current_bl+"/"+current_wins+"/"+current_bt+"/"+current_ties+"/"+current_losses)
                champ_list.push(count_champ+"|"+current_champ+"|"+current_wins+"/"+current_losses+"/"+current_ties)

        } else if (split_array[0] === current_champ) { // Matching champ

            count_champ += 1;
            if (split_array[1] === "L") {
                current_losses += 1;
            } else if (split_array[1] === "W"){
                current_wins += 1;
            } else {
                current_ties += 1;
            }

        } else { // Not matching champ

            // champ_list.push(count_champ+"|"+current_champ+"|"+current_bl+"/"+current_wins+"/"+current_bt+"/"+current_ties+"/"+current_losses)
            champ_list.push(count_champ+"|"+current_champ+"|"+current_wins+"/"+current_losses+"/"+current_ties)
            current_champ = split_array[0];
            count_champ = 1;
            if (split_array[1] === "L") {
                current_losses = 1;
                current_wins = 0;
                current_ties = 0;
            } else if (split_array[1] === "W"){
                current_wins = 1;
                current_losses = 0;
                current_ties = 0;
            } else {
                current_wins = 0;
                current_losses = 0;
                current_ties = 1;
            } 

        }

    }

    champ_list.sort();
    return champ_list;
}

// Create Sorted Champ Array With Ties \\
function getTeamWLSortedArrayTies(arrayCSTName) {
    var champ_list = arrayCSTName;
    var picked_champs = [];

    for (var j = 0; j < champ_list.length; j++) {

        var champs_split = champ_list[j].split("|");
        var win_loss_split = champs_split[2].split("/");
        picked_champs.push(win_loss_split[0] + "|" + win_loss_split[1] + "|" + win_loss_split[2] + "|"+champs_split[1]);

    }

    // CHAMP FINAL ARRAY SORTER
    picked_champs.sort(function(a,b){
        if(parseFloat(a.split("|")[0]) === parseFloat(b.split("|")[0])) {
        return parseFloat(a.split("|")[1]) - parseFloat(b.split("|")[1]);
        } else if(parseFloat(a.split("|")[0]) > parseFloat(b.split("|")[0])) {
        return -1;
        }  
        return 1;
    });

    return picked_champs;
}