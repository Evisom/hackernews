import { React, useEffect, useState} from "react"
import { useSelector, useDispatch, connect } from 'react-redux'
import {updateComments, addComment} from './../store/commentsSlice'

export default function Comment(props) {
    const [text, setText] = useState('')
    const [kids, setKids] = useState(0)
    let comments = useSelector((state) => state.comments.comments)
    const dispatch = useDispatch()

    function expand() {
        console.log(props.path)
    }

    useEffect(()=>{
        fetch('https://hacker-news.firebaseio.com/v0/item/' + props.id + '.json')
            .then(response => response.json()).then(data => {
                if (Object.keys(data).includes('kids')) {
                    setKids(data.kids.length)
                    console.log("!!")
                    console.log(data)
                }
                setText(data.text)
        })
        console.log(props.id, props.path)
    })

    return (
        <div>
            {props.path.length}, 
            {props.id},
            {kids}
            {(function a () {
                if (kids > 0) {
                    return (
                        <button onClick={expand}> expand</button>
                    )
                }
            }())}
        </div>
    )
}