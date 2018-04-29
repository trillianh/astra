import {
  Character
} from '../models/character';

function remove(discordId, args, callback) {
  const discordIdToRemove = _removeMember(args) ? args[0] : discordId;

  Character.deleteOne({ discord_id: discordIdToRemove }).then((record) => {
    console.log(record);
    callback('Successfully deleted');
  });
};

function _removeMember(args) {
  return (args && args.length > 0 && args[0]);
};

export { remove };