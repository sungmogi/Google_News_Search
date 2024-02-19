import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [searchOp, setSearchOp] = useState({ searchTerm: "", searchNum: 10 });
    const navigate = useNavigate();

    const updateSearchOp = (evt) => {
        setSearchOp(oldData => ({...oldData, [evt.target.name]: evt.target.value}));
    }

    const submitSearchTerm = async (evt) => {
        evt.preventDefault();
        const response = await fetch('http://localhost:8080', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchOp)
        })
        const resData = await response.json()
        navigate('/display', { state: { resData, searchOp } });
    };

    return (
        <>
            <h1>Search on Google News</h1>
            <form onSubmit={submitSearchTerm}>
                <label htmlFor='searchTerm'>Input Search Term: </label>
                <input placeholder='Search' value={searchOp.searchTerm} id='searchTerm' name='searchTerm' onChange={updateSearchOp}></input> <br/>
                <label htmlFor='searchNum'>Display Top </label>
                <input type='number' id='searchNum' name='searchNum' onChange={updateSearchOp} value={searchOp.searchNum}></input>
                <label htmlFor='searchNum'>Results</label> <br/>
                <button>Search</button>
            </form>
        </>
    )
}