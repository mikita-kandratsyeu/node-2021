import joi from 'joi';

export const groupSchemaJoi = joi.object({
  id: joi.string(),
  name: joi.string().required(),
  permissions: joi
    .array()
    .items(
      joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'),
    )
    .required(),
});

export const addUsersToGroupSchemaJoi = joi.object({
  userIds: joi.array().items(joi.string()).required(),
});
