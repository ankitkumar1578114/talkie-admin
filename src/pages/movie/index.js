import './index.css';
import BackendUrl from '../../urls';

import { useEffect, useState } from 'react';


// const urlToFetch =process.env.backendURL+"/language/"
const urlToFetch = `${BackendUrl}/movie/create/0`

const urlToFetchUpcomingMovies = "https://api.themoviedb.org/3/movie/upcoming?api_key=74ac704fd074ad2bbe8a579ac983f615&language=en-US&page=1"
const urlToPostUpcomingMoviesInMyDatabase = `${BackendUrl}/movie/create/upcoming/0`;


const Componenet = ()=> {

    var [newMovieTitle,setNewMovieTitle] = useState("");
    var [newMovieOriginalTitle,setnewMovieOriginalTitle] = useState("");
    var [newMovieBudget,setNewMovieBudget] = useState(0);
    var [newMovieOverview,setNewMovieOverview] = useState("");
    var [newMovieGoogleURL,setNewMovieGoogleURL] = useState("");
    var [newMovieRuntime,setNewMovieRuntime] = useState("");
    var [newMovieReleaseDate,setNewMovieReleaseDate] = useState("");
    var [newMovieTagline,setNewMovieTagline] = useState("");
    var [newMovieOriginalLanguage,setnewMovieOriginalLanguage] = useState("");

    const insertMovie = (e)=>{
        e.preventDefault(); 
        var bodyData = {
            "title":newMovieTitle,
            "original_title":newMovieOriginalTitle,
            "budget":newMovieBudget,
            "overview":newMovieOverview,
            "google_url":newMovieGoogleURL,
            "runtime":newMovieRuntime,
            "release_date":newMovieReleaseDate,
            "tagline":newMovieTagline,
            "original_language":newMovieOriginalLanguage
        }

        fetch(urlToFetch,{
            method : "POST",
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(bodyData)
        })
        .then(res=>res.json())
        .then(json=>{
            alert("Movie saved")
        }); 

    }

    const fetchUpcomingMovies = () =>{
        fetch(urlToFetchUpcomingMovies,{
            method : "GET",
            mode:'cors',
            header:{}
        })
        .then(res=>res.json()).
        then(json=>{

            console.log(json)

            var bodyData = {
                upcoming_movies:json.results
            }

            fetch(urlToPostUpcomingMoviesInMyDatabase,{
                method : "POST",
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify(bodyData)
            })
            .then(res=>res.json())
            .then(json=>{
                console.log(json)
                alert("Movies are saved")
            }); 
        
        })
    }

    return (
        <>
        <input type ="button" onClick={fetchUpcomingMovies} value="Fetch Upcoming movies"/>

        <div className='create-post'>
            <div className='creation-part'>
                <form onSubmit={insertMovie}>

                    <div>
                        <input required className='create-post-item' type="text" placeholder='Movie Title' value={newMovieTitle} onChange={(e)=>{setNewMovieTitle(e.target.value)}}/>
                    </div>

                    <div>
                        <input required className='create-post-item' type="text" placeholder='Original Title' value={newMovieOriginalTitle} onChange={(e)=>{setnewMovieOriginalTitle(e.target.value)}}/>
                    </div>

                    <div>
                        <textarea required rows="5" className='create-post-item' placeholder='Tagline' value={newMovieTagline} onChange={(e)=>{setNewMovieTagline(e.target.value)}}></textarea>
                    </div>

                    <div>
                        <textarea required rows="15" className='create-post-item' placeholder='Overview' value={newMovieOverview} onChange={(e)=>{setNewMovieOverview(e.target.value)}}></textarea>
                    </div>

                    <div>
                        <input required className='create-post-item' type="text" placeholder='Budget' value={newMovieBudget} onChange={(e)=>{setNewMovieBudget(e.target.value)}}/>
                    </div>

                    <div>
                        <input required className='create-post-item' type="text" placeholder='Poster Url' value={newMovieGoogleURL} onChange={(e)=>{setNewMovieGoogleURL(e.target.value)}}/>
                    </div>

                    <div>
                        <input required className='create-post-item' type="text" placeholder='Runtime' value={newMovieRuntime} onChange={(e)=>{setNewMovieRuntime(e.target.value)}}/>
                    </div>

                    <div>
                        <input required className='create-post-item' type="text" placeholder='Original Language' value={newMovieOriginalLanguage} onChange={(e)=>{setnewMovieOriginalLanguage(e.target.value)}}/>
                    </div>

                    <div>
                        <input required className='create-post-item' type="date" placeholder='Release Date' value={newMovieReleaseDate} onChange={(e)=>{setNewMovieReleaseDate(e.target.value)}}/>
                    </div>



                    <div>
                        <input className='create-post-item' type="submit"  style={{backgroundColor:'rgb(0,100,100)',color:'white',border:'1px solid white'}}></input>
                    </div>
                </form>
            </div>
            <div className='view-part'>
                {/* <PostCard post={{"title":newPostTitle,"post_img_url":newPostImgUrl,"body":newPostBody}}/> */}
            </div>
        </div>
        </>    
    );
}

export default Componenet;
