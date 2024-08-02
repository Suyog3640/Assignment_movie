import './movie-main.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { MovieHome } from '../movie-home-pagejsx/movie-home';
import { MovieTopRated } from '../movie-top-rated/movie-top-rated';
import { MovieUpcoming } from '../movie-upcoming/movie-upcoming';
import { MovieDetail } from '../movie-detail/movie-detail';
import { MovieSearch } from '../movie-search/movie-search';
import { useState } from 'react';


export function MovieMain()
{
    const [search, setSearch] = useState('');
    
    return(
        <BrowserRouter>
            <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom p-3">
                <div className="container">
                    <Link className="navbar-brand" to='/'>MovieDb</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to='/popular'>Popular</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/toprated'>Top Rated</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/upcoming'>Upcoming</Link>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <input className="form-control me-2" type='search' placeholder="Movie Name" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                        <Link className="btn bg-secondary text-white" to={`/search/${search}`}>Search</Link>
                    </div>
                    </div>
                </div>  
            </nav>

                <section>
                    <Routes>
                        <Route path='/' element={<MovieHome />} />
                        <Route path='/popular' element={<MovieHome />} />
                        <Route path='/toprated' element={<MovieTopRated />} />
                        <Route path='/upcoming' element={<MovieUpcoming />} />
                        <Route path='/moviedetail/:id' element={<MovieDetail />} />
                        <Route path='/search/:name' element={<MovieSearch />} />
                    </Routes>
                </section>
        </BrowserRouter>
    )
}