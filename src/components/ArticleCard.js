import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

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
            })
    }, [])

    return (
        <Card style={{ margin: 'auto', marginTop: '24px' }}>
            <Card.Body>
                <Card.Title href="#">{articleData.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">By {articleData.by}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Score: {articleData.score}</Card.Subtitle>
                <Card.Text>
                    {articleData.text}
                </Card.Text>
                <Stack direction="horizontal" gap={3}>

                    {Object.keys(articleData).includes('url') ? (
                        <Card.Link href={articleData.url}>{articleData.url.split('/')[2]}</Card.Link>
                    ) : (null)}

                    {props.articleMode ? (
                        <Button variant="outline-dark" className='ms-auto' href={'/article/' + props.id}>View comments</Button>
                    ) : (null)}

                </Stack>
            </Card.Body>
        </Card>
    )
}