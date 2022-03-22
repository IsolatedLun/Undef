import { Link } from 'react-router-dom';
import { CLOCK_ICO, EDIT_ICO, LIST_ICO, TIMES_ICO } from '../../consts';
import { useAuth } from '../../hooks/useAuth';
import { toggleElement } from '../funcs/utilFuncs';
import Button from '../modules/Button';

interface INF_SideNavItem {
    icon: string;
    text: string;
    to: string;
}

const SideNavItem = ({ props } : { props: INF_SideNavItem }) => {
    return(
        <li className='side-nav__item'>
            <Link className='side-nav__link' to={props.to}>
                <p className="fa side-nav__icon">{ props.icon }</p>
                <p className='side-nav__text'>{ props.text }</p>
            </Link>
        </li>
    )
}

const SideNav = () => {
    const { user, isLogged } = useAuth();

    const loggedItems: INF_SideNavItem[] = [
        { icon: LIST_ICO, text: 'Subscriptions', to: '/subscriptions' },
        { icon: CLOCK_ICO, text: 'My history', to: '/watch-history' }
    ]

    return (
        <nav className="side-nav" id='side-nav' role='side navigation'>
            <ul className="side-nav__links">
                <Button props={{ content: TIMES_ICO, action: () => 
                    toggleElement(null, 'side-nav'), 
                    cls: 'button--icon--primary m-bl--025 align--self--c' }} />
                {
                    isLogged && (
                        loggedItems.map(item => (
                            <SideNavItem props={{ ...item }} />
                        ))
                    )
                }
            </ul>
        </nav>
    )
}

export default SideNav