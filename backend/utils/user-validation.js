import Ajv from "ajv";
import addFormats from "ajv-formats";
const ajv = new Ajv();

addFormats(ajv);

const userSchema = {
    "type": "object",
    "properties": {
      "name": {
        type: "string",
      },
      "email": {
        "type": "string",
        "format": "email",
      },
      "password": {
        type: "string",
        "minLength": 8,
        "maxLength": 100
      },
      "lists": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "tasks": {
        "type": "array",
        "items": {
          "type": "string"
        }
      }
    }
  }
  

export function validateUser(body) {
    return ajv.validate(userSchema, body);
}


