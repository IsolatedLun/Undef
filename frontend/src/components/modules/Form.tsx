import React from 'react'
import { INF_Input_State } from './inputs/Input'
import InputPart, { INF_InputPart } from './inputs/InputPart'

interface INF_Form extends INF_Input_State {
    id: string;
    inputPartsData: INF_InputPart[];
}

const Form = ({ props } : { props: INF_Form }) => {
  return (
      <div id={'form-' + props.id}>
          {
              props.inputPartsData.map(inputPart => (
                  <InputPart props={{ ...inputPart, setter: props.setter, data: props.data }} />
              ))
          }
      </div>
  )
}

export default Form