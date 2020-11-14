import {
  Character
} from '../models/character';

function remove(discordId, args, callback) {
  if(args && args.length > 0 && args[0]){
    callback('Only officers can remove others\' data.');
  }
  else{
    Character.deleteOne({ discord_id: discordId }).then((record) => {
      console.log(record);
      callback('Successfully deleted your data.');
    });
  }
};

export { remove };
