import React from 'react';
import Axios from 'axios';

const Search = () => {

    const handleChange = async (e) => {
        const val = e.target.value;
        await Axios.get(`http://localhost:3000/search?search=${val}`).then(value => console.log(value));
    };
    return (
        <div className="ui segment" >
            <form className="ui form">
                <div className="field">
                    <label>Post Search</label>
                    <input type="text" placeholder="Search" onChange={(e) => handleChange(e)}></input>
                </div>
            </form>
        </div>
    );
}
export default Search;