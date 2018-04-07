import {
  Character
} from '../models/character';

import {
  list
} from '../commands/list';

import {
  add
} from '../commands/add';

import {
  get 
} from '../commands/get';

import {
  update
} from '../commands/update';

import {
  reroll
} from '../commands/reroll';

import {
  help
} from '../commands/help';

import {
  cc
} from '../commands/cc';

class Member {
  static perform(command, discordId, args, replyCallback) {
    switch(command) {
      case 'add':
        add(args, discordId, replyCallback);
        break;
      case 'get':
        get(discordId, replyCallback);
        break;
      case 'update':
        update(args, discordId, replyCallback);
        break;
      case 'list':
        list(args, replyCallback);
        break;
      case 'reroll':
        reroll(args, replyCallback);
        break;
      case 'cc':
        cc(discordId, replyCallback);
        break;
      default:
        help(args, replyCallback);
    }
  };
};

export { Member };