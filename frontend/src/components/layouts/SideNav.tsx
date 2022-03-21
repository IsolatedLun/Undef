import { CLOCK_ICO, EDIT_ICO, LIST_ICO, TIMES_ICO } from '../../consts';
import { useAuth } from '../../hooks/useAuth';
import { toggleElement } from '../funcs/utilFuncs';
import Button from '../modules/Button';

const SideNav = () => {
    const { user, isLogged } = useAuth();

  return (
    <nav className="side-nav" id='side-nav' role='side navigation'>
        <ul className="side-nav__links">
            <Button props={{ content: TIMES_ICO, action: () => 
                toggleElement(null, 'side-nav'), 
                cls: 'button--icon--primary m-bl--025 align--self--c' }} />
            {
                isLogged && (<>
                    <li>
                        <p className="fa">{ LIST_ICO }</p>
                        <p>Subscriptions</p>
                    </li>
                    <li>
                        <p className="fa">{ CLOCK_ICO }</p>
                        <p>Watch later</p>
                    </li>
                </>)
            }
        </ul>
    </nav>
  )
}

export default SideNav