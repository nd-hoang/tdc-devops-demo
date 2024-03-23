export default function Header() {
    return (
        <div className="header_section">
            <div className="container-fluid">
                <nav className="navbar navbar-light bg-light justify-content-between">
                    <div id="mySidenav" className="sidenav">
                        <a href="javascript:void(0)" className="closebtn" onclick="closeNav()">&times;</a>
                        <a href="index.html">Home</a>
                        <a href="products.html">Products</a>
                        <a href="about.html">About</a>
                        <a href="client.html">Client</a>
                        <a href="contact.html">Contact</a>
                    </div>
                    <span className="toggle_icon" onclick="openNav()"><img src="images/toggle-icon.png" alt="toggle-icon" /></span>
                    <a className="logo" href="index.html"><img src="images/logo.png" /></a>
                    <form className="form-inline ">
                        <div className="login_text">
                            <ul>
                                <li><a href="#"><img src="images/user-icon.png" alt="user-icon" /></a></li>
                                <li><a href="#"><img src="images/bag-icon.png" alt="bag-icon"/></a></li>
                                <li><a href="#"><img src="images/search-icon.png" alt="search-icon"/></a></li>
                            </ul>
                        </div>
                    </form>
                </nav>
            </div>
        </div>
    );
}