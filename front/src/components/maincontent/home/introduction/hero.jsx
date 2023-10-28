import React from 'react';

class AerialComponent extends React.Component {
  render() {

    const imageStyles = {
        color: 'white'
      };

    return (
      <div>
        <div id="wrapper">
          <div id="bg"></div>
          <div id="overlay"></div>
          <div id="main">
            {/* Header */}
            <header id="header">
              {/* <h1>Seogwon Jeong</h1>
              <p>Sleepaholic &nbsp;&bull;&nbsp; Web Developer &nbsp;&bull;&nbsp; CTRL + S Addict</p> */}
              <h2>Blog the World: Where Every Journey Becomes a Story</h2>
              <h3>Vacance is an all-purpose blogging platform that utilizes React, Express, and Postgres.</h3>
              <h3>Share your delightful memories here and have fun!</h3>
            </header>

            {/* Footer */}
            <footer id="footer">
              <span className="copyright">&copy; Untitled. Design: <a style={imageStyles} href="http://html5up.net">HTML5 UP</a>.</span>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

export default AerialComponent;
