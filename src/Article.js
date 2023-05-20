import React, { useEffect } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import { updateComments, addComment, expandComment } from './store/commentsSlice'
import Comment from './components/Comment'
import ArticleCard from './components/ArticleCard'

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export default function Article() {

    let comments = useSelector((state) => state.comments.comments)
    let expandedComments = useSelector((state) => state.comments.expandedComments)
    const dispatch = useDispatch()

    const articleId = window.location.href.split('/').slice(-1)[0]

    function update() {
        console.log(comments, expandedComments)
    }

    function loadComment(id, callback = () => { }) {
        fetch('https://hacker-news.firebaseio.com/v0/item/' + id + '.json')
            .then(response => response.json()).then(data => {
                if (Object.keys(data).includes('kids')) {
                    dispatch(addComment({
                        id: id,
                        kids: data.kids
                    }))
                    callback(data)

                }
            })
    }

    useEffect(() => {

        loadComment(articleId, (data) => {
            dispatch(expandComment({
                id: articleId
            }))

            data.kids.forEach(element => {
                loadComment(element, (d) => {
                    d.kids.forEach(e => {
                        loadComment(e)
                    })
                })

            });
        })

    }, [])
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="light" >
                <Container>
                    <Navbar.Brand href="/">HackerNews</Navbar.Brand>
                    <Button onClick={update} variant="outline-dark">Refresh</Button>
                </Container>
            </Navbar>
            <Container>
                <ArticleCard id={articleId}/>

            {function commentsOrder() {
                let order = []
                function dfs(node, depth) {
                    if (!node) return
                    for (let i = 0; i < node.length; i++) {
                        order.push(<Comment id={node[i]} depth={depth} />)
                        if (expandedComments.includes(node[i])) {
                            dfs(comments[node[i]], depth + 1)
                        }
                    }
                }
                dfs(comments[articleId], 0)
                return order
            }()}


            </Container>
            
        </div>
    )
}
