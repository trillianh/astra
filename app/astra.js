import "babel-polyfill";

import {
  BOT_TOKEN,
  CHANNEL_ID,
  MONGO_DB_HOST,
  OFFICER_IDS
} from './constants/config';

import {
  Member
} from './classes/member';

import {
  Officer
} from './classes/officer';

// This is a hack to define padEnd function for String
// ES7 removes from its specs
if (!String.prototype.padEnd) {
  String.prototype.padEnd = function padEnd(targetLength,padString) {
    targetLength = targetLength>>0; //floor if number or convert non-number to 0;
    padString = String((typeof padString !== 'undefined' ? padString : ' '));
    if (this.length > targetLength) {
      return String(this);
    } else {
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

const classnicks = [
  "archer,legolas",
  "zerker,zerk,berserker,zk,giant",
  "dk,drk,darkknight,batman,darknight,brucewayne,dark",
  "kuno,kunoichi",
  "mae,bae,baehwa,maehwa,plum,meihua,maewah,maewha",
  "musa,blader,beyblade,shaky",
  "mystic,mystake,mys",
  "ninja,naruto,hokage",
  "ranger,bowmaster,archer,elf",
  "sorc,sorceress,rwby",
  "striker,jojo,stroker",
  "tamer,ellin,tame",
  "valk,valkyrie",
  "warrior,fpsabuser,warr",
  "witch,hermione,ginny",
  "wiz,wizard,wizzy,shiny,harrypotter,wizerd,fotm",
  "loli,shai,ccbot,dp",
  "guardian,guard,gd",
  "hashashin,hashbrown,hash",
  "nova,chess",
  "sage,ilium"
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

bot.on('disconnect', function (erMsg, code) {
  logger.info('Disconnected');
  logger.info(code + " " + erMsg);
});

bot.on('message', messageObj => {
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

      logger.info(`command received: ${cmd} ${args}`);
      
      if (_isOfficer(discordId)) {
        Officer.perform(cmd, discordId, args, (result) => {
          messageObj.channel.send(result); 
        })
      } else {
        Member.perform(cmd, discordId, args, (result) => {
          messageObj.channel.send(result);
        });
      }
    }
  } catch(err) {
    logger.info(err);
  }
});

bot.login(BOT_TOKEN);

function _isOfficer(discordId) {
  const officerIds = OFFICER_IDS.split(',');

  return officerIds.indexOf(discordId.toString()) > -1; 
};
