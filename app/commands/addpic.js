import {
  Character
} from '../models/character';

function addpic(args, discordId, channelId, callback) {
  if (_validImgUrl(args)) { 
    Character.findAndUpdate(
      { discord_id: discordId }, 
      { $set: _getCharacterAttrs(args) },
      { returnOriginal: false }
    ).then((record) => {
      callback(record.value.image_url);
    });
  } else {
    callback('failed to attach picture');
  }
};

// For now just check for the presence
function _validImgUrl(args) {
  return args && args[0];
};

function _getCharacterAttrs(args) {
  return {
    image_url: args[0]
  };
};

export { addpic };
