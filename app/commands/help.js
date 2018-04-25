import {
  CLASSES
} from '../constants/bdo';

function help(args, callback) {
  let r =  {
    embed: _buildGenericHelpPayload()
  };

  switch (args[0]) {
    case 'add':
      r = {
        embed: _buildAddHelpPayload()    
      };
      break;
    case 'get':
      r = {
        embed: _buildGetHelpPayload()
      };
      break;
    case 'list':
      r = {
        embed: _buildListHelpPayload()
      };
      break;
    case 'update':
      r = {
        embed: _buildUpdateHelpPayload()
      };
      break;
    case 'reroll':
      r = {
        embed: _buildRerollHelpPayload()
      };
      break;
    case 'remove':
      r = {
        embed: _buildRemoveHelpPayload()
      };
      break;
    case 'roll':
      r = "`.roll range`\n`roll min max`\n RNG";
      break;
    case 'cc':
      r = "`.cc` \nTags you in 15 minutes.";
      break;
    case 'lsga':
      r = "`.lsga` \nLifeSkill Levelups to Guild Activity calculator.";
      break;
    case 'addpic':
      r = {
        embed: _buildAddpicHelpPayload()
      };
      break;
    //add help
  }
  
  callback(r);
}

function _buildGenericHelpPayload() {
  return {
    title: 'Usage: .help [command]',
    description: 'Use .help [command] to get more details on how to use the inquired command.',
    fields: [
      {
        name: 'Where:',
        value: 'Commands:',
        inline: true
      },
      {
        name: '.add',
        value: 'Used to add new character to the database',
        inline: false
      },
      {
        name: '.update',
        value: 'Used to update character status',
        inline: false
      },
      {
        name: '.reroll',
        value: 'Used to change the class of the character',
        inline: false
      },
      {
        name: '.remove',
        value: 'Used to remove the character from the database',
        inline: false
      },
      {
        name: '.list',
        value: 'Used to list all characters in the database',
        inline: false
      },
      {
        name: 'addpic',
        value: 'Used to attach a picture to your character',
        inline: false
      },
      {
        name: '.get',
        value: 'Used to retrieve details about your character',
        inline: false
      }
    ]
  };
};

function _buildAddHelpPayload() {
  return {
    title: 'Usage: .add family_name character_name ap dp level class_name',
    description: 'Used to add new character to the database',
    fields: [
      {
        name: 'Where:',
        value: 'Arguments:',
        inline: true
      },
      {
        name: 'class_name',
        value: `One of the following: ${CLASSES.join(', ')}`,
        inline: false
      },
      {
        name: 'ap',
        value: 'Awakening AP of your character',
        inline: false
      }
    ]
  };
};

function _buildUpdateHelpPayload() {
  return {
    title: 'Usage: .update ap dp level',
    description: 'Used to update character status',
    fields: [
      {
        name: 'Where:',
        value: 'Arguments:',
        inline: true
      },
      {
        name: 'ap',
        value: 'Awakening AP of your character',
        inline: false
      }
    ]
  };
};

function _buildRerollHelpPayload() {
  return {
    title: 'Usage: .reroll character_name ap dp level class_name',
    description: 'Used to change the class of the character',
    fields: [
      {
        name: 'Where:',
        value: 'Arguments:',
        inline: true
      },
      {
        name: 'class_name',
        value: `One of the following: ${CLASSES.join(', ')}`,
        inline: false
      },
      {
        name: 'ap',
        value: 'Awakening AP of your character',
        inline: false
      }
    ]
  };
};

function _buildGetHelpPayload() {
  return {
    title: 'Usage: .get [character_name|family_name]',
    description: 'Used to retrieve character details',
    fields: [
      {
        name: 'Where:',
        value: 'Arguments:',
        inline: true
      },
      {
        name: 'character_name [optional]',
        value: 'Name of the character you are trying to lookup. It is case sensitive',
        inline: false
      },
      {
        name: 'family_name [optional]',
        value: 'Family Name of the character you are trying to lookup. It is case sensitive',
        inline: false
      }
    ]
  };
};

function _buildListHelpPayload() {
  return {
    title: 'Usage: .list [attribute|class_name] [operator] [value] [attribute] [order]',
    description: 'Used to list characters in the database filtered by given conditions',
    fields: [
      {
        name: 'Where:',
        value: 'Arguments:',
        inline: true
      },
      {
        name: 'attribute [optional]',
        value: 'One of the following: aap, dp, level or gs',
        inline: false
      },
      {
        name: 'class_name [optional]',
        value: `One of the following: ${CLASSES.join(', ')}`,
        inline: false
      },
      {
        name: 'operator [required if attribute used]',
        value: 'One of the following: over or under',
        inline: false
      },
      {
        name: 'value [required if attribute, and operator used]',
        value: 'Numeric value',
        inline: false
      },
      {
        name: 'order [optional]',
        value: 'One of the following: asc or desc',
        inline: false
      }
    ]
  };
};

function _buildRemoveHelpPayload() {
  return {
    title: 'Usage: .remove',
    description: 'Used to remove oneself from the database'
  };
};

function _buildAddpicHelpPayload() {
  return {
    title: 'Usage: .addpic image_url',
    description: 'Used to add/update character image',
    fields: [
      {
        name: 'Where:',
        value: 'Arguments:',
        inline: true
      },
      {
        name: 'image_url',
        value: 'Direct image address',
        inline: false
      },
      {
        name: 'ap',
        value: 'Awakening AP of your character',
        inline: false
      }
    ]
  };
};

export { help };