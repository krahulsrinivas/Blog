import React,{useState} from 'react';
import { Link,useHistory } from 'react-router-dom';
import axios from 'axios';
const Login=()=>{
    const [auth,setAuth]= useState({"username":"","password":""});
    const [loader, setLoader] = useState(false);
    const history=useHistory();

    const formChange=(e,type)=>{
        const val = e.target.value
        setAuth({ ...auth, [`${type}`]: val })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if ( auth['username'].trim() !== "" || auth['password'].trim() !== "") {
                setLoader(true);
                await axios.post('http://localhost:3000/auth/login', auth).then((res) => {
                    if (res.data.length===0){
                        alert("Username does not exist");
                    }else{
                        if (res.data[0]['password']!==auth['password']){
                            alert("Incorrect Password");
                        }else{
                            history.push("/home");
                           setAuth({  'username': "", 'password': "", })
                        }
                    }
                    setLoader(false);
                }).catch((e) => {
                    console.log(e);
                    setLoader(false);
                });
        } else {
            alert("Please Enter all fields");
        }
    }
    return(
        <center>
            <form className="ui form" onSubmit={(event) => event.preventDefault()} style={{ margin: '100px' }}>
                <div style={{ margin: '10px' }}><h1>Blog Login</h1></div>
                <div className="ui container">
                    <div>
                        <div className="ui large input" style={{ margin: '10px' }}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={auth['username']}
                                onChange={(e) => formChange(e, 'username')}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="ui large input" style={{ margin: '10px' }}>
                            <input
                                type="password"
                                placeholder="Password"
                                value={auth['password']}
                                onChange={(e) => formChange(e, 'password')}
                            />
                        </div>
                    </div>
                    <div style={{ margin: '10px' }}>
                        <button className="ui inverted teal button" onClick={handleSubmit}>
                            Login
                            </button>
                    </div>
                    <div>Don't Have an account?
                        <Link to="/"><button className="ui inverted teal button" style={{ margin: '10px' }}>Register</button></Link>
                    </div>
                </div>
            </form>
            {loader === true ? (
                <div className="ui large active loader"></div>
            ) : (
                    <div></div>
                )}
        </center>
    );
}

export default Login;
