import "babel-polyfill";

import {
  BOT_TOKEN,
  CHANNEL_ID,
  MONGO_DB_HOST
} from './constants/config';

import {
  Member
} from './classes/member';

// This is a hack to define padEnd function for String
// ES7 removes from its specs
if (!String.prototype.padEnd) {
    String.prototype.padEnd = function padEnd(targetLength,padString) {
        targetLength = targetLength>>0; //floor if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return String(this) + padString.slice(0,targetLength);
        }
    };
}

const Discord = require('discord.js');
const logger = require('winston');

const osu_token = process.env.osuapi;

const path = require('path');
const https = require('https');
const mongodb = require('mongodb');

const guildName = "ventus";

const trillianAstra = 387326440607186947;
const pathbase = ".";//"C:\\Users\\astra\\Desktop\\ventus";
const officers = [
    "229422191362441216",
    "223993765398970368",
    "110143617699430400",
    "110565709414690816",
    "100711732757938176",
    "233826421489795072",
    "163807302061785088"
];

const classnicks = [
  "zerker,zerk,berserker,zk,giant",
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
  "wiz,wizard,wizzy,shiny,harrypotter,wizerd"
];

const groupnames = [
  "Caster",
  "Blader"
];

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
const bot = new Discord.Client();

bot.on('ready', function () {
  logger.info('Connected');
});

bot.login(BOT_TOKEN);

bot.on('disconnect', function (erMsg, code) {
    logger.info('Disconnected');
    logger.info(code + " " + erMsg);
});

bot.on('message', messageObj => {
  logger.info('message received');
  
  let message = messageObj.content;
  let discordId = messageObj.member.id;
  const channelId = messageObj.channel.id;

  try {
    while(message.includes("  ")){
      message = message.replace("  "," ");
    }

    let args = message.substring(1).split(' ');
    let cmd = args[0].toLowerCase();
    args = args.splice(1);
    let cm = message.substring(4);

    // channel specific commands
    if (channelId == CHANNEL_ID && message.substring(0, 1) == '.') {
      let args = message.substring(1).split(' ');
      let cmd = args[0].toLowerCase();
      args = args.splice(1);

      Member.perform(cmd, discordId, args, (result) => {
        messageObj.channel.send(result);
      });
    }
  } catch(err) {
    logger.info(err);
  }
});

// bot.on('message', messageObj => {
//     // Our bot needs to know if it will execute a command
//     // It will listen for messages that will start with `!`
//     let message = messageObj.content;
//     let userID = messageObj.member.id;
    
//     try {
//         while(message.includes("  ")){
//            message = message.replace("  "," ");
//         }
        
//         let args = message.substring(1).split(' ');
//         let cmd = args[0].toLowerCase();
//         args = args.splice(1);
//         let cm = message.substring(4);

//         if (userID != 385936309463678976) {
//             //GLOBAL
//             if (message.toLowerCase().replace(" ", "").includes("feelsgoodman") && userID != 385936309463678976) {
//                 bot.sendMessage({
//                     to: channelID,
//                     message: "<:FeelsGoodMan:386215991975084033>"
//                 });
//             }
//             if(message.startsWith(".roll") && userID != 385936309463678976){
//                 bot.sendMessage({
//                     to: channelID,
//                     message: roll(args)
//                 });
//             }
//             if (message.toLowerCase().includes("ty astra") && userID != 385936309463678976) {
//                 bot.sendMessage({
//                     to: channelID,
//                     message: "np"
//                 });
//             }
//             if (message.toLowerCase().includes("thx astra") && userID != 385936309463678976) {
//                 bot.sendMessage({
//                     to: channelID,
//                     message: "np"
//                 });
//             }
//             if (message.toLowerCase().includes("hi astra") && userID != 385936309463678976) {
//                 bot.sendMessage({
//                     to: channelID,
//                     message: "hi!"
//                 });
//             }
//             if (message.toLowerCase().includes("https://osu.ppy.sh/b/") && userID != 385936309463678976) {
//                 message = message + " ";
//                 let beatmapid = message.substring(message.indexOf("sh/b/") + 5, message.length);
//                 let endofid = (beatmapid.match(/[^0-9]/)[0] == null) ? beatmapid.length : beatmapid.indexOf(beatmapid.match(/[^0-9]/)[0]);
//                 beatmapid = beatmapid.substring(0, endofid);
//                 httpsGet(osuBeatmapInfo(beatmapid), function (res) {
//                     bot.sendMessage({
//                         to: channelID,
//                         message: "`" + res[0]["title"] + " - " + res[0]["artist"] + " (" + Math.floor(parseInt(res[0]["total_length"]) / 60) + ":" + (parseInt(res[0]["total_length"]) % 60) + ")`  Stars:`" + parseFloat(res[0]["difficultyrating"]).toPrecision(3) + "`  AR:`" + res[0]["diff_approach"] + "`  Creator:`" + res[0]["creator"] + "`"
//                     });
//                 });
//             }

