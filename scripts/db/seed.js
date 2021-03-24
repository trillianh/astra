// Note this seed script is intended to be used for the first time
// to seed the required data for the application

import {
  map
} from 'lodash';

import fs from 'fs';

import {
  MongoClient
} from 'mongodb';

import {
  DB_NAME,
  MONGO_DB_HOST
} from '../../app/constants/config';

const SEED_FILE = 'backup.json'
const OLD_TO_NEW_COLUNM_MAPPING = {
  'fa': 'family_name',
  'ch': 'character_name',
  'ap': 'awk_ap',
  'dp': 'dp',
  'gs': 'gear_score',
  'level': 'level',
  'classid': 'class_name',
  'discordid': 'discord_id',
  'img': 'image_url'
};

const CLASS_LIST = [
  "Archer",
  "Berserker",
  "Darkknight",
  "Kunoichi",
  "Lahn",
  "Maehwa",
  "Musa",
  "Mystic",
  "Ninja",
  "Ranger",
  "Sorceress",
  "Striker",
  "Tamer",
  "Valkyrie",
  "Warrior",
  "Witch",
  "Wizard",
  "Shai",
  "Guardian",
  "Hashashin",
  "Nova",
  "Sage"
];

const COLLECTION_NAME = 'characters';

fs.readFile(`./${SEED_FILE}`, { encoding: 'utf-8'}, (err, data) => {
  if (err) {
    console.log(err);
    throw 'Failed to read backup data';
  }

  const jsonData = JSON.parse(data);
  const attributes = map(jsonData, (value, _) => {
    let formattedAttrs = {};

    formattedAttrs[OLD_TO_NEW_COLUNM_MAPPING['fa']] = value.fa;
    formattedAttrs[OLD_TO_NEW_COLUNM_MAPPING['ch']] = value.ch;
    formattedAttrs[OLD_TO_NEW_COLUNM_MAPPING['ap']] = value.ap;
    formattedAttrs[OLD_TO_NEW_COLUNM_MAPPING['dp']] = value.dp;
    formattedAttrs[OLD_TO_NEW_COLUNM_MAPPING['gs']] = value.gs;
    formattedAttrs[OLD_TO_NEW_COLUNM_MAPPING['level']] = value.level;
    formattedAttrs[OLD_TO_NEW_COLUNM_MAPPING['classid']] = CLASS_LIST[value.classid];
    formattedAttrs[OLD_TO_NEW_COLUNM_MAPPING['discordid']] = value.discordid;
    formattedAttrs[OLD_TO_NEW_COLUNM_MAPPING['img']] = value.img;

    return formattedAttrs;
  });

  MongoClient.connect(MONGO_DB_HOST).then((client) => {
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    const records = collection.insertMany(attributes);

    client.close();
  });

  console.log('Data seeded to database');
});
