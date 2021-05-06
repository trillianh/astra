import { Character } from '../models/character';
import { list } from '../commands/list';
import { add } from '../commands/add';
import { get } from '../commands/get';
import { update } from '../commands/update';
import { reroll } from '../commands/reroll';
import { help } from '../commands/help';
import { cc } from '../commands/cc';
import { remove } from '../commands/remove';
import { roll } from '../commands/roll';
import { addpic } from '../commands/addpic';
import { info } from '../commands/info';

class Member {
  static perform(command, discordId, channelId, args, replyCallback) {
    switch(command) {
      case 'add':
        add(args, discordId, channelId, replyCallback);
        break;
      case 'addpic':
        addpic(args, discordId, replyCallback);
        break;
      case 'get':
        get(args, discordId, replyCallback);
        break;
      case 'update':
        update(args, discordId, replyCallback);
        break;
      case 'list':
        list(args, channelId, replyCallback);
        break;
      case 'reroll':
        reroll(args, discordId, replyCallback);
        break;
      case 'remove':
        remove(discordId, replyCallback);
        break;
      case 'roll':
        roll(args, replyCallback);
        break;
      case 'cc':
        cc(discordId, replyCallback);
        break;
      case 'help':
        help(args, replyCallback);
        break;
      case 'info':
        info(args, channelId, replyCallback);
        break;
      default:
        replyCallback('Invalid Command try .help');
    }
  };
};

export { Member };