//             if (userID == 110143617699430400) {
//                 //trillian
//                 if (message.toLowerCase() == ".restart") {
//                     bot.sendMessage({
//                         to: channelID,
//                         message: "Restarting!"
//                     });
//                     bot.disconnect();
//                 }
//                 if(message.toLowerCase().startsWith(".msg")){
//                     bot.sendMessage({
//                         to: args[0],
//                         message: args[1]
//                     });
//                 }
//                 if(message.toLowerCase().startsWith(".backup")){
//                     bot.uploadFile({
//                         to: 110143617699430400,
//                         file: path.join(pathbase, guildName + '.json'),
//                         message: "here's json"
//                     });
//                 }
//             }
            
//             if (channelID == trillianAstra) {
//                 //TEST REALM
//                 logger.info(message);
//                 switch (cmd) {
//                     case 'msg':
//                         logger.info(cm + " .")
//                         bot.sendMessage({
//                             to: channelID,
//                             message: channelID
//                         });
//                     break;
//                     case 'get':
//                         bot.sendMessage({
//                             to: channelID,
//                             message: getPlayer(args,userID)
//                         });
//                     break;
//                     case 'lsga':
//                         bot.sendMessage({
//                             to: channelID,
//                             message: lsga(args)
//                         });
//                     break;
//                     case 'list':
//                         const messages = list(args);
//                         bot.sendMessage({
//                             to: channelID,
//                             message: messages
//                         });
//                     break;
//                     case 'remove':
//                         bot.sendMessage({
//                             to: channelID,
//                             message: remove(args[0])
//                         });
//                     break;
//                     case 'addpic':
                    
//                         if(args.length>0){
//                             let fam = addPicture(args,userID);
//                             bot.sendMessage({
//                                 to: channelID,
//                                 message: (fam.length>3)?"Successfully attached picture to the "+fam+" family.":"Error adding picture <@110143617699430400>"
//                             });
//                         }
//                         else{
//                             bot.sendMessage({
//                                 to: channelID,
//                                 message: "Please use a URL to attach picture."
//                             });
//                         }
//                     break;
//                     case 'test':
//                          let ventus = getJSON(guildName);
//                          let memberstr = "";
//                          for(let fa in ventus){
//                             memberstr+=ventus[fa]["discordid"]+" ";
//                          }
//                          logger.info(memberstr);
//                         bot.sendMessage({
//                             to: channelID,
//                             message: 1
//                         });
//                     break;
//                     case 'saveb':
//                         savebeta(getJSON(guildName));
//                         bot.sendMessage({
//                             to: channelID,
//                             message: "saved"
//                         });
//                     break;
//                 }
//             }
//             if (channelID == CHANNEL_ID) {
//                 //VENTUS BOT CH COMMANDS
//                 logger.info(message);
//                 if (message.substring(0, 1) == '.') {
//                     let args = message.substring(1).split(' ');
//                     let cmd = args[0].toLowerCase();
//                     args = args.splice(1);
//                     switch (cmd) {
//                         case 'cc':
//                             setTimeout(function () {
//                                 bot.sendMessage({
//                                     to: channelID,
//                                     message: "<@" + userID + "> Your channel change cooldown is up!"
//                                 });
//                             }, 15 * 60 * 1000);

//                             bot.sendMessage({
//                                 to: channelID,
//                                 message: "Started channel change timer."
//                             });
//                             break;
//                         case 'add':
//                           add(args, userID, (result) => {
//                             bot.sendMessage({
//                               to: channelID,
//                               message: result
//                             });
//                           });
//                           break;
//                         case 'get':
//                           get(userID, (message) => {
//                             messageObj.channel.send(message);
//                           });
//                           break;
//                         case 'update':
//                           update(args, userID, (message) => {
//                             bot.sendMessage({
//                               to: channelID,
//                               message: message
//                             });
//                           });
//                           break;
//                         case 'list':
//                           list(args, (results) => {
//                             bot.sendMessage({
//                               to: channelID,
//                               message: results
//                             });
//                           })
//                           break;
//                         case 'addpic':
//                             let fam = addPicture(args,userID);
//                             bot.sendMessage({
//                                 to: channelID,
//                                 message: (fam.length>3)?"Successfully attached picture to the "+fam+" family.":"Error adding picture <@110143617699430400>"
//                             });
//                             break;
//                         case 'reroll':
//                             bot.sendMessage({
//                                 to: channelID,
//                                 message: reroll(args, userID)
//                             });
//                             break;
                        
