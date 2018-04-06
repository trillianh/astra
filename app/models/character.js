import {
  BaseModel
} from './baseModel';

const COLLECTION_NAME = 'characters';
const ATTRIBUTES = [
  'level',
  'awk_ap',
  'ap',
  'dp',
  'class_id',
  'family_name',
  'character_name',
  'gear_score',
  'image_url',
  'discord_id'
]

class Character extends BaseModel {
  static create(args) {
    return super.create(args, COLLECTION_NAME);
  }

  static findOne(args) {
    return super.findOne(args, COLLECTION_NAME);
  }

  static find(query, sort) {
    return super.find(query, sort, COLLECTION_NAME);
  }

  static update(id, args) {
    return super.update({ id: id }, args, COLLECTION_NAME);
  }
};

export {
  Character
};
