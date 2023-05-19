import { useEffect, useState } from 'react';
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
    useEffect(() => {
        fetch('https://hacker-news.firebaseio.com/v0/item/' + props.id + '.json')
            .then(response => response.json()).then(data => {
                setArticleData(data)
                console.log(data)
            })
    }, [])

    return (
        <Article>
            <a className='title' href={'article/' + props.id}>
                {articleData.title}
            </a>
            <a className='url' href={articleData.url}>
                {articleData.url}
            </a>
            <div className='info'>
                <div>
                    {articleData.by}
                </div>
                <div>
                    {articleData.score}
                </div>
                <div>
                    {new Date(articleData.time * 1000).toDateString()}
                </div>
            </div>
        </Article>
    )
}