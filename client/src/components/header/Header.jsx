import './header.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useContext } from 'react'
import { Context } from '../../context/Context'

const Header = () => {
    const { user } = useContext(Context)
    var settings = {
        dots: true,
        autopaly: true,
        autoplaySpeed: 3000,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className='header'>
            <div className="headerTitles">
                <span className='headerTitleSm'>记录知识与生活</span>
                {user ? <span className='headerTitleLg'>欢迎你！{user._doc.username}</span> :
                    <span className='headerTitleLg'>Aldur的个人Blog</span>}
                <p className="headerDesc">Fear can hold you prisoner. Hope can set you free. A strong man can save himself. A great man can save another.</p>
            </div>
            <Slider {...settings}>
                <div className='headImg'>
                    <img className='headerImg' src="https://th.bing.com/th/id/R.137d8e5724e3da3cdcc34a51021364d1?rik=YWiuCxO6FS4rNw&riu=http%3a%2f%2ftva3.sinaimg.cn%2flarge%2f006yt1Omgy1gc6nz8s0zuj30xc0mbe4x.jpg&ehk=D228LmvROu2bjlwogGcSmVjAQsOFwPr2NtURlDqBGzs%3d&risl=&pid=ImgRaw&r=0" alt="" />
                </div>
                <div className='headImg'>
                    <img className='headerImg' src="https://pic1.zhimg.com/v2-3b31aefe367c0c037cfbf6459736ae69_r.jpg" alt="" />
                </div>
                <div>
                    <img className='headerImg' src="https://th.bing.com/th/id/R.5d5a24dbeffebd71584538a29fdbd950?rik=S0gvGHUfRtQrhQ&riu=http%3a%2f%2fimgs.aixifan.com%2flive%2f1483416173719%2f1483416173719.jpg&ehk=JQ9Ie6d0q%2fC7WGUyBb%2f8OZJAUU4r%2fiZ2RU09JGou5PY%3d&risl=&pid=ImgRaw&r=0" alt="" />
                </div>
            </Slider>
            {/* <img className='headerImg' src="https://th.bing.com/th/id/R.b8121b1b22217838123da6dc12dcbeab?rik=24Nf%2flD1GaltwA&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fT5qp8Ow.jpg&ehk=%2fsn9iFFyZaVdd%2bGzlZhi6QCzrASoFhG2P54an89fuME%3d&risl=&pid=ImgRaw&r=0" alt="" /> */}
        </div>
    );
}

export default Header;