//                         case 'help':
//                             bot.sendMessage({
//                                 to: channelID,
//                                 message: help(args)
//                             });
//                             break;
//                         case 'remove':
//                             bot.sendMessage({
//                                 to: channelID,
//                                 message: remove(args[0], userID)
//                             });
//                             break;
//                         case 'roll':
//                             bot.sendMessage({
//                                 to: channelID,
//                                 message: roll(args)
//                             });
//                             break;
//                         case 'lsga':
//                             bot.sendMessage({
//                                 to: channelID,
//                                 message: lsga(args)
//                             });
//                             break;
//                         case 'bargain':
//                             bot.sendMessage({
//                                 to: channelID,
//                                 message: bargain(args)
//                             });
//                             break;
//                         case 'lslvl':
//                             bot.sendMessage({
//                                 to: channelID,
//                                 message: "Lifeskill level " + parseLifeskill(args[0])
//                             });
//                             break;
//                         case 'info':
//                             bot.sendMessage({
//                                 to: channelID,
//                                 message: info()
//                             });
//                             break;
//                         case 'test':
//                                 let serverid = "384475247723806722"; //384475247723806722
//                                 let ventus = getJSON(guildName);
//                                 let smembers = bot.servers[serverid].members;
//                                 let sids = [];
//                                 let sidstring = "";
//                                 let reps = "";
//                                 let bugs = 0;
//                                 for(let i in smembers){
//                                     let currentID = smembers[i].id.toString().substring(0,15);
//                                     for(let fa in ventus){
//                                         if(ventus[fa]["discordid"].startsWith(currentID)&&ventus[fa]["discordid"]!=smembers[i].id){
//                                             reps += ventus[fa]["fa"]+", ";
//                                             bugs++;
//                                         }
//                                     }
//                                     sids.push(smembers[i].id);
//                                     sidstring+=smembers[i].id+" ";
//                                 }
//                                 logger.info(reps);
//                                 bot.sendMessage({
//                                     to: channelID,
//                                     message: bugs
//                                 });
//                             break;
//                         // add more commands here
//                     }
//                 }
//             }
//         }
//         else if(userID==385936309463678976){
//             if(messageQueue.length>0){
//                 bot.sendMessage({
//                     to: channelID,
//                     message: messageQueue.shift()
//                 });
//             }
//         }
//     }

//     catch (err) {
//       logger.info(err);
//       messageObj.channel.send(err);
//     }
// });


