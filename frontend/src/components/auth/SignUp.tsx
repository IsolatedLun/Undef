import React, { useState } from 'react'
import MultiForm from '../combines/MultiForm'
import Button from '../modules/Button';
import Form from '../modules/Form';
import FormCompletion, { INF_FomrCompletion } from '../modules/FormCompletion'
import InputPart, { INF_InputPart } from '../modules/inputs/InputPart';

interface NewUser {
  email_address: string;
  password: string;
  banner: File | null;
}

const SignUp = () => {
  const [index, setIndex] = useState<number>(0);

  const [newUser, setNewUser] = useState<NewUser>({
    email_address: '',
    password: '',
    banner: null
  })

  const completions: INF_FomrCompletion[] = 
    [ { text: 'Registration', idx: 1 }, 
      { text: 'Channel', idx: 2 },
      { text: 'Profile', idx: 3 },
    ]

  const registerElements: JSX.Element[] = 
  [
    <InputPart props={{id: 'email', label: 'Email Address', 
      inputData: {name: 'email', type: 'email', realType: 'email'}}} />,
    <InputPart props={{id: 'password', label: 'Password', 
    inputData: {name: 'password', type: 'password', realType: 'password'}}} />,
    <Button props={{ content: 'Next', action: () => setIndex(index + 1), default: true, 
      modifiers: 'w--100' }} />,
  ]

  const channelElements: JSX.Element[] = 
  [
    <InputPart props={{id: 'channel-banner', label: 'Channel Banner', 
      inputData: {name: 'banner', type: 'file', realType: 'file'}}} />,
    <InputPart props={{id: 'description', label: 'Channel Descritpion', 
    inputData: {name: 'channel__description', type: 'text', realType: 'string'}}} />,
    <Button props={{ content: 'Next', action: () => setIndex(index + 1), default: true, 
      modifiers: 'w--100' }} />,
  ]

  const els = [
    
    <Button props={{ content: 'test2', action: () => null }} />
  ]

  const registerForm = <Form props={{ id: '0', setter: setNewUser, data: newUser,
    children: registerElements }} />

    const channelForm = <Form props={{ id: '1', setter: setNewUser, data: newUser,
    children: channelElements }} />

  return (
    <form className="auth-form-container form__container">
      <h1 className='form__head txt--center'>Sign up to Undef</h1>
        <FormCompletion currIdx={index}
          completions={completions} />

        <MultiForm forms={[registerForm, channelForm]} index={index} indexFunc={setIndex} />
    </form>
  )
}

export default SignUp