import React, { useEffect, useState } from 'react'
import Button from '../modules/Button'
import { INF_Form } from '../modules/Form'

const MultiForm = 
  ({ forms, index, setter } : { forms: INF_Form[], index: number, setter: Function }) => {

  return (
    <>
    { forms.filter(form => form.index === index)[0].form }
    
    { index > 1 && 
      <Button props={{ action: () => setter(index - 1), default: true, content: 'Back' }} /> 
    }
    </>
  )
}

export default MultiForm