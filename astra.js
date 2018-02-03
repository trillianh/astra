
var Discord = require('discord.io');
var logger = require('winston');
var bot_token = process.env.token;
var osu_token = process.env.osuapi;
//var auth = require('./auth.json');
var path = require('path');
var https = require('https');
var mongodb = require('mongodb');
//var request = require('sync-request');

const guildName = "ventus";
const ventusBotChannel = 385971798539370496;
const trillianAstra = 387326440607186947;
const pathbase = ".";//"C:\\Users\\astra\\Desktop\\ventus";
const officers = [
    "229422191362441216",
    "223993765398970368",
    "110143617699430400",
    "163807302061785088"];
const classnicks = [
    "zerker,zerk,berserker,zk,giant", //0
    "dk,drk,darkknight,batman,darknight,brucewayne,dark",
    "kuno,kunoichi",
    "mae,bae,baehwa,maehwa,plum,meihua,maewah,maewha",
    "musa,blader,beyblade",
    "mystic,femstriker,mys",
    "ninja,naruto,hokage",
    "ranger,deadclass,bowmaster,dualblade,archer,elf",
    "sorc,sorceress,rwby",
    "striker,jojo,stroker",
    "tamer,loli,ellin,tame",
    "valk,valkyrie,lifeskiller",
    "warrior,kajitrainer,warr",
    "witch,hermione,ginny",
    "wiz,wizard,wizzy,shiny,harrypotter,wizerd"];

const classnames = [
    "Berserker",
    "Dark Knight",
    "Kunoichi",
    "Maehwa",
    "Musa",
    "Mystic",
    "Ninja",
    "Ranger",
    "Sorceress",
    "Striker",
    "Tamer",
    "Valkyrie",
    "Warrior",
    "Witch",
    "Wizard"];
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
    token: bot_token,
    autorun: true,
    autoReconnect: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});



bot.on('disconnect', function (erMsg, code) {
    logger.info('Disconnected');
    logger.info(code + " " + erMsg);
    bot.connect();
});


bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    try {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        var cm = message.substring(4);
        if (userID != 385936309463678976) {
            //GLOBAL
            if (message.toLowerCase().replace(" ", "").includes("feelsgoodman") && userID != 385936309463678976) {
                bot.sendMessage({
                    to: channelID,
                    message: "<:FeelsGoodMan:386215991975084033>"
                });
            }
            if (message.toLowerCase().includes("ty astra") && userID != 385936309463678976) {
                bot.sendMessage({
                    to: channelID,
                    message: "np"
                });
            }
            if (message.toLowerCase().includes("thx astra") && userID != 385936309463678976) {
                bot.sendMessage({
                    to: channelID,
                    message: "np"
                });
            }
            if (message.toLowerCase().includes("hi astra") && userID != 385936309463678976) {
                bot.sendMessage({
                    to: channelID,
                    message: "hi!"
                });
            }
            if (message.toLowerCase().includes("https://osu.ppy.sh/b/") && userID != 385936309463678976) {
                message = message + " ";
                beatmapid = message.substring(message.indexOf("sh/b/") + 5, message.length);
                var endofid = (beatmapid.match(/[^0-9]/)[0] == null) ? beatmapid.length : beatmapid.indexOf(beatmapid.match(/[^0-9]/)[0]);
                beatmapid = beatmapid.substring(0, endofid);
                httpsGet(osuBeatmapInfo(beatmapid), function (res) {
                    bot.sendMessage({
                        to: channelID,
                        message: "`" + res[0]["title"] + " - " + res[0]["artist"] + " (" + Math.floor(parseInt(res[0]["total_length"]) / 60) + ":" + (parseInt(res[0]["total_length"]) % 60) + ")`  Stars:`" + parseFloat(res[0]["difficultyrating"]).toPrecision(3) + "`  AR:`" + res[0]["diff_approach"] + "`  Creator:`" + res[0]["creator"] + "`"
                    });
                });
            }

            if (userID == 110143617699430400) {
                //trillian
                if (message.toLowerCase() == ".restart") {
                    bot.sendMessage({
                        to: channelID,
                        message: "Restarting!"
                    });
                    bot.disconnect();
                }
                if(message.toLowerCase().startsWith(".msg")){
                    bot.sendMessage({
                        to: args[0],
                        message: args[1]
                    });
                }
                if(message.toLowerCase().startsWith(".backup")){
                    bot.uploadFile({
                        to: 110143617699430400,
                        file: path.join(pathbase, guildName + '.json'),
                        message: "here's json"
                    });
                }
            }
            
            if (channelID == trillianAstra) {
                //TEST REALM
                logger.info(message);
                switch (cmd) {
                    case 'msg':
                        logger.info(cm + " .")
                        bot.sendMessage({
                            to: channelID,
                            message: channelID
                        });
                        break;
                    case 'test':
                        bot.sendMessage({
                            to: args[0],
                            message: args[1]
                        });
                        break;
                    case 'list':
                        bot.sendMessage({
                            to: channelID,
                            message: (args.length > 1) ? ((args.length > 2) ? "`.list metric class` or `.list metric`" : list(args[0], getClassId(args[1]))) : list(args[0])
                        });
                        break;
                    case 'remove':
                        bot.sendMessage({
                            to: channelID,
                            message: remove(args[0])
                        });
                        break;
                }
            }
            if (channelID == ventusBotChannel) {
                //VENTUS BOT CH COMMANDS
                if (message.substring(0, 1) == '.') {
                    var args = message.substring(1).split(' ');
                    var cmd = args[0];
                    args = args.splice(1);
                    switch (cmd) {
                        case 'cc':
                            setTimeout(function () {
                                bot.sendMessage({
                                    to: channelID,
                                    message: "<@" + userID + "> Your channel change cooldown is up!"
                                });
                            }, 15 * 60 * 1000);

                            bot.sendMessage({
                                to: channelID,
                                message: "Started channel change timer."
                            });
                            break;
                        case 'add':
                            logger.info("add");
                            bot.sendMessage({
                                to: channelID,
                                message: add(args, userID)
                            });
                            break;
                        case 'update':
                            bot.sendMessage({
                                to: channelID,
                                message: update(args, userID)
                            });
                            break;
                        case 'reroll':
                            bot.sendMessage({
                                to: channelID,
                                message: reroll(args, userID)
                            });
                            break;
                        case 'get':
                            bot.sendMessage({
                                to: channelID,
                                message: getPlayer(args)
                            });
                            break;
                        case 'help':
                            bot.sendMessage({
                                to: channelID,
                                message: help(args)
                            });
                            break;
                        case 'remove':
                            bot.sendMessage({
                                to: channelID,
                                message: remove(args[0], userID)
                            });
                            break;
                        case 'roll':
                            bot.sendMessage({
                                to: channelID,
                                message: roll(args)
                            });
                            break;
                        case 'lsga':
                            bot.sendMessage({
                                to: channelID,
                                message: lsga(args)
                            });
                            break;
                        case 'bargain':
                            bot.sendMessage({
                                to: channelID,
                                message: bargain(args)
                            });
                            break;
                        case 'lslvl':
                            bot.sendMessage({
                                to: channelID,
                                message: "Lifeskill level " + parseLifeskill(args[0])
                            });
                            break;
                        case 'list':
                            bot.sendMessage({
                                to: channelID,
                                message: list(args)
                            });
                            break;
                        case 'info':
                            bot.sendMessage({
                                to: channelID,
                                message: info()
                            });
                            break;

                        // add more commands here
                    }
                }
            }
        }
    }

    catch (err) {
        logger.info(err);
        bot.sendMessage({
            to: trillianAstra,
            message: "Error <@110143617699430400> \n" + err
        });
    }
});

