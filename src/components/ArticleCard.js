import { useState } from 'react';
import styled from 'styled-components';

const Article = styled.div`
        margin: 0 auto;
        width: 80%;
        display: flex;
        flex-direction: column;
        padding: 32px;
        border: 1px solid gray;
        .title {
            margin-bottom: 10px;
        }
        .url {
            margin-bottom: 10px;
        }
        .info {
            /* width: 100%; */
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
`;

export default function AricleCard(props) {

    const [articleData, setArticleData] = useState({
        title: '',
        time: '',
        url: '',
        by: '',
        score: ''
    })

    fetch('https://hacker-news.firebaseio.com/v0/item/'+props.id+'.json')
    .then(response=>response.json()).then(data=>{  
        setArticleData(data)
    })

    return(
        <Article>
            <a href={'article/' + props.id}>
                <div className='title'>
                    {articleData.title}
                </div>
                <div className='url'>
                    {articleData.url}
                </div>
                <div className='info'>
                    <div>
                    {articleData.by}
                    </div>
                    <div>
                    {articleData.score}
                    </div>
                    <div>
                    {articleData.time}
                    </div>
                    
                </div>
            </a>
        </Article>
    )
}