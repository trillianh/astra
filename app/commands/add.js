import {
  Character
} from '../models/character';

import {
  buildTable
} from '../common/messageFormatHelper';

import {
  CLASSES
} from '../constants/bdo';

import {
  capitalize,
  indexOf
} from 'lodash';

function add(args, discordId, channelId, callback) {
  Character.findOne({ discord_id: discordId }).then((record) => {
    if (record) {
      callback('cannot create more than one character per discord user');
    } else {
      if (discordId && _validCharAttrs(args)) {
        Character.create(_getCharacterAttrs(args, discordId, channelId)).then((result) => {
          callback(buildTable(result.ops));
        });
      } else {
        callback('Usage: .add familyname charactername ap awak-ap dp level classname');
      }
    }
  });
};

function _validCharAttrs(args) {
  return (
    _validArgs(args) &&
    _validName(args[0]) &&
    _validName(args[1]) &&
    _validCharAttr(args[2]) &&
    _validCharAttr(args[3]) &&
    _validCharAttr(args[4]) &&
    _validLevel(args[5]) &&
    _validClass(args[6]) 
  );
};

function _validArgs(args) {
  return args && args.length == 7;
};

function _validName(value) {
  return value.length >= 3 && value.length <= 16 && value.match(/[a-zA-Z0-9_]/); 
};

function _validCharAttr(value) {
  return value.length > 0 && value.length <= 3 && value.match(/\d{1,3}/);
};

function _validLevel(value) {
  return value.length > 0 && value.length <= 2 && value.match(/\d{1,2}/);
};

function _validClass(className) {
  return className && indexOf(CLASSES, capitalize(className)) > -1;
};

function _getCharacterAttrs(args, discordId, channelId) {
  return {
    awk_ap: parseInt(args[3]),
    ap: parseInt(args[2]),
    character_name: args[1],
    class_name: capitalize(args[6]),
    discord_id: discordId,
    channel_id: channelId,
    dp: parseInt(args[4]),
    family_name: args[0],
    gear_score: ((parseInt(args[3])>parseInt(args[2]))?parseInt(args[3]):parseInt(args[2])) + parseInt(args[4]),
    level: parseInt(args[5])
  };
}

export {
  add
};
