import React, {
  Component,
  useState,
  useEffect,
  useContext,
  useMemo,
  useReducer
} from "react";
import {FormItemContext, FormContext} from "./context";

const InternalForm = (props, ref) => {
  const {form, children, onFinish, onFinishFailed} = props;
  const ctx = {
    form,
    onFinish,
    onFinishFailed
  };
  return (
    <FormContext.Provider value={ctx}>
      <div className="form">{children}</div>
    </FormContext.Provider>
  );
};

function FormItem({label, name, rules, children}) {
  return (
    <div>
      <label>{label}</label>
      {React.Children.map(children, child => {
        if (child.type === "input") {
          return HandleInput(child, name, rules);
        }
        if (child.type === "button") {
          return HandleButton(child);
        }
      })}
    </div>
  );
}

function HandleInput(input, name, rules) {
  const {form} = useContext(FormContext);
  const {setFieldsValue, getFieldValue} = form;

  const err = useMemo(() => {
    let res;
    let rule = rules[0];
    console.log("getFieldValue(name)", getFieldValue(name)); //sy-log
    if (
      rule.required &&
      (getFieldValue(name) === "" || getFieldValue(name) === null)
    ) {
      res = rule.message;
    }
    return res;
  }, [getFieldValue(name)]);

  const onChange = e => {
    let value = e.target.value;
    let newVal = {[name]: value};
    setFieldsValue(newVal);
  };

  return (
    <>
      {React.cloneElement(input, {
        value: getFieldValue(name) || "",
        name,
        onChange
      })}
      <p className="red">{err}</p>
    </>
  );
}

function HandleButton(button) {
  const {onFinish, onFinishFailed} = useContext(FormContext);
  const {props} = button;
  const {htmltype} = props;
  const {form} = useContext(FormContext);
  const {getFieldsValue} = form;

  const onClick = e => {
    switch (htmltype) {
      case "submit":
        console.log("fields", getFieldsValue()); //sy-log
        break;
      case "reset":
        form.resetFields();
        console.log("fields reset", getFieldsValue()); //sy-log
        break;
      default:
        break;
    }
  };
  return React.cloneElement(button, {
    onClick
  });
}

function useForm() {
  const [fields, setFields] = useState({});
  let rules = {};

  const setFieldsValue = val => {
    const newFields = {
      ...fields,
      ...val
    };
    setFields(newFields);
  };
  const getFieldValue = field => {
    return fields[field];
  };
  const getFieldsValue = field => {
    return fields;
  };

  const resetFields = () => {
    let tem = {...fields};
    for (let k in tem) {
      tem[k] = null;
    }
    setFields(tem);
  };

  const validateFields = () => {};

  return [
    {
      setFieldsValue,
      getFieldValue,
      getFieldsValue,
      resetFields
    }
  ];
}

const Form = React.forwardRef(InternalForm);

export {useForm, FormItem};
export default Form;
