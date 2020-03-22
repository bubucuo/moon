import React, {
  Component,
  useState,
  useEffect,
  useContext,
  useMemo,
  useReducer
} from "react";
import {FormItemContext, FormContext} from "./context";

class InternalForm extends Component {
  render() {
    const {form, children, onFinish, onFinishFailed} = this.props;
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
  }
}

const formref = React.createRef();

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
      {/* <p className="red">{allError[name]}</p> */}
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

const Form = props => <InternalForm {...props} ref={formref} />;
// const Form = React.forwardRef(InternalForm);

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

  return [
    {
      setFieldsValue,
      getFieldValue,
      getFieldsValue,
      resetFields
    }
  ];
}

export {useForm, FormItem};
export default Form;
