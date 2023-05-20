import { React, useEffect, useState } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import { updateArticles } from './store/articlesSlice'
import ArticleCard from './components/ArticleCard'

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


export default function App(props) {

  let articles = useSelector((state) => state.articles.articleID)
  const dispatch = useDispatch()

  function update() {
    // fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(response => response.json()).then(data => {
        if (data[0] != articles[0]) {
          dispatch(updateArticles({ articleID: data.slice(-10) }))
        }
      })
  }

  useEffect(() => {
    update()
    // setInterval(() => {
    //   update()
    // }, 60*1000)  
  }, [])

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" >
        <Container>
        <Navbar.Brand href="/">HackerNews</Navbar.Brand>
        <Button onClick = {update} variant="outline-dark">Refresh</Button>
        </Container>        
      </Navbar>
      <Container>
      {articles.map((id) => {
        return <ArticleCard id={id} articleMode={true} />
      })}

      </Container>
      
    </div>
  )

}