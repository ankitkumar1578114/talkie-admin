import './index.css';
import { useEffect, useState } from 'react';



const Componenet = ({post})=> {

    useEffect(()=>{

    },[post])

    return (<>
        <div className='post'>
            <div className='post-img'>
                <img src={post.post_img_url} style={{width:'100%',height:'100%',borderRadius:'4px 4px 0 0'}}/>
            </div>
            <div className='post-title'>
                {post.title}
            </div>
            <div className='post-body'>
                {post.body}
            </div>
        </div>
    </>)
}

export default Componenet;
