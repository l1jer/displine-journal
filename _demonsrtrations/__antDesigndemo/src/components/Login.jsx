import React from "react";
// import ReactDOM from "react-dom";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import "antd/dist/antd.css";
import "../css/Login.css";

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        {/* Username */}
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ requred: true, message: "Enter your username" }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>

        {/* Password */}
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ requred: true, message: "Enter your password" }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>

        {/* Remember */}
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          {/* Forgot pwd */}
          <a className="login-form-forgot" href="">
            Forgot pwd?
          </a>
          {/* Login */}
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Login
          </Button>
          Or
          <a href="">Register Now!</a>
          )}
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);

export default WrappedNormalLoginForm