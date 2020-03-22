import React, {useState, useEffect} from "react";
import {Form, Input, Button} from "antd";

const FormItem = Form.Item;

const nameRules = {
  required: true,
  message: "请输入姓名"
};

const passwordRules = {
  required: true,
  message: "请输入密码"
};

export default function FormPage(props) {
  const [form] = Form.useForm();
  const {
    getFieldsValue,
    getFieldValue,
    setFieldsValue,
    resetFields,
    validateFields
  } = form;

  useEffect(() => {
    setFieldsValue({name: "default"});
    console.log("form", form); //sy-log
  }, []);

  const onFinish = val => {
    console.log("onFinish", val); //sy-log
  };
  const onFinishFailed = err => {
    console.log("err", err); //sy-log
  };
  const onReset = err => {
    resetFields();
  };
  // console.log("form render");

  const FancyButton = React.forwardRef((props, ref) => (
    <button
      ref={ref}
      className="FancyButton"
      onClick={() => {
        console.log("oooo", ref); //sy-log
      }}>
      {props.children}
    </button>
  ));

  // You can now get a ref directly to the DOM button:
  const ref = React.createRef();

  console.log("form render"); //sy-log
  return (
    <div>
      <FancyButton ref={ref}>Click me!</FancyButton>

      <h3>FormPage</h3>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onReset={onReset}>
        <FormItem label="姓名" name="name" rules={[nameRules]}>
          <Input placeholder="请输入姓名" />
        </FormItem>
        <FormItem label="密码" name="password" rules={[passwordRules]}>
          <Input type="password" placeholder="请输入密码" />
        </FormItem>
        <FormItem>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
          <Button htmlType="reset" type="default">
            reset
          </Button>
        </FormItem>
      </Form>
    </div>
  );
}
