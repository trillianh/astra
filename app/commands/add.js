import {
  Character
} from '../models/character';

function add(args, discordId, callback) {
  // Need some kind of validation to check for valid
  // character attributes
  return Character.create(_getCharacterAttrs(args, discordId)).then((result) => {
    callback(result);
  });
};

function _getCharacterAttrs(args, discordId) {
  return {
    awk_ap: parseInt(args[2]),
    character_name: args[1],
    class_name: args[5],
    discord_id: discordId,
    dp: parseInt(args[3]),
    family_name: args[0],
    gear_score: parseInt(args[2]) + parseInt(args[3]),
    level: parseInt(args[4])
  };
}

export {
  add
};