function osuBeatmapInfo(bid) {
    var url = "https://osu.ppy.sh/api/get_beatmaps";
    url = buildUrl(url, {
        "k": osu_token,
        "b": bid,
        "m": 0,
        "limit": 1
    });
    logger.info(url);
    return url;
}
function backup(){
    
}
function buildUrl(url, parameters) {
    var qs = "";
    for (var key in parameters) {
        var value = parameters[key];
        qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
    }
    if (qs.length > 0) {
        qs = qs.substring(0, qs.length - 1); //chop off last "&"
        url = url + "?" + qs;
    }
    return url;
}
function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}
function httpsGet(url, callback) {
    var asdf;
    https.get(url, (res) => {
        logger.log('statusCode:', res.statusCode);
        logger.log('headers:', res.headers);


        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                logger.info("p: " + parsedData);
                callback(parsedData);
            } catch (e) {
                logger.error(e.message);
            }
        });

    }).on('error', (e) => {
        logger.error(e);
    });
}
function cut(str, cutStart, cutEnd) {
    return str.substr(0, cutStart) + str.substr(cutEnd + 1);
}
function parseLifeskill(str) {
    var tier = str.match(/[^0-9]+/)[0];
    var level = parseInt(str.match(/[0-9]+/));
    logger.info(tier + " " + level);
    if (tier.startsWith("g")) {
        level += 80;
    }
    if (tier.startsWith("m")) {
        level += 50;
    }
    if (tier.startsWith("ar")) {
        level += 40;
    }
    if (tier.startsWith("pro")) {
        level += 30;
    }
    if (tier.startsWith("s")) {
        level += 20;
    }
    if (tier.startsWith("ap")) {
        level += 10;
    }
    return level;
}
function lifeskillToString(start) {
    var int = parseInt(start);
    logger.info(Math.floor((int - 1) / 10));
    var lstnames = ["Beginner", "Apprentice", "Skilled", "Professional", "Artisan"];
    if (start < 51) {
        return lstnames[Math.floor((int - 1) / 10)] + " " + (int % 9);
    }
    else if (start < 81) {
        return "Master " + (start - 50);
    }
    return "Guru " + (start - 80);
}
function lsga(args) {
    str = "`.lsga StartingLifeskillLevel EndingLifeskillLevel`";
    var lstnames = ["Beginner", "Apprentice", "Skilled", "Professional", "Artisan", "Master"];
    if (args[1] == null) {

    }
    else {
        var start = 1;
        var end = 1;
        if (args[1].match(/[^0-9]/) != null || args[0].match(/[^0-9]/) != null) {
            start = parseLifeskill(args[0]);
            end = parseLifeskill(args[1]);
        }
        else {
            start = parseInt(args[0]);
            end = parseInt(args[1]);
        }
        var startName = lifeskillToString(start);
        var endName = lifeskillToString(end);
        var activity = 6;
        while (start < end) {
            activity += start * 6;
            start++;
        }
        str = activity + " guild activity gained from levelling up a lifeskill from " + startName + " to " + endName + ".";
    }
    return str;
}
function bargain(args) {
    str = "`.bargain tradeLevel`";
    if (args[0] == null) {

    }
    else {
        var key = ["cal", "med", "bal", "ser", "brass", "bronze", "steel", "iron", "copper"];
        var value = ["Calpheon", "Mediah", "Balenos", "Serendia", "Brass Ingot", "Bronze Ingot", "Steel Ingot", "Iron Ore", "Copper Ore"];
        var itemValue = (args[1]) ? args[1] : -1;
        var tradeLevel = 0;
        if (args[0].match(/[^0-9]/) != null) {
            tradeLevel = parseLifeskill(args[0]);
        }
        else {
            tradeLevel = parseInt(args[0]);
        }
        var bargainBonus = 105 + tradeLevel * 0.5;
        str = "At trading " + lifeskillToString(tradeLevel) + ", you have a " + bargainBonus + "% bargain bonus.";
    }
    return str;
}
function trade(args) {
    //item tradelevel (distance)


}
function getById(key, userID) {
    var ventus = JSON.parse(fs.readFileSync(path.join(pathbase, guildName + '.json'), "utf8"));
    for (var k in ventus) {
        if (ventus[k]["discordid"] == userID) {
            return ventus[k][key];
        }
    }
    return -1;
}
function getFaBy(key, value) {
    var ventus = JSON.parse(fs.readFileSync(path.join(pathbase, guildName + '.json'), "utf8"));
    for (var k in ventus) {
        if (ventus[k][key] == value) {
            return ventus[k]["fa"];
        }
    }
    return -1;
}
function update(args, userID) {
    //ap dp level
    logger.info(args.length);
    if (args.length != 3) {
        if (args.length == 0) {
            return "`.update ap dp level`";
        }
        else {
            if (args.length==4&&matcha(officers, userID) > -1) {
                userID = args[0];
            }
            else {
                return "`.update ap dp level`";
            }
        }

    }
    else if (args[0].match(/[^0-9]/) != null) {
        return "AP must be a number.\n\"" + args[5].match(/[^0-9]/)[0] + "\"";
    }
    else if (args[1].match(/[^0-9]/) != null) {
        return "DP must be a number.\n\"" + args[5].match(/[^0-9]/)[0] + "\"";
    }
    else if (args[2].match(/[^0-9]/) != null) {
        return "Level must be a number.\n\"" + args[5].match(/[^0-9]/)[0] + "\"";
    }
    var ventus = JSON.parse(fs.readFileSync(path.join(pathbase, guildName + '.json'), "utf8"));
    try {
        var family = getFaBy("discordid", userID).toLowerCase();
    }
    catch (err) {
        return "User not found.";
    }
    try {
        ventus[family]["ap"] = parseInt(args[0]);
        ventus[family]["dp"] = parseInt(args[1]);
        ventus[family]["level"] = parseInt(args[2]);
        ventus[family]["gs"] = parseInt(args[0]) + parseInt(args[1]);
        fs.writeFile(path.join(pathbase, guildName + '.json'), JSON.stringify(ventus), 'utf8');
    }
    catch (err) {
        logger.info(userID);
        return -1;
    }
    return "Updated the " + ventus[family]["fa"] + " family successfully.";
}

