import React, {useContext, useEffect} from 'react';
import './App.css';
import Register from './components/register/register';
import Login from './components/login/login';
import Write from './components/maincontent/write/write';
import Home from './components/maincontent/home/homepage';
import Navigation from './components/maincontent/navigation/navigation';
import {Routes, Route, useNavigate} from 'react-router-dom';
import NoMatch from './components/nomatch/nomatch';
import { AppContext } from './AppProvider';
import Postpage from './components/maincontent/home/blogcontent/blogpost/postpage';

function App() {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!context.state.auth && window.location.pathname !== '/register') {
      navigate('/');
    }

  }, [context.state.auth, navigate]) 
  
  const onRouteChange = (route) => {
    navigate(route);
  }

  return (
            <div className="App">
              {(() => {
                if (window.location.pathname === '/') {
                  return (
                    <Login
                    updateUser={context.updateUser}
                    onRouteChange={onRouteChange}
                    />
                  );
                }
                if (window.location.pathname === '/register') {
                  return (
                    <Register
                      updateUser={context.updateUser}
                      onRouteChange={onRouteChange}
                    />
                  );
                }              
                if (window.location.pathname === '/home' || window.location.pathname === '/profile' || window.location.pathname === '/write' || window.location.pathname.startsWith('/blog')) {
                  return (
                    <div>
                      {!window.location.pathname.startsWith('/blog') ?
                      <div>
                        <Navigation />
                        <Routes>
                          <Route path="home" element={<Home />} />
                          <Route path="write"
                          element={<Write 
                            writer={context.state.user}
                            onRouteChange={onRouteChange} 
                            />} />
                        </Routes>
                        </div>
                        :
                        <Routes>
                          <Route path="blog/:id" element={<Postpage />} /> 
                        </Routes>
                      }
                      
                    </div>  
                  );
                }          
               else {
                  return (
                    <Routes>
                      <Route path="*" element={<NoMatch />} />
                    </Routes>
                  );
                }
              }
              )()}
            </div>
    )
}
  

export default App;
