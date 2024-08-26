import Joi from "joi";

export const validateAddWidgetForm = (formData) => {
    const schema = {
      widgetName: Joi.string().required().label("Widget Name"),
      widgetText: Joi.string().default('No Graph data available!').label("Widget Text"),
    };
  
    const { error } = Joi.object(schema).validate(formData);
    if (!error) return {};
  
    const validationErrors = {};
    for (let item of error.details) {
      validationErrors[item.path[0]] = item.message;
    }
  
    return validationErrors;
  };