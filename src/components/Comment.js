import { React, useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'

import { expandComment, closeComment } from './../store/commentsSlice'

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

export default function Comment(props) {

    const [isLoaded, load] = useState(false)
    const [info, setInfo] = useState({})
    const [kids, setKids] = useState(0)
    const [isOpened, open] = useState(false)

    const expandedComments = useSelector((state) => state.comments.expandedComments)
    const dispatch = useDispatch()

    function expand() {
        dispatch(expandComment({
            id: props.id
        }))
        open(true)
    }

    function close() {
        dispatch(closeComment({
            id: props.id
        }))
        open(false)
    }

    function time(t) {
        let now = Math.round(Date.now() / 1000)
        let difference = now - t
        let min = difference / 60
        if (min < 60) {
            return Math.round(min) + ' minutes ago'
        } else {
            let h = min / 60
            if (h < 24) {
                return Math.round(h) + ' hours ago'
            } else {
                return Math.round(h / 24) + ' days ago'
            }
        }
    }

    function loadKids() {
        fetch('https://hacker-news.firebaseio.com/v0/item/' + props.id + '.json')
            .then(response => response.json()).then(data => {
                if (Object.keys(data).includes('kids')) {
                    setKids(data.kids)
                }
                setInfo({
                    text: data.text,
                    by: data.by,
                    time: data.time
                })
                load(true)
            })
    }

    useEffect(() => {
        if (expandedComments.includes(props.id)) {
            open(true)
        }
        loadKids()
    }, [])

    return (
        <div>
            {isLoaded ? (
                <div>
                    <Card style={{ marginTop: '12px' }}>
                        <Card.Header>
                            <Stack direction="horizontal">
                                <div>
                                    by {info.by}, {props.id}
                                </div>

                                {(() => {
                                    if (kids.length > 0 && !isOpened) {
                                        return <Button className="ms-auto" variant="outline-dark" size="sm" onClick={expand}>{kids.length} more</Button>
                                    } else if (kids.length > 0 && isOpened) {
                                        return <Button className="ms-auto" variant="outline-dark" size="sm" onClick={close}>close</Button>
                                    } else {
                                        return <div className="ms-auto"></div>
                                    }

                                })()}

                                <div style={{ marginLeft: '25px' }}>
                                    {time(info.time)}
                                </div>
                            </Stack>

                        </Card.Header>
                        <Card.Body>
                            <Card.Text dangerouslySetInnerHTML={{ __html: info.text }} />
                        </Card.Body>
                    </Card>
                    <div style={{ marginLeft: '50px' }}>

                        {isOpened ? (
                            kids.map((element) => {
                                console.log("Comment updated")
                                return <Comment key={element} id={element} />
                            })
                        ) : (null)}

                    </div>
                </div>
            ) : (null)}
        </div>
    )
}