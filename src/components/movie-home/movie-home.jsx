import './movie-home.css';
import axios from "axios"
import { useEffect, useState } from "react";
import { Card } from '../movie-card/movie-card';


export function MovieHome()
{
    const [movies, setMovies] = useState([]);
    const [totalRecords, setTotalRecords] = useState([]);
    const [page, setPage] = useState(1);
    
    const totalPages = totalRecords.length;
    const numberOfPages = [...Array(totalPages+1).keys()].slice(1);

    function LoadMovies()
    {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&page=${page}`)
        .then((response)=> {
            setMovies(response.data.results);
        });

        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743`)
        .then((response)=> {
            setTotalRecords(response.data.results);
        });
    }

    function prev() {
        if (page > 1) {
            setPage(page - 1);
        }
      }
      
    function changeCPage(n) {
        setPage(n);
    }

    function next() {
        if (page < totalPages) {
            setPage(page + 1);
        }
    }

    useEffect(()=>{
        LoadMovies();
    },[page]);

    return(
        <div className='container'>
            <div className='row'>
            {
                movies.map(movie=>
                    <div key={movie.id} className='col-12 col-lg-3 col-md-4 col-sm-6 col-xl-3 col-xxl-3 mb-4 mt-4'>
                        <Card movie={movie} />
                    </div>
                )
            }
            </div>
            <div className='col-lg-12 col-md-12 col-sm-12 col-xl-12 col-xxl-12 text-center'>
                <ul className='list-unstyled'>
                    <button className='btn border-black bg-black text-white' onClick={prev}>Prev</button>
                    {
                        numberOfPages.map((n, i) =>
                        <button key={i} className={n === page ? 'btn border-black bg-black text-white' : 'btn bg-white border-black'} onClick={() => changeCPage(n)}>
                            {n}
                        </button>
                        )
                    }
                    <button className='btn border-black bg-black text-white' onClick={next}>Next</button>
                </ul>
            </div>
        </div>
    )
}