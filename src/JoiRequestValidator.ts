import * as joi from 'joi';
import { Request } from 'express';

interface JoiRequestValidatorResponse {
  error?: string;
}

interface JoiRouteValidator {
  route: string;
  method: string;
  validatorSchema: joi.ObjectSchema<any>;
}

class JoiRequestValidator {
  validators: JoiRouteValidator[] = [
    {
      route: '/users/login',
      method: 'POST',
      validatorSchema: joi.object({
        username: joi.string().required(),
        password: joi.string().required(),
      }),
    },
    {
      route: '/conversations',
      method: 'POST',
      validatorSchema: joi.object({
        concernedUsersIds: joi.array().items(joi.string()).min(2).required(),
      }),
    },
    {
      route: '/conversations',
      method: 'GET',
      validatorSchema: joi.object({}),
    },
    {
      route: '/conversations/:id',
      method: 'DELETE',
      validatorSchema: joi.object({}),
    },
    {
      route: '/conversations/see/:id',
      method: 'POST',
      validatorSchema: joi.object({
        messageId: joi.string().required(),
      }),
    },
    {
      route: '/conversations/:id',
      method: 'POST',
      validatorSchema: joi.object({
        content: joi.string().required(),
        messageReplyId: joi.string(),
      }),
    },
    {
      route: '/messages/:id',
      method: 'PUT',
      validatorSchema: joi.object({
        newMessageContent: joi.string().required(),
      }),
    },
    {
      route: '/messages/:id',
      method: 'POST',
      validatorSchema: joi.object({
        reaction: joi.string().valid('HAPPY', 'SAD', 'THUMBSUP', 'THUMBSDOWN', 'LOVE').required(),
      }),
    },
    {
      route: '/messages/:id',
      method: 'DELETE',
      validatorSchema: joi.object({}),
    },
    // Ajoutez d'autres validateurs pour d'autres routes
  ];

  validate(request: Request): JoiRequestValidatorResponse {
    const route = request.route ? request.route.path : '';
    const method = request.method?.toUpperCase();

    const validator = this.validators.find(
      (v) => v.route === route && v.method === method
    );

    if (!validator) {
      return {}; // Aucun validateur trouvé, la validation n'est pas nécessaire
    }

    const validationResult = validator.validatorSchema.validate(request.body);

    if (validationResult.error) {
      return {
        error: validationResult.error.details.map((d) => d.message).join(', '),
      };
    }

    return {};
  }
}

export const JoiRequestValidatorInstance = new JoiRequestValidator();