function reroll(args, userID) {
    //char ap dp level class

    var ventus = JSON.parse(fs.readFileSync(path.join(pathbase, guildName + '.json'), "utf8"));
    //if char exists

    if (args[4] == null || args[5]) {
        return "incorrect format: `.reroll characterName ap dp level class`";
    }
    else if (getFaBy("ch", args[0].toLowerCase()) != -1) {
        if (getFaBy("ch", args[0].toLowerCase()) != getById("fa", userID)) {
            return "You are not the " + getFaBy("ch", args[0].toLowerCase()) + " family.";
        }
        else {
            return "Use the `.update` command to update your gs.";
        }
    }
    else if (args[0].match(/[^0-9a-zA-Z_]/) != null) {
        return "Character name cannot contain special characters.\n\"" + args[5].match(/[^0-9a-zA-Z_]/)[0] + "\"";
    }
    else if (args[1].match(/[^0-9]/) != null) {
        return "AP must be a number.\n\"" + args[5].match(/[^0-9]/)[0] + "\"";
    }
    else if (args[2].match(/[^0-9]/) != null) {
        return "DP must be a number.\n\"" + args[5].match(/[^0-9]/)[0] + "\"";
    }
    else if (args[3].match(/[^0-9]/) != null) {
        return "Level must be a number.\n\"" + args[5].match(/[^0-9]/)[0] + "\"";
    }
    else if (args[4].match(/[^a-zA-Z_]/) != null) {
        return "Class name cannot contain special characters. \n\"" + args[5].match(/[^a-zA-Z_]/)[0] + "\"";
    }
    var ventus = JSON.parse(fs.readFileSync(path.join(pathbase, guildName + '.json'), "utf8"));
    var family = getFaBy("discordid", userID).toLowerCase();
    try {
        ventus[family]["ch"] = args[0];
        ventus[family]["ap"] = parseInt(args[1]);
        ventus[family]["dp"] = parseInt(args[2]);
        ventus[family]["level"] = parseInt(args[3]);
        ventus[family]["classid"] = getClassId(args[4]);
        ventus[family]["gs"] = parseInt(args[1]) + parseInt(args[2]);
        fs.writeFile(path.join(pathbase, guildName + '.json'), JSON.stringify(ventus), 'utf8');
    }
    catch (err) {
        logger.info(userID);
        return -1;
    }
    return "Rerolled the " + getFaBy("discordid", userID) + " family to " + getClassName(getClassId(args[4])) + " successfully.";
}
var fs = require('fs');
function addAdmin(args) {

    if (args[5] == null) {
        return "incorrect format: `.add family character ap dp level class discordID`";
    }
    else if (args[0].match(/[^0-9a-zA-Z_]/) != null) {
        return "Family name cannot contain special characters.\n\"" + args[5].match(/[^0-9a-zA-Z_]/)[0] + "\"";
    }
    else if (args[1].match(/[^0-9a-zA-Z_]/) != null) {
        return "Character name cannot contain special characters.\n\"" + args[5].match(/[^0-9a-zA-Z_]/)[0] + "\"";
    }
    else if (args[2].match(/[^0-9]/) != null) {
        return "AP must be a number.\n\"" + args[5].match(/[^0-9]/)[0] + "\"";
    }
    else if (args[3].match(/[^0-9]/) != null) {
        return "DP must be a number.\n\"" + args[5].match(/[^0-9]/)[0] + "\"";
    }
    else if (args[4].match(/[^0-9]/) != null) {
        return "Level must be a number.\n\"" + args[5].match(/[^0-9]/)[0] + "\"";
    }
    else if (args[5].match(/[^a-zA-Z_]/) != null) {
        return "Class name cannot contain special characters. \n\"" + args[5].match(/[^a-zA-Z_]/)[0] + "\"";
    }
    else if (args[6].match([/^0-9]/]) != null) {
        if (args[6].length < 18) {
            return "Discord ID must be 18 digits.";
        }
        return "Discord ID must be a number. \n\"" + args[5].match(/[^a-zA-Z_]/)[0] + "\"";
    }
    var ventus = JSON.parse(fs.readFileSync(path.join(pathbase, guildName + '.json'), "utf8"));
    if (ventus[args[0]]) {
        return "The " + ventus[args[0]]["fa"] + " family already exists.";
    }
    else {
        var gs = parseInt(args[2]) + parseInt(args[3]);
        var classid = getClassId(args[5]);
        if (classid == -1) {
            return "I'm not sure what class that is.";
        }
        logger.info("initialize newaccount");
        var newAccount = { "fa": args[0], "ch": args[1], "ap": parseInt(args[2]), "dp": parseInt(args[3]), "gs": gs, "level": parseInt(args[4]), "classid": classid, "discordid": args[6] }
        //var tostring = newAccount.fa+"("+newAccount.ch+") AP:"+newAccount.ap+" DP:"+newAccount.dp+" GS:"+newAccount.gs+" Level:"+newAccount.level+" Class: "+newAccount.classid;
        logger.info("starting add");
        ventus[newAccount.fa.toLowerCase()] = newAccount;
        fs.writeFile(path.join(pathbase, guildName + '.json'), JSON.stringify(ventus), 'utf8');
        return "The " + ventus[newAccount.fa.toLowerCase()]["fa"] + " family has been added and linked to <@" + args[6] + ">";
    }

}
function add(args, userID) {
    if (getById("fa", userID) != -1) {
        if (args[6]) {
            if (matcha(officers, userID) > -1) {
                return addAdmin(args);
            }
        }
        if (matcha(officers, userID) > -1) {
            return "Add their Discord ID at the end of the `.add` command to add a member.";
        }
        return "Use the `.update` or `.reroll` command to update your info.";
    }
    if (args[5] == null || args[6]) {
        return "incorrect format: `.add family character ap dp level class`";
    }
    else if (args[0].match(/[^0-9a-zA-Z_]/) != null) {
        return "Family name cannot contain special characters.\n\"" + args[5].match(/[^0-9a-zA-Z_]/)[0] + "\"";
    }
    else if (args[1].match(/[^0-9a-zA-Z_]/) != null) {
        return "Character name cannot contain special characters.\n\"" + args[5].match(/[^0-9a-zA-Z_]/)[0] + "\"";
    }
    else if (args[2].match(/[^0-9]/) != null) {
        return "AP must be a number.\n\"" + args[5].match(/[^0-9]/)[0] + "\"";
    }
    else if (args[3].match(/[^0-9]/) != null) {
        return "DP must be a number.\n\"" + args[5].match(/[^0-9]/)[0] + "\"";
    }
    else if (args[4].match(/[^0-9]/) != null) {
        return "Level must be a number.\n\"" + args[5].match(/[^0-9]/)[0] + "\"";
    }
    else if (args[5].match(/[^a-zA-Z_]/) != null) {
        return "Class name cannot contain special characters. \n\"" + args[5].match(/[^a-zA-Z_]/)[0] + "\"";
    }

    var ventus = JSON.parse(fs.readFileSync(path.join(pathbase, guildName + '.json'), "utf8"));
    if (ventus[args[0]]) {
        return "The " + ventus[args[0]]["fa"] + " family already exists.";
    }
    else {
        var gs = parseInt(args[2]) + parseInt(args[3]);
        var classid = getClassId(args[5]);
        var uid = userID;
        if (classid == -1) {
            return "I'm not sure what class that is.";
        }
        logger.info("initialize newaccount");
        var newAccount = { "fa": args[0], "ch": args[1], "ap": parseInt(args[2]), "dp": parseInt(args[3]), "gs": gs, "level": parseInt(args[4]), "classid": classid, "discordid": uid }
        //var tostring = newAccount.fa+"("+newAccount.ch+") AP:"+newAccount.ap+" DP:"+newAccount.dp+" GS:"+newAccount.gs+" Level:"+newAccount.level+" Class: "+newAccount.classid;
        logger.info("starting add");
        ventus[newAccount.fa.toLowerCase()] = newAccount;
        fs.writeFile(path.join(pathbase, guildName + '.json'), JSON.stringify(ventus), 'utf8');
        return "added the " + args[0] + " family successfully.";
    }
    return "error <@110143617699430400>";
}

