import React, { useEffect } from 'react'
import { INF_Input_State, InputState } from './inputs/Input'
import InputPart, { INF_InputPart } from './inputs/InputPart'

export interface INF_Form {
    id: string;
    children: JSX.Element[] | JSX.Element;
}

const Form = ({ props } : { props: INF_Form }) => {

  return (
      <form encType='multipart/form-data'
        className='multiform__form' id={'form-' + props.id} data-idx={props.id}>
          {
              props.children
          }
      </form>
  )
}

export default Form