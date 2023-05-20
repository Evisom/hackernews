import { React, useEffect, useState } from "react"
import { useSelector, useDispatch, connect } from 'react-redux'
import { updateComments, addComment, expandComment, closeComment } from './../store/commentsSlice'
import { loadComment } from './../Article'
import styled from 'styled-components';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';


export default function Comment(props) {
    const [status, loaded] = useState(false)
    const [info, setInfo] = useState({})
    const [kids, setKids] = useState(0)
    const [isOpened, setStatus] = useState(false)
    let comments = useSelector((state) => state.comments.comments)
    const dispatch = useDispatch()

    function expand() {
        console.log(comments)
        dispatch(expandComment({
            id: props.id
        }))
        setStatus(true)
    }

    function close() {
        dispatch(closeComment({
            id: props.id
        }))
        setStatus(false)
    }

    function time(t) {
        let now = Math.round(Date.now()/1000)
        let difference = now - t
        let min = difference/60
        if (min < 60) {
            return Math.round(min) + ' minutes ago'
        } else {
            let h = min / 60 
            if (h < 24) {
                return Math.round(h) + ' hours ago'
            } else {
                return Math.round(h/24) + ' days ago'
            }
        }
    }

    useEffect(() => {
        fetch('https://hacker-news.firebaseio.com/v0/item/' + props.id + '.json')
            .then(response => response.json()).then(data => {
                if (Object.keys(data).includes('kids')) {
                    setKids(data.kids.length)
                }
                setInfo({
                    text: data.text,
                    by: data.by,
                    time: data.time
                })
                loaded(true)
            })
    }, [])

    return (
        <div>

        
        {status ? (
            <Card style={{ marginTop: '12px', marginLeft: props.depth*50+'px' }}>
            <Card.Header>
                <Stack direction="horizontal">
                    <div>
                        by {info.by}
                    </div>
                    {(() => {
                        if (kids > 0 && !isOpened) {
                            return <Button className="ms-auto" variant="outline-dark" size="sm" onClick={expand}>{kids} more</Button>
                        } else if (kids > 0 && isOpened) {
                            return <Button className="ms-auto" variant="outline-dark" size="sm" onClick={close}>close</Button>
                        } else {
                            return <div className="ms-auto"></div>
                        }
                        
                    })()}

                    <div style={{marginLeft: '25px'}}>
                        {time(info.time)}
                    </div>
                </Stack>

            </Card.Header>
            <Card.Body>
                <Card.Text dangerouslySetInnerHTML={{ __html: info.text }} />
            </Card.Body>
        </Card>
        ):(null)}
        </div>
    )
}