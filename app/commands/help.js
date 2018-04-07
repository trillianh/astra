function help(args, callback) {
  let r = "commands: cc add update reroll help remove roll lsga list info get addpic \nex. `.help add`";
  switch (args[0]) {
      case 'add':
          r = "member: `.add family character ap dp level class`\nofficer: `.add family character ap dp level class discordID`\nAdds a new family to the guild.";
          break;
      case 'get':
          r = "`.get family` `.get character`\nGets details of a family in the guild.";
          break;
      case 'list':
          r = "`.list {class} {over|under} {value} {attr} {asc|desc}`\n`.list {attr} {over|under} {value}`";
          break;
      case 'update':
          r = "member: `.update ap dp level`\nofficer: `.update discordID ap dp level`\nUpdates your GS and level.";
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
      case 'addpic':
          r = "`.addpic url`\nAdds a picture to your account. Must be a URL(imgur, etc)";
          break;
      //add help
  }
  
  callback(r);
}

export { help };