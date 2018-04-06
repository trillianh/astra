import { listt, matcha } from '../common/utils';

const MESSAGE_CHAR_LIMIT = 2000;

function list(args) {
  let str = "";

  let messageBuffer = [];

  if (args.length == 1) {

      if (matcha(["lvl", "levl", "lv", "lev", "growth"], args[0]) >= 0) {
          args[0] = "level";
      }
      if (matcha(["ap", "dp", "level", "gs"], args[0]) > -1) {
          //sort all by args[0]
          str = listt(args[0], -1);
      }
      else {
          //list all args[0] by gs
              str = listt("gs", getClassId(args[0]));
      }
  } else if (args.length == 2) {
      arg1 = args[0].toString().toLowerCase();
      arg2 = args[1].toString().toLowerCase();
      let cid;
      if (matcha(["ap", "dp", "level", "gs"], arg1) > -1) {
          metric = arg1;
          cid = getClassId(arg2);
      }
      else {
          metric = arg2;
          cid = getClassId(arg1);
      }
      str = listt(metric, cid);
  } else {
    str = listt("gs", -1);
  }

  while (str.length > MESSAGE_CHAR_LIMIT-3) {
    let capped = str.substring(0, MESSAGE_CHAR_LIMIT-3); //rough cut ex "asdf\nasd"
    let lastline = capped.lastIndexOf('\n'); //find most recent newline ex "4"
    capped = capped.substring(0,lastline)+"```"; //clean cut ex "asdf"
    messageBuffer.push(capped); //add to messageQueue ex ["asdf"]
    str = "```"+ str.substring(lastline, str.length); //put the rest back in str "\nasd"
  }

  messageBuffer.push(str);
  return messageBuffer;
};

export {
 list
};