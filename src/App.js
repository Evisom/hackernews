import { React, useEffect, useState } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import { updateArticles } from './store/articlesSlice'
import ArticleCard from './components/ArticleCard'

export default function App(props) {

  let articles = useSelector((state) => state.articles.articleID)
  const dispatch = useDispatch()

  function update() {
    // fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(response => response.json()).then(data => {
        if (data[0] != articles[0]) {
          dispatch(updateArticles({ articleID: data.slice(-5) }))
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
      <button onClick={update}>click</button>

      {articles.map((id) => {
        return <ArticleCard id={id} />
      })}

    </div>
  )

}