import {
  Character
} from '../../models/character';

function remove(discordId, args, callback) {
  const query = {};

  if (_removeMember(args)) {
    query['family_name'] = args[0];
  } else {
    query['discord_id'] = discordId;
  }

  Character.deleteOne(query).then((record) => {
    console.log(record);
    callback('Successfully deleted '+args[0]+' family');
  });
};

function _removeMember(args) {
  return (args && args.length > 0 && args[0]);
};

export { remove };
