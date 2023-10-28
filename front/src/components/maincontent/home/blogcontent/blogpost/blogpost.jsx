import {React, useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './blogpost.styles.css';
import {Link, Outlet} from 'react-router-dom';
import {FaArrowCircleUp} from 'react-icons/fa';

const blogStyles = {
    margin: '0px 0px 0px 50px',
    height: '300px',
    overflowY: 'scroll'
}

function Blogpost ({id, Blogs, identificationBlog}) {
    const [topButton, setTopButton] = useState(false);
    
    useEffect(() => {
        window.addEventListener("scroll", () => {
            const windowHeight = window.innerHeight;
            const body = document.body;
            const documentHeight = body.offsetHeight;
            const scrollPosition = window.scrollY;

            if (scrollPosition + windowHeight >= documentHeight) {
                // If the user is at the bottom of the page, show the button
                setTopButton(true);
            } else {
                setTopButton(false);
            }
        });
    }, []);

    let paged_blogs = [];
    if (id >= 0)
    {
        let bottom_limit = id*5;
        paged_blogs = [...Blogs.slice(bottom_limit, bottom_limit+5)];
    }
    else { //when some blog filter is applied
        paged_blogs = [...Blogs];
    }

    const onScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <div> 
            {paged_blogs.map((x, key)=> (
                <div key={key} className="blog-post-display">
                    <div>
                        <div dangerouslySetInnerHTML={{__html: x.coverimage}}></div>
                        {/* <img className= "blog-image" src={logo} alt="whatever"></img> */}
                    </div>
                            
                    <Container className="bootstrap">
                        <Row>
                            <Col>
                                <p className = "blog-title">
                                {x.title}
                                {/* Viverra accumsan, sed vestibulum sit turpis neque, sit.wewewewewewewewew
                                mjnhuyuiol,kmnhbgt7y8uiokjnhbgty78uikojhgy8uiokjhy8u */}
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className = "blog-author">
                                    <p>{x.author}</p>         
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={11} style={blogStyles}>
                                <div dangerouslySetInnerHTML={{__html: x.content}}></div>
                                {/*I think blog-texts className won't apply here*/}
                                {/* <p className="blog-texts">
                                At accumsan condimentum donec dictumst eros, tempus in diam. 
                                Ornare gravida quis eu blandit lectus vestibulum egestas. 
                                Congue neque in mi vulputate tincidunt amet arcu varius pulvinar.
                                wewrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
                                weroffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                weriiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiij
                                At accumsan condimentum donec dictumst eros, tempus in diam. 
                                Ornare gravida quis eu blandit lectus vestibulum egestas. 
                                Congue neque in mi vulputate tincidunt amet arcu varius pulvinar.
                                wewrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
                                weroffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                weriiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiijwewewewewe
                                wewewehhiuwhgijwenbhfiduoigjrnehbdgyfihujrtnekbdhfhrebdhfjgnrekbdhf
                                ebfduihijrendkhjfghuerijdsnhgfbueijdskmlfgrkjheijsldkcnfjrheiwjdknfkj
                                hjfhueijlkndhgbrhuerijdlkhfreijdknfkjrbheidjnkrbednjkfrheuijdlknfbr
                                shusdiojlknkbhhuijoklnjkhvygiuohjlknjcfyguhilkbjvhjyguhilknbjkguhijknb
                                ghcygiuhnjkjvfyguhiknbjvguhijoknjbkguijknbvkguhijnbjhijnkjbkguhiknbv
                                </p> */}
                            </Col>
                        </Row>
                        <Row>
                            <Col className="overall">
                                <Link to= {`/blog/${x.id}`} className="blog-ReadMore-Arrow">Read More

                                {/* <div onClick={() => readMoreClicked(x.id)} className = "blog-ReadMore-Arrow">
                                Read More */}
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="svg-arrow"
                                >
                                <path
                                    stroke="#382E53"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 17l5-5-5-5M6 17l5-5-5-5"
                                ></path>
                                </svg>   
                                {/* </div> */}
                                </Link>
                            </Col>
                            {/* <Col>
                                <div className="likes">
                                    <FiHeart className="heart"
                                    />
                                    <div className = "heart-count">{x.Likes}</div> 
                                </div>
                            </Col> */}
                            <Col>
                                <div>
                                    {x.tags === '' ? <p className="blog-tags">None</p> : <p className ="blog-tags">{x.tags} </p>}
                                </div>
                            </Col>
                        </Row>  
                    </Container>
                    <Outlet />
                </div>
            ))}
           <div>
            {topButton && (
                <button onClick ={onScroll} className="btn-scrollTop">
                    <FaArrowCircleUp/>
                </button>
            )}
           </div>
            
       
        </div>
    );
}

export default Blogpost;
