import React, { useEffect } from 'react'
import { INF_Input_State, InputState } from './inputs/Input'
import InputPart, { INF_InputPart } from './inputs/InputPart'

export interface INF_Form extends InputState {
    id: string;
    children: JSX.Element[];
}

const Form = ({ props } : { props: INF_Form }) => {

  return (
      <div className='multiform__form' id={'form-' + props.id} data-idx={props.id}>
          {
              props.children
          }
      </div>
  )
}

export default Form