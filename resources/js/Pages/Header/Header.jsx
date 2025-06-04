import {Link, NavLink} from 'react-router';
import './Header.css';

const Header = ({logo}) =>{
    return (
        <header className='header'> 
            <div>
                <Link to = '/' className='navLink'>
            <h2>{logo}</h2>
            </Link>
            </div>
            <nav>
                <ul>
                    <li className='navListItem'> <NavLink to = '/' className='navLink'>Home</NavLink></li>
                    <li className='navListItem'> <NavLink to = '/event' className='navLink' >Events</NavLink></li>
                    <li className='navListItem'> <NavLink to = '/add' className='navLink' >Add Event</NavLink></li>
                   
                </ul>
                </nav>
        </header>
    );
}

export default Header;