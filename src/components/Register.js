import React, { useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
    const [auth, setAuth] = useState({ 'email': "", 'username': "", 'password1': "", 'password2': "" });
    const [loader, setLoader] = useState(false);
    const history=useHistory();
    const formChange = (e, type) => {
        const val = e.target.value
        setAuth({ ...auth, [`${type}`]: val })
    }
    const handleSubmit = async (event) => {
        if (auth['email'].trim() !== "" || auth['username'].trim() !== "" || auth['password1'].trim() !== "" || auth['password2'].trim() !== "") {
            if (auth['password1'].trim() === auth['password2'].trim()) {
                setLoader(true);
                axios.post('http://localhost:3000/auth/register', auth).then((res) => {
                    history.push("/home");
                    // setAuth({ 'email': "", 'username': "", 'password1': "", 'password2': "" })
                    // setLoader(false);
                }).catch((e) => {
                    console.log(e);
                    setLoader(false);
                });
            } else {
                alert("Passwords do not match");
                setAuth({ ...auth, 'password1': "", 'password2': "" })
            }
        } else {
            alert("Please Enter all fields");
        }
    }
    return (
        <center>
            <form className="ui form" onSubmit={(event) => event.preventDefault()} style={{ margin: '100px' }}>
                <div style={{ margin: '10px' }}><h1>Blog Register </h1></div>
                <div className="ui container">
                    <div className="ui large input" style={{ margin: '10px' }}>
                        <input
                            type="text"
                            placeholder="Email"
                            value={auth['email']}
                            onChange={(e) => formChange(e, 'email')}
                        />
                    </div>
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
                                value={auth['password1']}
                                onChange={(e) => formChange(e, 'password1')}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="ui large input" style={{ margin: '10px' }}>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={auth['password2']}
                                onChange={(e) => formChange(e, 'password2')}
                            />
                        </div>
                    </div>
                    <div style={{ margin: '10px' }}>
                        <button className="ui inverted teal button" onClick={handleSubmit}>
                            Register
                            </button>
                    </div>
                    <div>Already have an account?
                    <Link to="/login"><button className="ui inverted teal button" style={{ margin: '10px' }}>Login</button></Link>
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

export default Register;