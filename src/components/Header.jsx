import logo from './../images/logo.png'
import './../App.css'

const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/manage">Manage</a>
            </nav>
        </div>
    );
};

export default Header;