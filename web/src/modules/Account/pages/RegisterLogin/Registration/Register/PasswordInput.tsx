import { Form, Input } from "antd";
import React from "react";
import * as CONST from "./constants";
import { useFormContext } from "./hooks";

export default () => {
  const {
    getFieldDecorator,
    getFieldError,
    getFieldValue,
    isFieldTouched,
    validateFields
  } = useFormContext().form;

  return (
    <Form.Item validateStatus={status()} hasFeedback>
      {getFieldDecorator(CONST.PASSWORD, {
        rules: [
          {
            required: true,
            message: "Password cannot be empty"
          },
          {
            validator(_, value, callback) {
              if (value && isFieldTouched(CONST.PASSWORD)) {
                validateFields([CONST.CONFIRM], {
                  force: true
                });
              }
              callback();
            }
          }
        ]
      })(<Input placeholder="Password" type="password" />)}
    </Form.Item>
  );

  function status() {
    if (!isFieldTouched(CONST.PASSWORD)) return "";
    if (getFieldError(CONST.PASSWORD) !== undefined) return "error";

    if (!isFieldTouched(CONST.CONFIRM)) return "";
    if (getFieldValue(CONST.PASSWORD) !== getFieldValue(CONST.CONFIRM))
      return "error";

    return "success";
  }
};
