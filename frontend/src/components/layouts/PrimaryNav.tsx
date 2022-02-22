import React from 'react';
import { Link } from 'react-router-dom';
import { BARS_ICO, SEARCH_ICO } from '../../consts';
import { useAppDispatch } from '../../hooks/state';
import { useAuth } from '../../hooks/useAuth';
import { logout } from '../../slices/auth-slice';
import { toggleElement } from '../funcs/utilFuncs';
import Button from '../modules/Button';
import Input from '../modules/inputs/Input';
import Profile from './Profile';

const PrimaryNav = () => {
  const user = useAuth();
  const dispatch = useAppDispatch();

  const logoutCommence = () => {
    dispatch(logout())
  }

  return(
      <nav className='primary-nav flex flex--center--between' role='primary nav'>
          <a href="#main-content" className="nav__skip">Skip navigation</a>

          <div className='flex flex--center--gap--1'>
            <Button props={{ content: BARS_ICO, action: toggleElement }} />
            <Link to='/'><h1 className="nav__title">Undef</h1></Link>
          </div>

          <div className='nav__search-part flex flex--center--gap--1 flex--g--1 m--inl--1'>
            <div className="search-inpt__container">
              <Input props={{ setter: () => null, data: '', type: 'text',
                placeholder: 'Search', id: 'nav-search', name: 'search', realType: 'string' }} />

              <ul className="search__results">
                <Link className='search__result text--elliptic' to='/search?s=esh'>minecraft</Link>
              </ul>
            </div>

            <Button props={{ content: SEARCH_ICO, action: () => null, tooltip: 'Search' }} />
          </div>

          <div className="nav__static">
              { user.isLogged && (
                <div className='flex flex--center gap--1'>
                  <Profile props={{ url: user.user.profile, alt: user.user.username, 
                    cls: 'nav__user-profile profile round skel', to: '/channels/' + user.user.id }} />
                    
                  <Button props={{ content: 'Logout', action: () => logoutCommence(), 
                    modifiers: 'btn--hollow' }} />
                </div>
              ) }

              { !user.isLogged && (
                <div className='nav__btn-group flex gap--1'>
                  <Link className='button--primary' to='/auth/login'>Log In</Link>
                  <Link className='button--primary btn--hollow' to='/auth/sign-up'>Sign Up</Link>
                </div>
              ) }

          </div>
      </nav>
  )
};

export default PrimaryNav;
