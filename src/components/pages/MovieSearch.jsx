import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo1 from '../../assets/whitelogo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const MovieSearch = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';
    
    const [movies, setMovies] = useState([]);
    const [sortOption, setSortOption] = useState('');
    
   const [searchTerm, setSearchTerm] = useState(searchQuery);

   const [isLoading, setIsLoading] = useState(false); 


    const navigate = useNavigate();

        const handleLearnMore = (id) => {
        navigate(`/movies/${id}`);
    };


     useEffect(() => {
  if (searchQuery) {
    const fetchMovies = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=dd2c9531&s=${searchQuery}`
        );
        setMovies(response.data.Search || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
    setSearchParams({}, { replace: true });
  }
}, [searchQuery, setSearchParams]);

    useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

    
    const handleSearch = async () => {
        if (!searchTerm) return;

        setIsLoading(true);
        const response = await axios.get(`https://www.omdbapi.com/?apikey=dd2c9531&s=${searchTerm}`);
        setMovies(response.data.Search || []); 
        
        setTimeout(() => {
        setIsLoading(false); 
      }, 2000); 

      console.log(response.data.Search || []);

    };

    
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch(); 
        }
    };

    
    const sortMovies = (option) => {
        const sortedMovies = [...movies]; 

        if (option === 'az') {
            sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
        } else if (option === 'za') {
            sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
        }

        setMovies(sortedMovies); 
    };

    
    const handleSortChange = (event) => {
        const selectedOption = event.target.value;
        setSortOption(selectedOption); 
        sortMovies(selectedOption); 
    };
    
      



    return (
        <div> 
        
       <div className="flex flex-col">
            <div className="navbarr flex flex-col">
                <div className="flex content-wrapper justify-between align-center">
                    <div className="logo">
                        <img src={Logo1} alt="Blinker logo" />
                    </div>
                    <div className="links flex align-center justify-between">
                        <Link to="/" className="link router-link-active tk">Home</Link>
                        <Link to="/movies" className="link router-link-exact-active router-link-active tk">Find your movie</Link>
                        <Link to="/" className="btnn-contact">Contact</Link>
                    </div>
                    <div id="phone-nav">
                       
                       
                        
                    </div>
                </div>
                <div className="content-wrapper flex-col align-center">
                    <h1 className="next__title">Browse our movies</h1>
                    <div className="input-wrap">
                        
                   <input
                type="text"
                placeholder="Search for movies..."
                onChange={(e) => setSearchTerm(e.target.value)} 
                onKeyPress={handleKeyPress} 
                />
                       
                       <div className="search-wrapper flex justify-center align-center" id="searchButton">
                           <FontAwesomeIcon icon="magnifying-glass" onClick={handleSearch} />
                        </div>
                    </div>

			<div className="moviesGrid"></div>
                      
                </div>
                
                
                 <div className="overlay"></div>
            </div>
            <section id="search">
                <div id="filter" className="content-wrapper justify-between">
                    {searchTerm && (
                    <h1 className="search-info team">
                    <span className="black-txt">Search results for: </span>
                    <span className="search-term"> {searchTerm}</span> 
                    </h1>
                    )}

                   
                   
                 
          <select id="sortMovies" className="sort-select" value={sortOption} onChange={handleSortChange}>
                <option value="">Sort by title</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
            </select>
                
                
                </div>

             {isLoading ? (    
             
             
             <div className="content-wrapper">
                    <div className="loading-state justify-center">
                        <FontAwesomeIcon icon="spinner" />
                    </div>
                </div>  )

                  : (
                  
                  <div>  
            
            
            <div className="moviesGrid">
                {movies.slice(0, 6).map((movie) => (
                    <div className='movie' key={movie.imdbID}>
                        <img src={movie.Poster} onClick={() => handleLearnMore(movie.imdbID)} alt="Poster" />
                        <h2>{movie.Title}</h2>
                        <h4>{movie.Year}</h4>
                        <button className="ms" onClick={() => handleLearnMore(movie.imdbID)}>Learn more</button>
                    </div>
                ))}
            </div>
                  
        </div> )}


              
            
            </section>
        </div>

        
        </div>
        

        )
    
  
};

export default MovieSearch;