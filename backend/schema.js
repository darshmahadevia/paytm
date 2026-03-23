const zod = require('zod');

const signupSchema = zod
    .object({
        username: zod.string().trim().toLowerCase().min(3).max(30),
        password: zod.string().min(6),
        firstName: zod.string().trim().min(1).max(50),
        lastName: zod.string().trim().min(1).max(50),
    })
    .strict();

const signinSchema = zod
    .object({
        username: zod.string().trim().toLowerCase().min(3),
        password: zod.string().min(6),
    })
    .strict();

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});

module.exports = {
    signupSchema,
    signinSchema,
    updateBody,
};
