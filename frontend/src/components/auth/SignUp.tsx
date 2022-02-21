import React, { useState } from 'react'
import { useRegisterMutation } from '../../services/authApi';
import MultiForm from '../combines/MultiForm'
import { constructFormData, validateForm } from '../funcs/formFuncs';
import Button from '../modules/Button';
import Form from '../modules/Form';
import FormCompletion, { INF_FomrCompletion } from '../modules/FormCompletion'
import InputPart, { INF_InputPart } from '../modules/inputs/InputPart';

export interface NewUser {
  username: string;
  email_address: string;
  password: string;
  banner: File | null;
  profile: File | null;
}

const SignUp = () => {
  const [register, { isSuccess }] = useRegisterMutation()
  const [index, setIndex] = useState<number>(0);

  const [newUser, setNewUser] = useState<NewUser>({
    username: '',
    email_address: '',
    password: '',
    banner: null,
    profile: null,
  })

  const completions: INF_FomrCompletion[] = 
    [ { text: 'Registration', idx: 1 }, 
      { text: 'Channel', idx: 2 },
      { text: 'Profile', idx: 3 },
    ]
  
    const registerElements: JSX.Element[] = 
      [
      <InputPart props={{id: 'email', label: 'Email Address', setter: setNewUser, data: newUser,
          inputData: {name: 'email_address', type: 'email', realType: 'email'}}} />,

      <InputPart props={{id: 'password', label: 'Password', setter: setNewUser, data: newUser,
      inputData: {name: 'password', type: 'password', realType: 'password'}}} />,

      <InputPart props={{id: 'username', label: 'Username', setter: setNewUser, data: newUser,
          inputData: {name: 'username', type: 'text', realType: 'string'}}} />,

      <InputPart props={{id: 'business_email', label: 'Business Email Address', 
          setter: setNewUser, data: newUser, inputData: 
          {name: 'business_email', type: 'email', realType: 'email', isOptional: true}}} />,

      <Button props={{ content: 'Next', action: () => setIndex(index + 1), modifiers: 'w--100' }} />,
      ]

    const channelElements: JSX.Element[] = 
      [
      <InputPart props={{id: 'channel-banner', label: 'Channel Banner', setter: setNewUser, data: newUser,
          inputData: {name: 'banner', type: 'file', realType: 'image', placeholder: 'Upload Banner'}}} />,

          <InputPart props={{id: 'description', label: 'Channel Descritpion', setter: setNewUser, data: newUser,
      inputData: {name: 'channel_description', type: 'textarea', realType: 'string'}}} />,

      <Button props={{ content: 'Next', action: () => setIndex(index + 1), modifiers: 'w--100' }} />,
      ]

    const profileElements: JSX.Element[] = 
        [
        <InputPart props={{id: 'profile', label: 'Profile', setter: setNewUser, data: newUser,
            inputData: {name: 'profile', type: 'file', realType: 'image', 
            placeholder: 'Upload Profile', labelCls: 'cust label--profile mi-inline'}}} />,

        <Button props={{ content: 'Create Account', action: async() => {
          if(validateForm('form__inpt', null))
            await register(constructFormData(newUser)!).then(req => console.log(req))
        }, modifiers: 'w--100' }} />,
        ]

    const registerForm = <Form props={{ id: '0', children: registerElements }} key={0} />

    const channelForm = <Form props={{ id: '1', children: channelElements }} key={1} />

    const profileForm = <Form props={{ id: '2', children: profileElements }} key={2} />

  return (
    <form className="auth-form-container form__container">
      <h1 className='form__head txt--center'>Sign up to Undef</h1>
        <FormCompletion currIdx={index}
          completions={completions} />

        <MultiForm forms={[registerForm, channelForm, profileForm]} index={index} indexFunc={setIndex} />
    </form>
  )
}

export default SignUp