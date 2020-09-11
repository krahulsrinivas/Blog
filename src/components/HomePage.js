import React, { useState, useEffect } from 'react';
import Search from './Search';
import CreatePost from './Post';
import Axios from 'axios';
const HomePage = () => {
    const [checkPost, setCheckPost] = useState(false);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        console.log("ho");
        const getPosts = async () => {
            await Axios.get("http://localhost:3000/posts").then(Response=>setPosts(Response.data));
        }
        getPosts();
    },[checkPost])
    return (
        <div className="ui container" style={{ marginTop: "10px" }}>
            <div><Search /></div>
            <div>{
                (!checkPost) ? <button className="ui inverted red button" onClick={() => setCheckPost(true)} style={{ margin: '10px', position: "relative", top: "20px", left: "950px" }}>Create a new Post</button> : <CreatePost onChange={()=>setCheckPost(false)} />
            }
            </div>
            <div style={{ marginTop: "60px" }}>
                <h1>Popular Posts</h1>
                {posts.map((val)=>(
                    <div className="ui segment" key={val._id}>
                    <center ><div style={{fontSize:"25px",fontFamily:"monospace",fontWeight:"bold"}}>{val.title}</div></center>
                    <div style={{paddingLeft:"100px",paddingRight:"100px",paddingTop:"10px",fontFamily:"monospace",fontWeight:"bold",fontSize:"15px"}}>{val.body}</div>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default HomePage;