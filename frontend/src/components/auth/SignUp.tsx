import React, { useState } from 'react'
import Button from '../modules/Button'
import FormCompletion, { INF_FomrCompletion } from '../modules/formCompletion'
import Input, { INF_Input } from '../modules/inputs/Input'
import InputPart from '../modules/inputs/InputPart'

const SignUp = () => {
  const [index, setIndex] = useState<number>(0);

  const inputs: INF_Input[] = [
    { setter: () => null, data: '', name: 'email_address', type: 'email', realType: 'email' },
    { setter: () => null, data: '', name: 'password', type: 'password', realType: 'password' }
  ]

  const completions: INF_FomrCompletion[] = 
    [{ text: 'Registration', idx: 1 }, { text: 'Channel', idx: 2 }]

  return (
    <form className="auth-form-container form__container">
      <h1 className='form__head txt--center'>Sign up to Undef</h1>
        <FormCompletion currIdx={index}
          completions={completions} />

        <InputPart props={{ id: 'email', inputData: inputs[0], label: 'Email Address' }} />
        <InputPart props={{ id: 'email', inputData: inputs[1], label: 'Password' }} />
        <Button props={{ content: 'Next', default: true, action: () => null }} />
    </form>
  )
}

export default SignUp