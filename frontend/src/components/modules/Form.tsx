import React from 'react'

export interface INF_Form {
    form: JSX.Element;
    index: number;
}

const Form = ({ props } : { props: INF_Form }) => {
  return props.form
}

export default Form