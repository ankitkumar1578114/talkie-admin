import './index.css';
import BackendUrl from '../../urls';
import PostCard from './postCard'
import { useEffect, useState } from 'react';


// const urlToFetch =process.env.backendURL+"/language/"
const urlToCreate = `${BackendUrl}/post/create/0`
const urlToSearch = `${BackendUrl}/movie/search/`
// const urlToFetch ="http://localhost:4000/movie/list/8243"

const PostTypeComponent = ({postType}) =>{
    if(postType==1)
    return (<div className='create-post-item' style={{fontWeight:'600'}}>Movie</div>);   
    if(postType==2)
    return (<div className='create-post-item' style={{fontWeight:'600'}}>News</div>);   
    if(postType==3)
    return (<div className='create-post-item' style={{fontWeight:'600'}}>Article</div>);   

}

const Componenet = ()=> {

    var [newPostTitle,setNewPostTitle] = useState([]);
    var [newPostImgUrl,setNewPostImgUrl] = useState([]);
    var [newPostBody,setNewPostBody] = useState([]);
    var [postType,setPostType] = useState(1);
    var [newPostTags,setNewPostTags] = useState([]);
    var [tagSuggestions,setTagSuggestions] = useState([]);

    const searchTag = (tagToSearch) =>{
        if(tagToSearch==""){
            setTagSuggestions([]);
            return;
        }
        fetch(urlToSearch+tagToSearch,{
            method : "GET",
            mode: 'cors',
            headers: {},
        })
        .then(res=>res.json())
        .then(json=>{
            setTagSuggestions(json)
        }); 

    }

    const addTag = (tag) =>{
        setTagSuggestions([])
        setNewPostTags(oldArray=>[...oldArray,{"id":tag.id,"name":tag.title,type:1}])
    }

    const removeTag = (index) =>{
        // console.log(index)
        setNewPostTags([
            ...newPostTags.slice(0, index),
            ...newPostTags.slice(index + 1, newPostTags.length)])
     }
  
    const insertPost = (e)=>{
        e.preventDefault();
        var bodyData = {
            "post_type":postType,
            "title":newPostTitle,
            "img_url":newPostImgUrl,
            "body":newPostBody,
            "tag":newPostTags
        }

        fetch(urlToCreate,{
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
            setNewPostTags([])
            alert("Movie saved")
        }); 

    }

    return (
        <>
        <div style={{display:'flex',gap:'10px',margin:'10px'}}>
            <button className='tab-button' onClick={()=>setPostType(1)}>
                Movie
            </button>
            <button className='tab-button' onClick={()=>setPostType(2)}>
                News
            </button>
            <button className='tab-button' onClick={()=>setPostType(3)}>
                Article
            </button>    
        </div> 


        <div className='create-post'>
            <div className='creation-part'>
                <form onSubmit={insertPost}>
                    <PostTypeComponent postType={postType}/>

                    <div>
                        <input required className='create-post-item' type="text" placeholder='Post Title' value={newPostTitle} onChange={(e)=>{setNewPostTitle(e.target.value)}}/>
                    </div>
                    <div>
                        <input required className='create-post-item' type="text" placeholder='Post Image url' value={newPostImgUrl} onChange={(e)=>{setNewPostImgUrl(e.target.value)}}/>
                    </div>
                    <div>
                        <input  className='create-post-item' type="text" placeholder='Search Tag' onChange={(e)=>{searchTag(e.target.value)}}/>
                    </div>
                    <div style={{position:'relative'}}>
                        <div class="tag-suggestion">
                            {
                                tagSuggestions.map((tag)=>(
                                    <div onClick={()=>{addTag(tag)}}>{tag.title}</div>
                                ))                            
                            }

                        </div>
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
                <div className='tag-list'>
                    {
                        newPostTags.map((tag,index)=>(<div onClick={(tag)=>{removeTag(index)}}>{tag.name}</div>))                        
                    }
                </div>
                <PostCard post={{"title":newPostTitle,"post_img_url":newPostImgUrl,"body":newPostBody}}/>
            </div>
        </div>
        </>    
    );
}

export default Componenet;
