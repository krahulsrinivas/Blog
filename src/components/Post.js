import React,{useState} from 'react';
import Axios from 'axios';

const Post=(props) =>{
    const [post,setPost]=useState({"title":"","body":""});
    const formChange = (e, type) => {
        const val = e.target.value
        setPost({ ...post, [`${type}`]: val })
    }
    const handleSubmit=async ()=>{
        if (post['title'].trim()===""||post['body'].trim()===""){
            alert("Title Or Body Cannot Be Empty")
        }else{
            await Axios.post("http://localhost:3000/createPost",post).then((value)=>{
                if (value.data==="Post Created"){
                    props.onChange();
                    alert("Post Published");
                }else{
                    alert(value.data['name']);
                }
            })
        }
    }
    return (
        <div className="ui segment" style={{margin:"80px"}}>
        <div>
        <input type="text" placeholder="Title" style={{fontWeight:"bold",outline:"0",borderWidth: "0 0 3px 0",
        borderColor: "red",marginLeft:"100px"}} onChange={(e)=>formChange(e,"title")} value={post['title']}></input>
        </div>
        <div style={{marginTop:"20px"}}>
        <textarea placeholder="Post" rows="6" cols="80" style={{fontWeight:"bold",borderColor: "red",borderWidth: "3px", outlineColor:"red",marginLeft:"100px"}}  name="Post" onChange={(e)=>formChange(e,"body")} value={post['body']}></textarea>
        </div>
        <div>
        <button className="ui inverted red button" style={{marginTop:"10px",marginLeft:"680px",fontWeight:"bold"}} onClick={handleSubmit}>Publish</button>
        </div>
        </div>
    );

}


export default Post;