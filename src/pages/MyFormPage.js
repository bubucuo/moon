import React, {useState, useEffect} from "react";
import Form, {FormItem, useForm} from "../components/Form/index";

const nameRules = {
  required: true,
  message: "请输入姓名"
};

const passwordRules = {
  required: true,
  message: "请输入密码"
};

export default function MyFormPage(props) {
  const [form] = useForm();
  const {
    getFieldsValue,
    getFieldValue,
    setFieldsValue,
    resetFields,
    validateFields
  } = form;

  useEffect(() => {
    setFieldsValue({name: "default"});
    // console.log("my-form", form); //sy-log
  }, []);

  const onFinish = val => {
    console.log("onFinish", val); //sy-log
  };
  const onFinishFailed = err => {
    console.log("err", err); //sy-log
  };
  const onReset = err => {
    // resetFields();
  };
  console.log("my-form render");

  return (
    <div>
      <h3>MyFormPage</h3>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onReset={onReset}>
        <FormItem label="姓名" name="name" rules={[nameRules]}>
          <input className="input" placeholder="请输入姓名" />
        </FormItem>
        <FormItem label="密码" name="password" rules={[passwordRules]}>
          <input className="input" type="password" placeholder="请输入密码" />
        </FormItem>
        <FormItem>
          <button className="btn" htmltype="submit" type="primary">
            Submit
          </button>
          <button className="btn" htmltype="reset" type="default">
            reset
          </button>
        </FormItem>
      </Form>
    </div>
  );
}
