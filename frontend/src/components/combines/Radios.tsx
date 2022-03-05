import { ActionCreatorWithNonInferrablePayload } from "@reduxjs/toolkit";
import React from "react"
import Input from "../modules/inputs/Input";

interface RadioButtons {
    name: string;
    radios: RadioButton[];
    setter: Function;
}

interface RadioButton {
  name?: string;
  value: string;
  title?: string;
  text?: string;
  
  setter?: Function;
}

const Radio = ({ props } : { props: RadioButton }) => {
  function selectChoice(e: React.MouseEvent<any>, setter: Function) {
    const target = e.target as HTMLInputElement;
    const radio = document.getElementById(target.id + '-radio')! as HTMLInputElement;

    if(radio) {
      radio.click();
      setter(radio.value);
    }
  }

  return(
      <div onClick={(e: React.MouseEvent<any>) => selectChoice(e, props.setter!)}
        className="radio__part input--primary curs--point flex gap--1" 
        id={`radio-${props.name}-${props.value}`}>
          
        <Input props={{ type: 'radio', realType: 'oneWord', setter: props.setter, data: '', 
          name: props.name, value: props.value }} />

        <div>
          <h2 className="radio__title">{ props.title }</h2>
          <p className="radio__text txt--muted">{ props.text }</p>
        </div>
      </div>
  )
}

const Radios = ({ props } : { props: RadioButtons }) => {
  return <>{
    props.radios.map((radio, idx) => (
      <Radio key={idx} props={{ ...radio, name: props.name, setter: props.setter }} />
    ))
  }</>
}

export default Radios