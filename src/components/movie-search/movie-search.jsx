import axios from "axios"
import { useEffect, useState } from "react";
import { Card } from '../movie-card/movie-card';
import { useNavigate, useParams } from "react-router-dom";

export function MovieSearch()
{
    const [movies, setMovies] = useState([]);
    const param = useParams();
    const navigate = useNavigate();

    function LoadMovies()
    {
        !param.name || param.name.trim === '' ? navigate('/') :
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${param.name}`)
        .then((response)=> {
            setMovies(response.data.results);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    useEffect(()=>{
        LoadMovies();
    },[param.name]);

    return(
        <div className='container'>
            <div className='row'>
            {
                movies.length > 0 ? movies.map(movie=>
                    <div key={movie.id} className='col-12 col-lg-3 col-md-4 col-sm-6 col-xl-3 col-xxl-3 mb-4 mt-4'>
                        <Card movie={movie} />
                    </div>
                )
                :
                <div className="fw-bold h3 mt-4">No Movie Found!</div>
            }
            </div>
        </div>
    )
}