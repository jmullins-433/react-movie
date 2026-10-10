import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Building from '../../assets/building.png';
import Logo from '../../assets/logo1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
   const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

     const handleSearch = (e) => {

         e.preventDefault(); // Prevents the browser from reloading the page
        if (!searchTerm.trim()) return;

        setIsLoading(true);

        setTimeout(() => {
        navigate(`/movies?q=${encodeURIComponent(searchTerm)}`);
        }, 400);
   };
  


  return (
    <div>
        <nav className="navbar">
        <div className="nav content-wrapper justify-between align-center">
            <div className="logo">
                <img  className="logo" src={Logo} alt="Logo" />
            </div>
        <div className="links align-center justify-between">
                <Link className="link router-link-exact-active router-link-active" to="/">Home</Link>
                <Link className="link" to="/movies">Find your movie</Link>
                <Link className="btn-contact" to="/">Contact</Link>
        </div>
        </div>
       </nav>
       
       <section id="landing-page">
        <div className="content__wrapper flex-col align-center justify-between">
            <h1 className="star">
                USA's top movie database
            </h1>
            <h2 className="star">
                Find a movie with <span className="purple">Blinker</span>
            </h2>
            <div className="input__wrapper star">

            <form onSubmit={handleSearch}>
                <input 
                  type="text" 
                  id="movieSearch" 
                  value= { searchTerm }
                  onChange={(e) => setSearchTerm(e.target.value)}
                  
                  placeholder="Search for a movie..."
                  
                  />

                <button className="not-loading" type="submit" disabled={isLoading}>
                    {isLoading ? <span className="loading-state "><FontAwesomeIcon icon="spinner"
                    style={{ color: 'white', marginRight: '8px' }}
                    /></span> : 
                    <FontAwesomeIcon icon="magnifying-glass" />}
                </button>

                

                
                </form>
            </div>
            <img className="building" src={Building} alt="Building"/>
         </div>
    
        </section>
    </div>
  )
}

export default Home