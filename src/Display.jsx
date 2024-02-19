import { useLocation, useNavigate } from 'react-router-dom';

export default function Display() {
    const { state } = useLocation();
    const navigate = useNavigate();

    console.log(state);
    return (
        <>
            <h1>Top {state.searchOp.searchNum} Search Results for {state.searchOp.searchTerm}</h1>
            
            <ol>
                {state.resData.map((data) =>
                    <li key={data.position}>
                        {data.link ? <a href={data.link}>{data.title}</a> :
                            <>
                                {data.title}
                                <ul>
                                    {data.stories.map((story, idx) =>
                                        <li key={idx}><a href={story.link}>{story.title}</a></li>)}
                                </ul>
                            </>}
                    </li>)}
            </ol>
            <button onClick={() => navigate('/')}>Go Back</button>
        </>
    )
}