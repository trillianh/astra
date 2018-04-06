import path from 'path';
import fs from 'fs';
import {
  sortBy
} from 'lodash';

const guildName = "ventus";
const logger = require('winston');
const MESSAGE_CHAR_LIMIT = 2000;
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
  return JSON.parse(fs.readFileSync(path.join('./', gname + '.json'), "utf8"));
};

function matcha(arr, str) {
  // >=0 is match
  str = str.toString();
  for (let i = 0; i < arr.length; i++) {
      if (str.match(arr[i].toString()) != null) {
          return i;
      }
  }
  return -1;
};

function getClassName(id) {
    if(id==-2){
        return "Caster";
    }
    return classnames[id];
};

function parsedTableString(player, addClassName) {
  let name = player["fa"] + "(" + player["ch"] + ")";
  let ap = player["ap"] + "";
  let dp = player["dp"] + "";
  let gs = player["gs"] + "";
  let level = player["level"] + "";
  let namepad = 30;
  return name.padEnd(namepad) + " " + ap.padEnd(4) + " | " + dp.padEnd(4) + " | " + gs.padEnd(4) + " | " + level.padEnd(3) + " | " + ((addClassName == 1) ? getClassName(player.classid) : "");
};

function listt(metric, cid) {
    metric = metric.toString().toLowerCase();
    if (matcha(["lvl", "levl", "lv", "lev", "growth"], metric) >= 0) {
        metric = "level";
    }
    else if (matcha(["ap", "dp", "level", "gs"], metric) < 0) {
        return "\"" + metric + "\" is not a valid metric for comparison.";
    }
    let str = "Guild Member Rankings sorted by **" + ((metric == "level") ? "Level" : metric.toUpperCase()) + "**\n";
    if (cid != -1) { //filter only classes
        str = "**" + getClassName(cid) + "** Rankings sorted by **" + ((metric == "level") ? "Level" : metric.toUpperCase()) + "**\n";
    }
    else {
        cid = null;
    }

    let list = new Array();

    let json = getJSON(guildName);
    let i;
    let j;
    for (let key in json) {
        list.push(json[key]);
    }

    let sorted = sortBy(list, [metric])

    str += "```Family(Character)              AP     DP     GS     LVL    Class\n________________________________________________________________\n";
    //add ascend/decend functionality here
    //sorted should be full of objects at this point
    for (let i = 0; i < sorted.length; i++) {
        try {
            if (cid != null) {
                // if is the class, or is 
                if (
                    sorted[i]["classid"] == cid || 
                    (cid == -2 && matcha(["13","14"],sorted[i]["classid"])>=0)
                ) {
                    //replace with table formatted playertostring
                    str += parsedTableString(sorted[i], 1) + "\n";
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
};

export {
  listt,
  matcha
};