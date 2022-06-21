import './header.css';

const Header = () => {
    return (
        <div className='header'>
            <div className="headerTitles">
                <span className='headerTitleSm'>React & Node</span>
                <span className='headerTitleLg'>Blog</span>
            </div>
            <img className='headerImg' src="https://th.bing.com/th/id/R.b8121b1b22217838123da6dc12dcbeab?rik=24Nf%2flD1GaltwA&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fT5qp8Ow.jpg&ehk=%2fsn9iFFyZaVdd%2bGzlZhi6QCzrASoFhG2P54an89fuME%3d&risl=&pid=ImgRaw&r=0" alt="" />
        </div>
    );
}

export default Header;
