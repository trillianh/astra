import {
  Character
} from '../models/character';

import {
  CHANNEL_ID,
  ALT_CHANNEL
} from './constants/config';

import {
  buildTable
} from '../common/messageFormatHelper';

import {
  CLASSES
} from '../constants/bdo';

import {
  capitalize,
  forEach,
  map
} from 'lodash';

const ATTRS_MAPPING = {
  lvl: 'level',
  aap: 'awk_ap',
  ap: 'ap',
  dp: 'dp',
  family: 'family_name',
  character: 'character_name',
  gs: 'gear_score',
  class: 'class_name',
  date: 'date'
};

const ORDER_BY = [
  'asc',
  'desc'
];

const OPERATOR_MAPPING = {
  over: '$gt',
  under: '$lt'
};

const CHANNEL_MAPPING = {
  ventus: CHANNEL_ID,
  soiar: ALT_CHANNEL
};

function list(args, channelId, callback) {
  const queryObj = _buildQuery(args);
  if(args[0]){
    ch=args[args.length-1].toLowerCase();
    if(ch=="ventus"){
      queryObj[channel_id]=CHANNEL_ID;
    }
    else if(ch=="soiar"||ch=="solar){
      queryObj[channel_id]=ALT_CHANNEL;
    }
    else if(ch=="all"){
      
    }
    else{
      queryObj[channel_id]=channelId;
    }
  }
  return Character.find(queryObj.query, queryObj.sortOption).then((results) => {
    const table = buildTable(results);

    forEach(table, async (page) => {
      await callback(page);
    });
  });
};

// '.list musa over 300 ap asc|desc'
// '.list musa under 200 ap asc|desc'
// '.list over 300 ap asc|desc'
// '.list under 200 ap asc|desc'
// '.list ap asc|desc'

// '.list {class} {filter} {value} {attr} {order}'
// '.list {attr} {filter} {value}'
function _buildQuery(args) {
  let queryObj = {
    query: {},
    sortOption: {}
  };

  if (args.length == 3) {
    queryObj.query = _buildPartialQuery(args);
    queryObj.sortOption = _buildSortOption('gs', 'desc');
  } else {
    //default query
    queryObj.query = _buildFullQuery(args);
    queryObj.sortOption = _buildSortOption(args[3], args[4]);
  }

  return queryObj;  
};

// query = {
//   class_name: BDO_CLASS,
//   ap: {
//     $gt: INTEGER
//   }
// }
function _buildFullQuery(args) {
  let query = {};

  if (!args || !args[0]) {
    return query;
  }
  
  query['class_name'] = capitalize(args[0]);

  if (args[1] && args[2] && args[3]) {
    query[ATTRS_MAPPING[args[3]]] =  _getConditionOption(args[1], args[2]);
  }
  
  return query;
};

function _getConditionOption(condition, value) {
  let filterOption = {};
  filterOption[OPERATOR_MAPPING[condition]] = parseInt(value);
  return filterOption;
};

function _buildPartialQuery(args) {
  let query = {};

  if (!args || !args[0] || !args[1] || !args[2]) {
    return query;
  }

  query[ATTRS_MAPPING[args[0]]] =  _getConditionOption(args[1], args[2]);

  return query;
};

function _buildSortOption(field, direction) {
  if (!field || !direction) {
    return { gear_score: -1 };
  }

  const sortOrder = direction == 'desc' ? -1 : 1;

  let sortOption = {};
  let normalizedAttr = ATTRS_MAPPING[field];
  sortOption[normalizedAttr] = sortOrder;

  return sortOption;
};

export {
 list
};
