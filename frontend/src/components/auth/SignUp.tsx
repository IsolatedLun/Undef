import { useState } from 'react';
import { useRegisterMutation } from '../../services/authApi';
import MultiForm from '../combines/MultiForm'
import { constructFormData, validateForm } from '../funcs/formFuncs';
import { handleResponse } from '../funcs/utilFuncs';
import Button from '../modules/Button';
import Form from '../modules/Form';
import FormCompletion, { INF_FomrCompletion } from '../modules/FormCompletion';
import InputPart, { } from '../modules/inputs/InputPart';

export interface NewUser {
  username: string;
  email_address: string;
  password: string;
  banner: File | null;
  profile: File | null;
}

const SignUp = () => {
  const [register, { }] = useRegisterMutation()
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
      <InputPart props={{id: 'email', label: 'Email Address', setter: setNewUser,
          inputData: {name: 'email_address', type: 'email', realType: 'email'}}} />,

      <InputPart props={{id: 'password', label: 'Password', setter: setNewUser,
      inputData: {name: 'password', type: 'password', realType: 'password'}}} />,

      <InputPart props={{id: 'username', label: 'Username', setter: setNewUser,
          inputData: {name: 'username', type: 'text', realType: 'string'}}} />,

      <Button props={{ content: 'Next', action: () => setIndex(index + 1), modifiers: 'w--100' }} />,
    ]

  const channelElements: JSX.Element[] = 
    [
      <InputPart props={{id: 'channel-banner', label: 'Channel Banner', setter: setNewUser,
          inputData: {name: 'banner', type: 'file', realType: 'image', placeholder: 'Upload Banner'}}} />,

          <InputPart props={{id: 'description', label: 'Channel Descritpion', setter: setNewUser,
      inputData: {name: 'channel_description', type: 'textarea', realType: 'string'}}} />,

      <Button props={{ content: 'Next', action: () => setIndex(index + 1), modifiers: 'w--100' }} />,
    ]

  const profileElements: JSX.Element[] = 
      [
        <InputPart props={{id: 'profile', label: 'Profile', setter: setNewUser,
            inputData: {name: 'profile', type: 'file', realType: 'image', 
            placeholder: 'Upload Profile', labelCls: 'cust label--profile mi--inline'}}} />,

        <Button props={{ content: 'Create Account', action: async() => {
          if(validateForm('form__inpt', undefined, true))
            await register(constructFormData(newUser)!).unwrap()
            .then(res => handleResponse(res, { redirectTo: '/auth/login' }))
            .catch(res => handleResponse(res))
        }, modifiers: 'w--100' }} />,
      ]

  const registerForm = <Form props={{ id: '0', children: registerElements }} key={0} />
  const channelForm = <Form props={{ id: '1', children: channelElements }} key={1} />
  const profileForm = <Form props={{ id: '2', children: profileElements }} key={2} />

  return (
    <form className="form--container form__container">
      <h1 className='form__head txt--center'>Sign up to Undef</h1>
        <FormCompletion currIdx={index}
          completions={completions} />

        <MultiForm forms={[registerForm, channelForm, profileForm]} index={index} indexFunc={setIndex} />
    </form>
  )
}

export default SignUp