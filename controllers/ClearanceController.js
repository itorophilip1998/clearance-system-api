const Joi = require("joi");
const Clearance = require("../model/Clearance"); 

const validator = async (data) => {
  try {
    const schema = Joi.object({
      user_id: Joi.string().required(),
      status: Joi.string().required() 
    });
    const { repeat_password, ...newData } = await schema.validateAsync(data, {
      abortEarly: false,
    });
    return newData;
  } catch (error) {
    return error;
  }
};

exports.create_clearance = async (req, res) => {
  try {
    const validate = await validator(req.body);
    await Clearance.create(validate)
      .then((result) => {
        res.json({
          result,
          msg: "Created Succesfully",
        });
      })
      .catch((err) => {
        const errors = [];
        if (err.code === 11000) {
          errors.push({ field: "email", msg: "email already exist" });
          res.status(422).json({ errors });
        }
      });
  } catch (error) {}
};
