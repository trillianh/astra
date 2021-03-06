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

function reroll(args, discordId, callback) {
  if (_validCharAttrs(args)) { 
    Character.findAndUpdate(
      { discord_id: discordId }, 
      { $set: _getCharacterAttrs(args) },
      { returnOriginal: false }
    ).then((record) => {
      callback(buildTable([record.value]));
    });
  } else {
    callback('failed to reroll character');
  }
};

function _validCharAttrs(args) {
  return (
    _validArgs(args) &&
    _validName(args[0]) &&
    _validCharAttr(args[1]) &&
    _validCharAttr(args[2]) &&
    _validCharAttr(args[3]) &&
    _validLevel(args[4]) &&
    _validClass(args[5])
  );
};

function _validArgs(args) {
  return args && args.length == 6;
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


function _getCharacterAttrs(args) {
  return {
    ap: parseInt(args[1]),
    awk_ap: parseInt(args[2]),
    character_name: args[0],
    class_name: capitalize(args[5]),
    dp: parseInt(args[3]),
    gear_score: ((parseInt(args[1])>parseInt(args[2]))?parseInt(args[1]):parseInt(args[2])) + parseInt(args[3]),
    level: parseInt(args[4])
  };
}

export {
  reroll
};
