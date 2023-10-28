import React, {Component} from 'react';
import Blogcontent from './blogcontent/blogcontent';
import AerialComponent from './introduction/hero';

class Home extends Component {
    render() {
        return (
            <div> 
                {/* <Introduction /> */}
                <AerialComponent />
                <Blogcontent />
            </div>
        );
    }
}

export default Home;