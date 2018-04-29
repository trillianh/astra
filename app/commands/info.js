import {
  concat, reduce
} from 'lodash';

import {
  Character
} from '../models/character';

import {
  CLASSES
} from '../constants/bdo';

function info(callback) {
  return Character.find({}, { gear_score: -1 }).then((results) => {
    callback({ embed: _buildInfoPayload(results) });
  });
};

// Calculate the average gear_score
function _calculateAverage(attrName, data) {
  const total = reduce(data, (result, value) => {
    if (value[attrName]) {
      result += value[attrName];
    }
    return result;
  }, 0);

  return (total / data.length);
};

function _calculateClassCount(records) {
  let data = {};

  CLASSES.forEach((className) => {
    data[className] = 0;
  });

  records.forEach((record) => {
    if (data[record.class_name] !== NaN || data[record.class_name] !== undefined) {
      data[record.class_name] += 1;
    }
  })

  return data;
};

function _buildClassCountPayload(records) {
  const classCountData = _calculateClassCount(records);

  const payload = reduce(classCountData, (result, classCount, className) => {
    if (classCount !== NaN || classCount !== undefined) {
      result.push({
        name: `${className}:`,
        value: classCount,
        inline: true
      });
    }

    return result;
  }, []);

  return payload;
};

function _buildMemberInfoPayload(records) {
  return [
    {
      name: 'Lowest Gear Score:',
      value: `${records[records.length - 1].gear_score} (${records[records.length - 1].character_name})`,
      inline: false
    }, 
    {
      name: 'Highest Gear Score:',
      value: `${records[0].gear_score} (${records[0].character_name})`,
      inline: false
    }
  ];
}

function _buildInfoPayload(records) {
  let classCountPayload = _buildClassCountPayload(records);
  let memberInfoPayload = _buildMemberInfoPayload(records);
  let payload = {
    title: 'Guild Information',
    fields: []
  };

  let defaultFields = [
    {
      name: 'Member Count:',
      value: records.length,
      inline: false
    },
    {
      name: 'Average Awak. AP:',
      value: _calculateAverage('awk_ap', records).toFixed(2),
      inline: true
    },
    {
      name: 'Average DP:',
      value: _calculateAverage('dp', records).toFixed(2),
      inline: true
    },
    {
      name: 'Average Gear Score:',
      value: _calculateAverage('gear_score', records).toFixed(2),
      inline: true
    }
  ];

  payload.fields = concat(defaultFields, memberInfoPayload, classCountPayload); 
  return payload;
};

export {
  info
};