function osuBeatmapInfo(bid) {
    let url = "https://osu.ppy.sh/api/get_beatmaps";
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
    let qs = "";
    for (let key in parameters) {
        let value = parameters[key];
        qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
    }
    if (qs.length > 0) {
        qs = qs.substring(0, qs.length - 1); //chop off last "&"
        url = url + "?" + qs;
    }
    return url;
}
function httpGet(theUrl) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}
function httpsGet(url, callback) {
    let asdf;
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
    //lifeskill name of any format to int
    let tier = str.match(/[^0-9]+/)[0];
    let level = parseInt(str.match(/[0-9]+/)[0]);
    logger.info("tier:" +tier + " level:" + level);
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
    //lifeskill level of int format to string
    let level = parseInt(start);
    logger.info(Math.floor((level - 1) / 10));
    let lstnames = ["Beginner", "Apprentice", "Skilled", "Professional", "Artisan"];
    if (start < 51) {
        return lstnames[Math.floor((level - 1) / 10)] + " " + (level % 9);
    }
    else if (start < 81) {
        return "Master " + (start - 50);
    }
    return "Guru " + (start - 80);
}
function lsga(args) {
    let str = "`.lsga StartingLifeskillLevel EndingLifeskillLevel`";
    let lstnames = ["Beginner", "Apprentice", "Skilled", "Professional", "Artisan", "Master"];
    if (args[1] == null) {

    }
    else {
        let start = 1;
        let end = 1;
        if (args[1].match(/[^0-9]/) != null || args[0].match(/[^0-9]/) != null) {
            start = parseLifeskill(args[0]);
            end = parseLifeskill(args[1]);
        }
        else {
            start = parseInt(args[0]);
            end = parseInt(args[1]);
        }
        let startName = lifeskillToString(start);
        let endName = lifeskillToString(end);
        let activity = 6;
        while (start < end) {
            activity += start * 6;
            start++;
        }
        str = activity + " guild activity gained from levelling up a lifeskill from " + startName + " to " + endName + ".";
    }
    return str;
}
function fixjson(){
}
function bargain(args) {
    let str = "`.bargain tradeLevel`";
    if (args[0] == null) {

    }
    else {
        let key = ["cal", "med", "bal", "ser", "brass", "bronze", "steel", "iron", "copper"];
        let value = ["Calpheon", "Mediah", "Balenos", "Serendia", "Brass Ingot", "Bronze Ingot", "Steel Ingot", "Iron Ore", "Copper Ore"];
        let itemValue = (args[1]) ? args[1] : -1;
        let tradeLevel = 0;
        if (args[0].match(/[^0-9]/) != null) {
            tradeLevel = parseLifeskill(args[0]);
        }
        else {
            tradeLevel = parseInt(args[0]);
        }
        let bargainBonus = 105 + tradeLevel * 0.5;
        str = "At trading " + lifeskillToString(tradeLevel) + ", you have a " + bargainBonus + "% bargain bonus.";
    }
    return str;
}
function trade(args) {
    //item tradelevel (distance)


}
function getById(key, userID) {
    let uid = userID.toString();
    let ventus = getJSON(guildName);
    logger.info(userID);
    for (let k in ventus) {
        if (ventus[k]["discordid"].toString().match(uid)) {
            return ventus[k][key];
        }
    }
    return -1;
}
function getFaBy(key, value) {
    let ventus = getJSON(guildName);
    for (let k in ventus) {
        if (ventus[k][key] == value) {
            return ventus[k]["fa"];
        }
    }
    return "-1";
}

let fs = require('fs');
function createdb(){
    mongodb.connect(MONGO_DB_HOST, function(err, db) {
        if (err) throw err;
        logger.info("Database created!");
        db.close();
    });
}
function insert(){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("mydb");
        let gsbot = getJSON(guildName);
        dbo.collection("gs").insertOne(gsbot, function(err, res) {
          if (err){ throw err};
          logger.info("1 document inserted");
          db.close();
        });
      });
}
function save(str){
    fs.writeFile(path.join(pathbase, guildName + '.json'), JSON.stringify(str), 'utf8');
    /*
    //get json from ephemeral
    let thedata = JSON.parse(fs.readFileSync(path.join(pathbase, gname + '.json'), "utf8"));
    //save to mongo
    mongodb.connect(MONGO_DB_HOST, function(err,db){
        if (err) throw err;
        let dbo = db.db("mydb");
        dbo.collection("gsbot").updateOne()
    });*/
    return 1;
}
function savebeta(str){
    fs.writeFile(path.join(pathbase, guildName + '.json'), JSON.stringify(str), 'utf8');
    
    //get json from ephemeral
    let thedata = str;
    //save to mongo
    mongodb.connect(MONGO_DB_HOST, function(err,db){
        if (err) throw err;
        let dbo = db.db("mydb");
        dbo.collection("gsbot").updateOne({},thedata,function(err,res){
            logger.info("1 document updated");
        });
    });
    return 1;
}

function getJSON(gname){
    /*
    //get json from mongo
    let ventus = 
    dbo.collection("gs").find(query).toArray(function(err, result) {
    if (err) throw err;
        console.log(result);
        db.close();
    });
    return ventus;
    */
    return JSON.parse(fs.readFileSync(path.join(pathbase, gname + '.json'), "utf8"));
}
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
        
    }
    let ventus = getJSON(guildName);
    if (ventus[args[0]]) {
        return "The " + ventus[args[0]]["fa"] + " family already exists.";
    }
    else {
        let gs = parseInt(args[2]) + parseInt(args[3]);
        let classid = getClassId(args[5]);
        if (classid == -1) {
            return "I'm not sure what class that is.";
        }
        let did = args[6].match(/[0-9]+/)[0];
        logger.info("initialize newaccount");
        let newAccount = { "fa": args[0], "ch": args[1], "ap": parseInt(args[2]), "dp": parseInt(args[3]), "gs": gs, "level": parseInt(args[4]), "classid": classid, "discordid": did, "img":"" }
        //let tostring = newAccount.fa+"("+newAccount.ch+") AP:"+newAccount.ap+" DP:"+newAccount.dp+" GS:"+newAccount.gs+" Level:"+newAccount.level+" Class: "+newAccount.classid;
        logger.info("starting add");
        ventus[newAccount.fa.toLowerCase()] = newAccount;
        save(ventus);
        return "The " + ventus[newAccount.fa.toLowerCase()]["fa"] + " family has been added and linked to <@" + did + ">";
    }

}

