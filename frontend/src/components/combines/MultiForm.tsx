import React, { useEffect, useState } from 'react'
import Button from '../modules/Button'

const MultiForm = ({ forms, index, indexFunc } : { forms: JSX.Element[], index: number, indexFunc: Function }) => {

  useEffect(() => {
    document.querySelectorAll('.multiform__form').forEach(form => {
      const formIdx: number = Number(form.getAttribute('data-idx'));
      let formEL = form as HTMLElement;

      if(formIdx !== index)
        formEL.style.display = 'none';
      else
        formEL.style.display = 'flex';
    })
  }, [index])

  return (
    <>
    {
      forms
    }

    { index > 0 && 
      <Button props={{ action: () => indexFunc(index - 1), default: true, content: 'Back',
      modifiers: 'mt--1' }} /> 
    }
    </>
  )
}

export default MultiForm