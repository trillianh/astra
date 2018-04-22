import {
  Character
} from '../models/character';

import {
  buildTable
} from '../common/messageFormatHelper';

function update(args, discordId, callback) {
  if (_validCharAttrs(args)) { 
    Character.findAndUpdate(
      { discord_id: discordId }, 
      { $set: _getCharacterAttrs(args) },
      { returnOriginal: false }
    ).then((record) => {
      callback(buildTable([record.value]));
    });
  } else {
    callback('failed to update character');
  }
};

function _validCharAttrs(args) {
  return (
    _validArgs(args) &&
    _validCharAttr(args[0]) &&
    _validCharAttr(args[1]) &&
    _validLevel(args[2])
  );
};

function _validArgs(args) {
  return args && args.length == 3;
};

function _validLevel(value) {
  return value.length > 0 && value.length <= 2 && value.match(/\d{1,2}/);
};

function _validCharAttr(value) {
  return value.length > 0 && value.length <= 3 && value.match(/\d{1,3}/);
};

function _getCharacterAttrs(args) {

  return {
    awk_ap: parseInt(args[0]),
    dp: parseInt(args[1]),
    gear_score: parseInt(args[0]) + parseInt(args[1]),
    level: parseInt(args[2]),
    date: new Date()
  };
}

export {
  update
};