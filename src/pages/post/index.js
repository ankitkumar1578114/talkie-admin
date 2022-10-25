import './index.css';
import BackendUrl from '../../urls';
import PostCard from './postCard'
import { useEffect, useState } from 'react';


// const urlToFetch =process.env.backendURL+"/language/"
const urlToFetch = `${BackendUrl}/post/create/0`
// const urlToFetch ="http://localhost:4000/movie/list/8243"


const Componenet = ()=> {

    var [newPostTitle,setNewPostTitle] = useState([]);
    var [newPostImgUrl,setNewPostImgUrl] = useState([]);
    var [newPostBody,setNewPostBody] = useState([]);

    const insertPost = (e)=>{
        e.preventDefault();
        var bodyData = {
            "post_type":1,
            "title":newPostTitle,
            "img_url":newPostImgUrl,
            "body":newPostBody
        }

        fetch(urlToFetch,{
            method : "POST",
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(bodyData)
        })
        .then(res=>res.json())
        .then(json=>{
            setNewPostBody("")
            setNewPostImgUrl("")
            setNewPostTitle("")
            alert("Movie saved")
        }); 

    }

    useEffect(()=>{

    },[])

    return (
        <>
        <div className='create-post'>
            <div className='creation-part'>
                <form onSubmit={insertPost}>
                    <div>
                        <input required className='create-post-item' type="text" placeholder='Post Title' value={newPostTitle} onChange={(e)=>{setNewPostTitle(e.target.value)}}/>
                    </div>
                    <div>
                    <input required className='create-post-item' type="text" placeholder='Post Image url' value={newPostImgUrl} onChange={(e)=>{setNewPostImgUrl(e.target.value)}}/>
                    </div>
                    <div>
                        <textarea required rows="25" className='create-post-item' placeholder='Body' value={newPostBody} onChange={(e)=>{setNewPostBody(e.target.value)}}></textarea>
                    </div>
                    <div>
                        <input className='create-post-item' type="submit"  style={{backgroundColor:'rgb(0,100,100)',color:'white',border:'1px solid white'}}></input>
                    </div>
                </form>
            </div>
            <div className='view-part'>
                <PostCard post={{"title":newPostTitle,"post_img_url":newPostImgUrl,"body":newPostBody}}/>
            </div>
        </div>
        </>    
    );
}

export default Componenet;
