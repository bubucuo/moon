import React, {useState, useEffect, useContext} from "react";
import {FormItemContext, FormContext} from "./context";

const Form = props => {
  const {form, onFinish, onFinishFailed, onReset, children, ...rest} = props;
  const [allError, setAllError] = useState({});
  const [allVal, setAllVal] = useState({});
  const allRules = {};
  const ctx = {
    allRules,
    allVal,
    setAllVal,
    setAllVal,
    allError,
    setAllError,
    onFinish,
    onFinishFailed
  };

  return (
    <FormContext.Provider value={ctx}>
      <div className="form">{children}</div>
    </FormContext.Provider>
  );
};

function useForm() {
  const form = useContext(FormContext) || {};
  const {
    allVal,
    setAllVal,
    allRules,
    allError,
    setAllError,
    onFinish,
    onFinishFailed
  } = form;
  return [
    {
      validateFields: () => {
        validateFields(allVal, allRules);
      },
      setFieldsValue: val => {
        console.log("====================================");
        console.log(setAllVal);
        console.log("====================================");
        //setAllVal({...allVal, ...val});
      }
    }
  ];
}

function FormItem({label, name, rules, children}) {
  return (
    <div>
      <label>{label}</label>
      {children.type === "input" && <>{HandleInput(children, name, rules)}</>}
      {children.type === "button" && HandleButton(children)}
    </div>
  );
}

function HandleInput(input, name, rules) {
  const {allRules, allVal, setAllVal, allError, setAllError} = useContext(
    FormContext
  );
  allRules[name] = rules;
  const onChange = e => {
    let value = e.target.value;
    let newAllVal = {...allVal, [name]: value};
    setAllVal(newAllVal);
    setAllError(validateFields(newAllVal, allRules));
  };

  return (
    <>
      {React.cloneElement(input, {
        value: allVal[name] || "",
        name,
        onChange
      })}
      <p className="red">{allError[name]}</p>
    </>
  );
}

function HandleButton(button) {
  const {
    allVal,
    allRules,
    allError,
    setAllError,
    onFinish,
    onFinishFailed
  } = useContext(FormContext);

  const {props} = button;
  const {htmltype} = props;
  const onClick = e => {
    switch (htmltype) {
      case "submit":
        const err = validateFields(allVal, allRules);
        if (JSON.stringify(err) === "{}") {
          onFinish(allVal);
        } else {
          onFinishFailed(err);
        }
        setAllError(err);
        break;
      default:
        break;
    }
  };
  return React.cloneElement(button, {
    onClick
  });
}

function validateFields(allVal, allRules) {
  let errors = {};
  for (let rulesName in allRules) {
    const rule = allRules[rulesName][0];
    if (allVal[rulesName] === undefined) {
      errors[rulesName] = rule.message;
    }
  }
  return errors;
}

export {useForm, FormItem};
export default Form;
