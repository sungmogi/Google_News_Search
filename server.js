const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 8080;

const corsOptions = {
    origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/', async (req, res) => {
    const { searchTerm, searchNum } = req.body;
    console.log(searchTerm, searchNum);
    try {
        const result = await axios.get('https://serpapi.com/search?engine=google_news', {
            params: {
                q: searchTerm,
                api_key: '8991534353c670c3a3659981b10d1441337afbf59c87df1a9e6bada9ae42a938',
            }
        })
        if (result.status === 200) {
            console.log(`Successfully fetched ${result.data.search_parameters.q} news results on ${result.data.search_parameters.engine}`)
            if (!result.data.news_results) {
                res.send([]);
            }
            else if (result.data.news_results.length < searchNum) {
                res.send(result.data.news_results.slice(0, result.data.news_results.length));
            }
            else {
                res.send(result.data.news_results.slice(0, searchNum));
            }
        }
        else {
            console.log('Failed to fetch news results')
        }
    } catch (e) {
        console.log(e)
    }
});

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
});