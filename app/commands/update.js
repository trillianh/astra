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
    callback('Usage: .update ap awak-ap dp level');
  }
};

function _validCharAttrs(args) {
  return (
    _validArgs(args) &&
    _validCharAttr(args[0]) &&
    _validCharAttr(args[1]) &&
    _validCharAttr(args[2]) &&
    _validLevel(args[3])
  );
};

function _validArgs(args) {
  return args && args.length == 4;
};

function _validLevel(value) {
  return value.length > 0 && value.length <= 2 && value.match(/\d{1,2}/);
};

function _validCharAttr(value) {
  return value.length > 0 && value.length <= 3 && value.match(/\d{1,3}/);
};

function _getCharacterAttrs(args) {

  return {
    ap: parseInt(args[0]),
    awk_ap: parseInt(args[1]),
    dp: parseInt(args[2]),
    gear_score: ((parseInt(args[1])>parseInt(args[0]))?parseInt(args[1]):parseInt(args[0])) + parseInt(args[2]),
    level: parseInt(args[3]),
    updated_at: new Date()
  };
}

export {
  update
};
