const joi = require('joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const userSchema = joi.string().max(30);
const userNameSchema = joi.string().max(30);
const userLastNameSchema = joi.string().max(30);
const userDescriptionSchema = joi.string().max(255);
const userEmailSchema = joi.string().regex(/^[\u00f1\u00d1\w\._\-]{3,25}@[\w\.\-]{3,30}\.\w{2,5}$/);
const userPassSchema = joi.string(); //sirve contraseñaA1
const userRoleSchema = joi.string().valid('support', 'admin', 'employee', 'none');
const userPhoneSchema = joi.string().regex(/^[\d]{7,7}(\d{3,3})?$/);
const userSearchSchema = joi.string().max(30);

const createUserSchema = {
    userName: userSchema.required(),
    name: userNameSchema.required(),
    lastName: userLastNameSchema.required(),
    email: userEmailSchema.required(),
    role: userRoleSchema.required(),
    password: userPassSchema.required(),
    phone: userPhoneSchema,
    description: userDescriptionSchema
};

const listUsersSchema = {
    userName: userSchema,
    email: userEmailSchema,
    role: userRoleSchema,
    _id: userIdSchema
};

const updateUserSchema = {
    userName: userSchema,
    email: userEmailSchema,
    role: userRoleSchema,
    _id: userIdSchema,
    phone: userPhoneSchema
};

const deleteUserSchema = {
    _id: userIdSchema.required(),
    role: userRoleSchema
};

const searchUsersSchema = {
    keyword: userSearchSchema.required()
};

const getUserSchema = {
    _id:userIdSchema.required()
};

module.exports = {
    deleteUserSchema,
    updateUserSchema,
    createUserSchema,
    listUsersSchema,
    getUserSchema,
    searchUsersSchema
};