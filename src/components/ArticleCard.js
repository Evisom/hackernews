import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';


import Container from 'react-bootstrap/Container';

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
                {/* <Row>

                        <Col style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'start', paddingLeft: 0 }}>
                            <Card.Link href={articleData.url}>{articleData.url.split('/')[2]}</Card.Link>
                        </Col>
                        {props.articleMode ? (
                            <Col style={{ textAlign: 'right' }}>
                            <Button variant="outline-dark" href={'/article/' + props.id}>View comments</Button>
                        </Col>
                        ): (
                            null
                        )}
                        
                    </Row> */}

                {/* </Container> */}


            </Card.Body>
        </Card>
    )
}