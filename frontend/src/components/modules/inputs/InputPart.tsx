import React from 'react'
import { createStructuredSelector } from 'reselect'
import { changeTime } from '../../funcs/videoPlayerFuncs'
import Input, { INF_Input, InputState } from './Input'

export interface INF_InputPart extends InputState {
    id: string;
    inputData: INF_Input
    label: string;
}

const InputPart = ({ props } : { props: INF_InputPart }) => {
  return (
    <div className="form__part" id={props.id + '-form-part'}>
        <label className='part__label'>{ props.label }</label>

        <Input props={{ ...props.inputData, setter: props.setter, 
          data: props.data, id: props.id + '-input' }} />

        <ul className="part__help-list" id={props.id + '-help-list'}></ul>
    </div>
  )
}

export default InputPart