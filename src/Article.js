import React, { useEffect } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import {updateComments, addComment} from './store/commentsSlice'
import Comment from './components/Comment'

export default function Article() {

    let comments = useSelector((state) => state.comments.comments)
    const dispatch = useDispatch()


    function update() {
        // dispatch(addComment({id: 10}))
        console.log(comments)
    }

    useEffect(()=>{
        const articleId = window.location.href.split('/').slice(-1)
        fetch('https://hacker-news.firebaseio.com/v0/item/' + articleId + '.json')
            .then(response => response.json()).then(data => {
                if (Object.keys(data).includes('kids')) {
                    data.kids.forEach(element => {
                        dispatch(addComment({id: element}))    
                    });
                    
                }
        })
    // console.log(comments)  
    })

    return (
        <div>
            <button onClick={update}>update</button>
            {function commentsOrder(order, c , path) {
                for (const kid in c) {
                    order.push(<Comment path={path} id = {kid}/>)
                    if (c[kid]) {
                        let p = [...path]
                        p.push(kid)
                        commentsOrder(order, c[kid], p)
                    } 
                }
                return order;
            }([], comments, [])}
        </div>
    )
}