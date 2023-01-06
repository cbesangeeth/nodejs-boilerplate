const Joi = require("@hapi/joi");
const errorCode = require("../common/errorCode");

exports.validateGetUsersList = async (req) => {
    const errors = [];

    const errObj = {
        statusCode: 400,
        code: errorCode.BAD_REQUEST,
        message: "Invalid input",
        details: errors,
    };

    const JoiSchema = Joi.object({
        isActive: Joi.boolean().optional().messages({
            "boolean.base": `"isActive" should be a type of 'boolean'`,
            "boolean.empty": `"isActive" cannot be an empty field`,
            // "boolean.required": `"isActive" is a required field`,
        }),
    }).options({
        abortEarly: false,
        allowUnknown: false,
    });


    const { error } = JoiSchema.validate({
        isActive: req.query.isActive ? req.query.isActive : "false",
    });

    if (error) {
        error.details.forEach((errorArray) => {
            const errDetails = {};
            errDetails.target = errorArray.context.label;
            errDetails.message = errorArray.message;
            errObj.details.push(errDetails);
        });
    }

    return errObj;
};