import { Joi, Segments } from 'celebrate';
import { TAGS } from '../constants/tags.js';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value)
    ? helpers.messages('Invalid Id format')
    : value;
};

export const getAllNotesSchema = {};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required().messages({
      'string.base': 'Note Id must be a string',
      'any.required': 'Note Id is required',
      'objectId.invalid': 'Note Id must be a valid ObjectId',
    }),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title should have at least {#limit} characters',
      'any.required': 'Title is required',
    }),
    content: Joi.string().messages({
      'string.base': 'Content must be a string',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .messages({
        'string.base': 'Tag must be a string',
        'any.only': `Tag must be one of: ${TAGS}`,
      }),
  }),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required().messages({
      'string.base': 'Note Id must be a string',
      'any.required': 'Note Id is required',
      'objectId.invalid': 'Note Id must be a valid ObjectId',
    }),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title should have at least {#limit} characters',
    }),
    content: Joi.string().messages({
      'string.base': 'Content must be a string',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .messages({
        'string.base': 'Tag must be a string',
        'any.only': `Tag must be one of ${TAGS}`,
      }),
  }).min(1),
};
