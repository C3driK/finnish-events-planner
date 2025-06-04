import './Footer.css';

const Footer = ({year}) =>{
    return(
        <footer className='footer'>
        <p>Copyright@{year}</p>
        </footer>
    )
}

export default Footer;