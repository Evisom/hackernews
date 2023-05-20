import React, { useEffect, useState } from 'react'

import Comment from './components/Comment'
import ArticleCard from './components/ArticleCard'

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export default function Article() {

    const [comments, addComments] = useState([])
    const articleId = window.location.href.split('/').slice(-1)[0]

    function update() {
        loadComments(articleId)
    }

    function loadComments(id, callback = () => { }) {
        fetch('https://hacker-news.firebaseio.com/v0/item/' + id + '.json')
            .then(response => response.json()).then(data => {
                if (Object.keys(data).includes('kids')) {
                    addComments(data.kids)
                }
            })
    }

    useEffect(() => {
        loadComments(articleId)
        setInterval(() => {
            update()
        }, 60 * 1000)
    }, [])

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="light" >
                <Container>
                    <Navbar.Brand href="/">Hacker News</Navbar.Brand>
                    <Button onClick={update} variant="outline-dark">Refresh</Button>
                </Container>
            </Navbar>
            <Container>
                <ArticleCard id={articleId} />
                {comments.map((element) => {
                    console.log("Root comment updated")
                    return <Comment key={element} id={element} />
                })}

            </Container>
        </div>
    )
}
