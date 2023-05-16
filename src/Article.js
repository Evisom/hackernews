import React from 'react'

export default class Article extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const articleId = window.location.href.split('/').slice(-1)[0]
        console.log(articleId)
    }

    render() {
        return(
            <div>
                article
            </div>
        )
    }
}