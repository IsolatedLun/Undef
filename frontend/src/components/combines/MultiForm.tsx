import React, { useEffect, useState } from 'react'
import Button from '../modules/Button'

const MultiForm = ({ forms, index, setter } : { forms: JSX.Element[], index: number, setter: Function }) => {

  useEffect(() => {

  }), []

  return (
    <>
    { index > 0 && 
      <Button props={{ action: () => setter(index - 1), default: true, content: 'Back' }} /> 
    }
    </>
  )
}

export default MultiForm