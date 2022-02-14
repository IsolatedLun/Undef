import React from 'react'
import Input, { INF_Input } from '../modules/inputs/Input'
import InputPart from '../modules/inputs/InputPart'

const SignUp = () => {

  const inputs: INF_Input[] = [
    { setter: () => null, data: '', name: 'email_address', type: 'email', realType: 'email' }
  ]

  return (
    <form className="form-container">
        <InputPart props={{ id: 'email', inputData: inputs[0], label: 'Email Address' }} />
    </form>
  )
}

export default SignUp