function getClassName(id) {
    return classnames[id];
}
function getClassId(str) {
    str = str.toLowerCase();

    //   logger.info(classnames.length+" "+classnicks.length);
    for (var i = 0; i < classnames.length; i++) {
        if (matcha(classnicks[i].split(","), str) > -1) {
            return i;
        }
        // logger.info(i+": "+classnicks[i]+" "+matcha(classnicks[i].split(","),str));
    }
    return -1;
}
function matcha(arr, str) {
    for (var i = 0; i < arr.length; i++) {
        if (str.match(arr[i]) != null) {
            return i;
        }
    }
    return -1;
}

//ex getStat("ap",str)
function getStat(stat, data) {
    try {
        return JSON.parse(data)[stat.toLowerCase()];
    }
    catch (err) {
        //logger.info(err);
        return "undefined";
    }
}
function getPlayer(args) {
    var player = JSON.parse(fs.readFileSync(path.join(pathbase, guildName + '.json'), "utf8"))[a[0].toLowerCase()];

    return player.fa + "(" + player.ch + ") - AP:**" + player.ap + "** DP:**" + player.dp + "** GS:**" + player.gs + "** Level:**" + player.level + "** Class: **" + getClassName(player.classid) + "**";
}
function playerToString(fa) {
    player = JSON.parse(fs.readFileSync(path.join(pathbase, guildName + '.json'), "utf8"))[fa + ""];
    return player.fa + "(" + player.ch + ") - AP:**" + player.ap + "** DP:**" + player.dp + "** GS:**" + player.gs + "** Level:**" + player.level + "** Class: **" + getClassName(player.classid) + "**";
}
function parsedToString(player) {
    return player["fa"] + "(" + player["ch"] + ") - AP:**" + player["ap"] + "** DP:**" + player["dp"] + "** GS:**" + player["gs"] + "** Level:**" + player["level"] + "** Class: **" + getClassName(player.classid) + "**";
}
function parsedTableString(player, addClassName) {
    var name = player["fa"] + "(" + player["ch"] + ")";
    var ap = player["ap"] + "";
    var dp = player["dp"] + "";
    var gs = player["gs"] + "";
    var level = player["level"] + "";
    var namepad = 30;
    return name.padEnd(namepad) + " " + ap.padEnd(4) + " | " + dp.padEnd(4) + " | " + gs.padEnd(4) + " | " + level.padEnd(3) + " | " + ((addClassName == 1) ? getClassName(player.classid) : "");


}
function info() {
    var avg = 0;
    var ct = 0;
    var lowest = 700;
    var highest = 0;
    var lowestName;
    var highestName;
    var json = JSON.parse(fs.readFileSync(path.join(pathbase, guildName + '.json'), "utf8"));
    for (var key in json) {
        ct++;
        avg += (isNaN(parseInt(json[key]["gs"]))) ? 0 : parseInt(json[key]["gs"]);
        currentGS = parseInt(json[key]["gs"]);
        if (currentGS < lowest) {
            lowest = currentGS;
            lowestName = json[key]["fa"] + "(" + json[key]["ch"] + ")";
        }
        if (currentGS > highest) {
            highest = currentGS;
            highestName = json[key]["fa"] + "(" + json[key]["ch"] + ")";
        }
    }
    avg = avg / ct;
    avg = avg.toPrecision(5);
    lowestStr = ("Lowest GS: **" + lowest + "** ").padEnd(15) + lowestName + "\n";
    highestStr = ("Highest GS: **" + highest + "** ").padEnd(15) + highestName + "\n";
    return "Members: **" + ct + "**\nAverage: **" + avg + "**\n" + lowestStr + highestStr;

}

