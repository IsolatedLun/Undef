import React, { useState } from 'react'
import MultiForm from '../combines/MultiForm'
import Button from '../modules/Button'
import { INF_Form } from '../modules/Form'
import FormCompletion, { INF_FomrCompletion } from '../modules/FormCompletion'
import Input, { INF_Input } from '../modules/inputs/Input'
import InputPart from '../modules/inputs/InputPart'

interface NewUser {
  email_address: string;
  password: string;
}

const SignUp = () => {
  const [index, setIndex] = useState<number>(1);

  const [newUser, setNewUser] = useState<NewUser>({
    email_address: '',
    password: ''
  })

  const inputs: INF_Input[] = [
    { setter: setNewUser, data: newUser.email_address, name: 'email_address', type: 'email', 
     realType: 'email', setType: 'string', obj: newUser },
    { setter: setNewUser, data: newUser.password, obj: newUser, name: 'password', type: 'password', 
      realType: 'password', setType: 'string' }
  ]

  const forms: INF_Form[] = [
    { form: (<><InputPart props={{ id: 'email', inputData: inputs[0], label: 'Email Address' }} />
    <InputPart props={{ id: 'email', inputData: inputs[1], label: 'Password' }} />
    <Button props={{ content: 'Next', default: true, action: () => setIndex(index + 1) }} /></>), index: 1 },
    { form: <h1>meow</h1>, index: 2 }
  ]

  const completions: INF_FomrCompletion[] = 
    [{ text: 'Registration', idx: 1 }, { text: 'Channel', idx: 2 }]

  return (
    <form className="auth-form-container form__container">
      <h1 className='form__head txt--center'>Sign up to Undef</h1>
        <FormCompletion currIdx={index}
          completions={completions} />

        <MultiForm forms={forms} index={index} setter={setIndex} />
    </form>
  )
}

export default SignUp