import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
// import { getDefaultNormalizer } from '@testing-library/react';


export default class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1
        }
        document.title = `${this.props.category} - NewsMonkey`;
    }

    static defaultProps = {
        country: 'in',
        pageSize: 9,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    async componentDidMount() {
        this.setState.loading = true
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=675f1fe695e5416dbfa6b6f79f9cce64&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url)
        let parsedData = await data.json()
        // console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            loading: false
        })
    }


    handlePrevousBtn = async () => {
        this.setState.loading = true
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=675f1fe695e5416dbfa6b6f79f9cce64&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url)
        let parsedData = await data.json()
        // console.log(parsedData);
        // this.setState({ articles: parsedData.articles })
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }

    handleNextBtn = async () => {
        this.setState.loading = true;
        // console.log('next btn');
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=675f1fe695e5416dbfa6b6f79f9cce64&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading: false
        })
    }

    render() {
        return (
            <div className='container'>
                {this.state.loading && <Spinner />}
                <h3 className="text-center my-4" >Daily Top <b><i>{this.props.category} </i></b>Headlines</h3>
                <div className='row'>
                    {this.state.articles.map((element) => {
                        return <div className='col md-4' key={element.url}>
                            <NewsItems title={element.title ? element.title.slice(0, 40) : " "} description={element.description ? element.description.slice(0, 100) : " "}
                                imgUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
                        </div>
                    })}
                </div>
                <div className='container d-flex justify-content-between my-2'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevousBtn}>Previous</button>
                    <button type="button" className="btn btn-dark" onClick={this.handleNextBtn}>Next</button>
                </div>
            </div>
        )
    }
}

