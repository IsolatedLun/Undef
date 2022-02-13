import React from 'react';
import { BARS_ICO, SEARCH_ICO } from '../../consts';
import { toggleElement } from '../funcs/utilFuncs';
import Button from '../modules/Button';
import Input from '../modules/Input';

const PrimaryNav = () => {
  const isLogged = false;

  return(
      <nav className='primary-nav flex flex--center--between' role='primary nav'>
          <div className='flex flex--center--gap--1'>
            <Button props={{ content: BARS_ICO, action: toggleElement, default: true }} />
            <h1 className="nav__title">Undef</h1>
          </div>

          <div className='flex flex--center--gap--1 flex--g--1 m--inl--1'>
            <Input props={{ setter: () => null, data: '', type: 'text',
            placeholder: 'Search', cls: 'input--primary w--40 cust', id: 'nav-search' }} />
            <Button props={{ content: SEARCH_ICO, action: () => null, default: true,
              tooltip: 'Search' }} />
          </div>

          {
            isLogged 
            ?
            <div className="nav__user-profile profile round skel">
              <img src="" alt="" />
            </div>
            :
            <div className='nav__btn-group flex gap--1'>
              <Button props={{ content: 'Sign Up', action: () => null, default: true }} />
              <Button props={{ content: 'Log In', action: () => null, default: true }} />
            </div>
          }
      </nav>
  )
};

export default PrimaryNav;