function getCharacterAttrs(args) {
    return {
        level: parseInt(args[4]),
        awk_ap: parseInt(args[2]),
        dp: parseInt(args[3]),
        family_name: args[0],
        character_name: args[1],
        class_name: args[5],
        gear_score: parseInt(args[2]) + parseInt(args[3])
    };
}

function xadd(args, userID) {
    if (getById("fa", userID) != -1) {
        if (args[6]) {
            if (matcha(officers, userID) > -1) {
                return addAdmin(args);
            }
        }
        if (matcha(officers, userID) > -1) {
            return "Officers can add their Discord ID at the end of the `.add` command to add a member.";
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

    let ventus = getJSON(guildName);
    if (ventus[args[0]]) {
        return "The " + ventus[args[0]]["fa"] + " family already exists.";
    }
    else {
        let gs = parseInt(args[2]) + parseInt(args[3]);
        let classid = getClassId(args[5]);
        let uid = userID;
        if (classid == -1) {
            return "I'm not sure what class that is.";
        }
        logger.info("initialize newaccount");
        let newAccount = { "fa": args[0], "ch": args[1], "ap": parseInt(args[2]), "dp": parseInt(args[3]), "gs": gs, "level": parseInt(args[4]), "classid": classid, "discordid": uid, "img":"" }
        //let tostring = newAccount.fa+"("+newAccount.ch+") AP:"+newAccount.ap+" DP:"+newAccount.dp+" GS:"+newAccount.gs+" Level:"+newAccount.level+" Class: "+newAccount.classid;
        logger.info("starting add");
        ventus[newAccount.fa.toLowerCase()] = newAccount;
        save(ventus);
        return "added the " + args[0] + " family successfully.";
    }
    return "error <@110143617699430400>";
}

function matcha(arr, str) {
    // >=0 is match
    str = str.toString();
    for (let i = 0; i < arr.length; i++) {
        if (str.match(arr[i].toString()) != null) {
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

function getPlayer(args,id) {
    let ventus = getJSON(guildName);
    let player = 1; //no args = get message sender's info
    if(args[0]){
        for(let fa in ventus){
            if(ventus[fa]["fa"].toLowerCase().startsWith(args[0].toLowerCase())||
               ventus[fa]["ch"].toLowerCase().startsWith(args[0].toLowerCase())){
                player = ventus[fa];
                break;
            }
        }
        if(player==1){
            return "Player not found.";
        }
    }
    else{
        for(let fa in ventus){
            if(ventus[fa]["discordid"]==id){
                player = ventus[fa];
                break;
            }
        }
    }
    return player.fa + "(" + player.ch + ") - AP:**" + player.ap + "** DP:**" + player.dp + "** GS:**" + player.gs + "** Level:**" + player.level + "** Class: **" + getClassName(player.classid) + "**\n"+player.img;
}

function info() {
    let avg = 0;
    let ct = 0;
    let lowest = 700;
    let highest = 0;
    let lowestName;
    let highestName;
    let json = getJSON(guildName);
    for (let key in json) {
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
    let lowestStr = ("Lowest GS: **" + lowest + "** ").padEnd(15) + lowestName + "\n";
    let highestStr = ("Highest GS: **" + highest + "** ").padEnd(15) + highestName + "\n";
    return "Members: **" + ct + "**\nAverage: **" + avg + "**\n" + lowestStr + highestStr;

}

function getInfo(type){
    let avg = 0;
    let ct = 0;
    let lowest = 700;
    let highest = 0;
    let lowestName;
    let highestName;
    let json = getJSON(guildName);
    for (let key in json) {
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
    let lowestStr = ("Lowest GS: **" + lowest + "** ").padEnd(15) + lowestName + "\n";
    let highestStr = ("Highest GS: **" + highest + "** ").padEnd(15) + highestName + "\n";
    let re = avg;
    if(type=="count"){
        re = ct;
    }
    return re;
}
