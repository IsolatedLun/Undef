import React from 'react'
import { createStructuredSelector } from 'reselect'
import { changeTime } from '../../funcs/videoPlayerFuncs'
import Input, { INF_Input, INF_Input_State } from './Input'

export interface INF_InputPart extends INF_Input_State {
    id: string;
    inputData: INF_Input;
    label: string;
}

const InputPart = ({ props } : { props: INF_InputPart }) => {
  return (
    <div className="form__part" id={props.id + '-form-part'}>
        <label className='part__label'>{ props.label }</label>
        <Input props={{ ...props.inputData, setter: props.setter, data: props.data }} />
        <ul className="part__help-list" id={props.id + '-help-list'}></ul>
    </div>
  )
}

export default InputPart