function remove(str, userID) {
    var ventus = JSON.parse(fs.readFileSync(path.join(pathbase, guildName + '.json'), "utf8"));
    if (matcha(officers, userID) == -1) {
        if (getById("fa", userID).toLowerCase() != str.toLowerCase()) { // if attempted remove is not your own
            return "You can only remove your own family, " + getById("fa", userID) + ".";
        }
        else {
            if (ventus[str]) {
                var ret = "Member " + getById("fa", userID) + " has removed their family.";
                delete ventus[str];
                fs.writeFile(path.join(pathbase, guildName + '.json'), JSON.stringify(ventus), 'utf8');
                return ret;
            }
            else {
                return str + " family not found.";
            }
        }
    }
    else { //officer remove
        if (ventus[str]) {
            delete ventus[str];
            fs.writeFile(path.join(pathbase, guildName + '.json'), JSON.stringify(ventus), 'utf8');
            return "Officer" + getById("fa", userID) + " has removed the " + str + " family.";
        }
        else {
            return str + " family not found.";
        }
    }
    return "error";
}
function list(args) {

    if (args.length == 1) {

        if (matcha(["lvl", "levl", "lv", "lev", "growth"], args[0]) >= 0) {
            args[0] = "level";
        }
        if (matcha(["ap", "dp", "level", "gs"], args[0]) > -1) {
            //sort all by args[0]
            return listt(args[0], -1);
        }
        else {
            //list all args[0] by gs
            return listt("gs", getClassId(args[0]));
        }
    }
    else if (args.length == 2) {
        if (matcha(["ap", "dp", "level", "gs"], args[0]) > -1) {
            return listt(args[0], getClassId(args[1]));
        }
        else {
            return listt(args[1], getClassId(args[0]));
        }
    }
    return listt("gs", -1);
}
function listn(metric) {
    if (metric.length == 0) {
        return listt("all", -1);
    }
    else {
        return listt(metric[0], -1);
    }
    return "Error <@110143617699430400>";
}
function listt(metric, cid) {

    metric = metric.toString().toLowerCase();
    if (matcha(["lvl", "levl", "lv", "lev", "growth"], metric) >= 0) {
        metric = "level";
    }
    else if (matcha(["ap", "dp", "level", "gs"], metric) < 0) {
        return "\"" + metric + "\" is not a valid metric for comparison.";
    }
    var str = "Guild Member Rankings sorted by **" + ((metric == "level") ? "Level" : metric.toUpperCase()) + "**\n";
    if (cid >= 0) { //filter only classes
        str = "**" + getClassName(cid) + "** Rankings sorted by **" + ((metric == "level") ? "Level" : metric.toUpperCase()) + "**\n";
    }
    else {
        cid = null;
    }

    var sorted = new Array();

    var json = JSON.parse(fs.readFileSync(path.join(pathbase, guildName + '.json'), "utf8"));
    for (var key in json) {
        sorted.push(json[key]);
    }
    for (var i = 1; i < sorted.length; i++) {
        var temp = sorted[i];
        for (var j = i - 1; j >= 0 && parseInt(sorted[j][metric]) < parseInt(temp[metric]); j--) {
            sorted[j + 1] = sorted[j];
        }
        sorted[j + 1] = temp;
    }
    str += "```Name(Family)                   AP     DP     GS     LVL    Class\n________________________________________________________________\n";
    //add ascend/decend functionality here
    //sorted should be full of objects at this point
    for (var i = 0; i < sorted.length; i++) {
        try {
            if (cid != null) {
                if (sorted[i]["classid"] == cid) {
                    //replace with table formatted playertostring
                    str += parsedTableString(sorted[i]) + "\n";
                }
            }
            else {
                //replace with table formatted playertostring
                str += parsedTableString(sorted[i], 1) + "\n";
            }
        }
        catch (err) {
            logger.info(err + " error");
        }
    }
    str += "```";
    return str;
}
function roll(args) {
    if (isNaN(args[0])) {
        return Math.floor(Math.random() * 101);
    }
    if (isNaN(args[1])) {
        return Math.floor(Math.random() * parseInt(args[0]));
    }
    else if (parseInt(args[1]) == 0) {
        return "0";
    }
    return parseInt(args[0]) + Math.floor(Math.random() * (parseInt(args[1]) - parseInt(args[0]) + 1));
}
function help(args) {
    var r = "cc add update reroll help remove roll lsga list info get";
    switch (args[0]) {
        case 'add':
            r = "`.add family character ap dp level class`\nor `.add family character ap dp level class discordID`\nAdds a new family to the guild.";
            break;
        case 'get':
            r = "`.get family`\nGets details of a family in the guild.";
            break;
        case 'list':
            r = "`.list metric`\n`.list class`\n`.list metric class`\n`.list class metric`\n Lists members in certain ways.";
            break;
        case 'update':
            r = "`.update ap dp level`\nUpdates your GS and level.";
            break;
        case 'reroll':
            r = "`.reroll character ap dp level class`\nUpdates with a new character reroll.";
            break;
        case 'remove':
            r = "`.remove family`\nRemoves yourself from the guild, or removes anyone if you're an officer";
            break;
        case 'roll':
            r = "`.roll range`\n`roll min max`\n RNG";
            break;
        case 'cc':
            r = "`.cc` \nTags you in 15 minutes.";
            break;
        case 'lsga':
            r = "`.lsga` \nLifeSkill Levelups to Guild Activity calculator.";
            break;
        //add help
    }
    return r;

}
