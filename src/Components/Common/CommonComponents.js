import React from "react";
import {
  TextInput,
  DatePicker,
  DatePickerInput,
  // Dropdown,
  ComboBox,
} from "carbon-components-react";

const TextField = (props) => {
  return (
    <TextInput
      className={props.className}
      value={props.value}
      name={props.name}
      id={props.id}
      // invalid={false}
      // invalidText="Please fill"
      labelText={props.labelText}
      placeholder={props.placeholder}
      light={true}
      onChange={props.onChange}
      onBlur={props.onBlur}
      // onClick={function noRefCheck() {}}
      required={props.required}
      type={props.type}
    />
  );
};

export default TextField;

export const DateSelection = (props) => {
  return (
    <DatePicker
      dateFormat="y-m-d"
      datePickerType={props.datePickerType}
      light
      id={props.dateid}
      style={{ width: "100%" }}
      onChange={props.onChange}
    >
      <DatePickerInput
        style={{ width: "100%" }}
        id={props.id}
        placeholder={props.placeholder}
        labelText={props.labelText}
        type="text"
        className={props.inputclassName}
        name={props.name}
        value={props.value}
        onBlur={props.onBlur}
      />
    </DatePicker>
  );
};

export const DropDownSelection = (props) => {
  return (
    <ComboBox
      ariaLabel="Dropdown"
      direction={props.direction ? props.direction : "bottom"}
      className={props.className}
      name={props.name}
      selectedItem={props.selectedItem}
      value={props.value}
      // helperText="This is some helper text."
      id={props.id}
      // invalidText="A valid value is required"
      // itemToElement={null}
      // itemToString={function noRefCheck(){}}
      items={props.items}
      placeholder={props.label}
      light
      onChange={props.onChange}
      titleText={props.titleText}
      type="default"
    />
    // <Dropdown
    //   ariaLabel="Dropdown"
    //   direction={props.direction ? props.direction : "bottom"}
    //   className={props.className}
    //   name={props.name}
    //   selectedItem={props.selectedItem}
    //   value={props.value}
    //   // helperText="This is some helper text."
    //   id={props.id}
    //   // invalidText="A valid value is required"
    //   // itemToElement={null}
    //   // itemToString={function noRefCheck(){}}
    //   items={props.items}
    //   label={props.label}
    //   light
    //   onChange={props.onChange}
    //   titleText={props.titleText}
    //   type="default"
    // />
  );
};
