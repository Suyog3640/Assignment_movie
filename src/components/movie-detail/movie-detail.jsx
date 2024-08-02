import './movie-detail.css';
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";


export function MovieDetail()
{
    const param = useParams();
    const [movieDetails, setMovieDetails] = useState({});
    const [castDetails, setCastDetails] = useState({});

    function LoadMovieDetail()
    {
        axios.get(`https://api.themoviedb.org/3/movie/${param.id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`)
        .then((response)=> {
            setMovieDetails(response.data);
        });

        axios.get(`https://api.themoviedb.org/3/movie/${param.id}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`)
        .then((response)=> {
            setCastDetails(response.data);
        });
    }

    useEffect(()=>{
        LoadMovieDetail();
    },[]);

    return(
        <div>   
            <div className="container">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12 col-xxl-12 mt-3 rounded-3" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path})`, backgroundSize: 'cover', height: '71vh'}}>
                    <div className="d-flex ms-5 pt-4 gap-3 text-white">
                        <div>
                            <img className="border shadow-lg" src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} width='200px' height='250px' />
                        </div>
                    <div className="d-flex flex-column">
                        <span className="h2 fw-bold">{movieDetails.original_title}</span>
                        <span className="fw-lighter h5">Rating : {movieDetails.vote_average}</span>
                        <div className="mt-4">
                            <span className="bg-black border p-1">{movieDetails.runtime} min</span>
                            <span className="ms-3">{movieDetails.genres?.map(g=>
                                <span key={g.id} className="fw-lighter me-1">{g.name},</span>
                            )}
                            </span>
                        </div>
                        <span className="fw-medium mt-4">Release Date : {new Date(movieDetails.release_date).toLocaleDateString('en-US', { weekday: 'short' })} {new Date(movieDetails.release_date).toLocaleDateString('en-US', { month: 'long' })} {new Date(movieDetails.release_date).getDate()} {new Date(movieDetails.release_date).getFullYear()} </span>
                    </div>
                    </div>
                    <div className="h3 ms-5 mt-3 text-white">
                        <span className="fw-bold">Overview</span>
                        <p className="col-sm-12 d-flex h6 mt-3 w-50">{movieDetails.overview}</p>
                    </div>
                </div>
            </div>
            <div className='container-fluid mt-3'>
                <span className='h3 fw-semibold'>Cast</span>
                <div className="row">
                {
                    castDetails.cast?.map(cast=>
                        <div className="col-lg-4 col-md-4 col-sm-6 col-xl-3 col-xxl-2 mb-4 mt-4" key={cast.id}>
                            <img src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`} className="card-img-top card-image border-bottom" />
                            <div className="card-body p-2">
                                <h5 className="card-title">{cast.original_name}</h5>
                                <p className="card-text">Character: {cast.character}</p>
                            </div>
                        </div>
                    )
                }
                </div>
            </div>
        </div>
    )
}