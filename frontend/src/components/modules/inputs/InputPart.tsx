import React from 'react'
import Input, { INF_Input } from './Input'

interface INF_InputPart {
    id: string;
    inputData: INF_Input
    label: string;
}

const InputPart = ({ props } : { props: INF_InputPart }) => {
  return (
    <div className="form__part" id={props.id + '-form-part'}>
        <label className='part__label'>{ props.label }</label>
        <Input props={{ ...props.inputData, id: props.id + '-input' }} />
        <ul className="part__help-list" id={props.id + '-help-list'}></ul>
    </div>
  )
}

export default InputPart