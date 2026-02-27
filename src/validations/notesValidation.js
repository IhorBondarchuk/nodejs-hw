import { Joi, Segments } from 'celebrate';
import { TAGS } from '../constants/tags.js';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return isValidObjectId(value) ? value : helpers.error('objectId.invalid');
};

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().positive().min(1).default(1).messages({
      'number.base': 'Page must be a number',
      'number.positive': 'Number must be positive',
      'number.min': 'Page cannot be less than 1',
      'number.integer': 'Page must be a integer number',
    }),
    perPage: Joi.number()
      .integer()
      .positive()
      .min(5)
      .max(20)
      .default(10)
      .messages({
        'number.base': 'PerPage must be a number',
        'number.integer': 'PerPage must be a integer number',
        'number.positive': 'Number must be positive',
        'number.min': 'PerPage should have at least {#limit} characters',
        'number.max': 'PerPage should have at least {#limit} characters',
      }),
    tag: Joi.string()
      .valid(...TAGS)
      .messages({
        'string.base': 'Tag must be a string',
        'any.only': `Tag must be one of ${TAGS}`,
      }),
    search: Joi.string().messages({
      'string.base': 'Search must be a string',
    }),
  }),
};

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
