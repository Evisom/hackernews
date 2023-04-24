import React from 'react'

export default class Article extends React.Component {

    componentDidMount() {
        console.log(this.props.match.params.id)
    }

    render() {
        return(
            <div>
                article
            </div>
        )
    }
}