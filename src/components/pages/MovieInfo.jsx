import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MovieInfo = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState(null); 

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                setLoading(true);
                setApiError(null);
                
                const response = await fetch(`https://www.omdbapi.com/?apikey=dd2c9531&i=${id}`);
                const data = await response.json();
                console.log(data);

                if (data.Response === "False") {
                    setApiError(data.Error);
                    setMovieData(null);
                } else {
                    setMovieData(data);
                }
            } catch (error) {
                console.error("Error fetching movie data:", error);
                setApiError("Network error. Please try again later.");
            } finally {
                setLoading(false); 
            }
        };

        if (id) {
            fetchMovieData();
        }
    }, [id]); 

    if (loading) {
        return <div style={{ padding: '20px' }}>Loading movie details...</div>; 
    }

    if (apiError) {
        return (
            <div style={{ padding: '20px', color: 'red' }}>
                <h3>Error: {apiError}</h3>
                <p>The ID passed to the URL (<code>{id}</code>) is not a valid IMDb ID.</p>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

    if (!movieData) {
        return <div style={{ padding: '20px' }}>No movie data found.</div>; 
    }

    return (
        <div style={{ padding: '20px' }}>
            <button onClick={() => navigate(-1)} style={{ marginBottom: '20px', backgroundColor: '#6030b1', border: '1px solid #6030b1', cursor: 'pointer' }}>← Back to Search</button>
            <h1>{movieData.Title}</h1>
            {movieData.Poster && movieData.Poster !== "N/A" && (
                <img src={movieData.Poster} alt={movieData.Title} style={{ maxHeight: '400px' }} />
            )}
            <p><strong>Plot:</strong> {movieData.Plot}</p>
            <p><strong>Rating:</strong> {movieData.Rated}</p>
            <p><strong>Released:</strong> {movieData.Released}</p>
        </div>
    );
};

export default MovieInfo;
