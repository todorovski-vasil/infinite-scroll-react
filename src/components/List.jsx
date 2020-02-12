import React, { Component } from 'react';

class List extends Component {
    constructor(props) {
        super(props);

        const numAuthors = 10000;
        const authors = [];
        for(let i=10000; i>0; i--) {
            authors.push({
                name: "Author " + (Math.random() * numAuthors * 1000),
                gender: Math.floor(Math.random() * 2) ? "M" : "F"
            });
        }
        const genres = ["fiction", "drama", "poetry"];
        const list = [];
        for(let i=1000000; i>0; i--) {
            list.push({
                isbn: Math.random() * 10000000000,
                name: "Book about " + Math.floor(Math.random() * 1000000),
                author: authors[Math.floor(Math.random() * authors.length)],
                genre: genres[Math.floor(Math.random() * genres.length)],
                publishedDate: new Date((Math.floor(Math.random() * 2020) + 
                    "-" + ((Math.floor(Math.random() * 12) + 1)) + 
                    "-" + ((Math.floor(Math.random() * 28) + 1)))
                    )
            })
        }

        const startIndex = 0, pageSize = 1000;

        this.state = {
            list,
            startIndex,
            pageSize,
            visibleList: list.filter((item, index) => index > startIndex && index < (startIndex + pageSize))
        };

        this.handleScrollEvents = true;
    }

    componentDidMount() {
        document.addEventListener('scroll', this.handleScroll, true);
    }

    componentDidUpdate() {
        this.handleScrollEvents = true;
    }

    render() {
        return (
            <div onScroll={this.handleScroll}>
                <ul >
                    {
                        this.state.visibleList
                            // .filter((item, index) => index < 1000)
                            .map(item => (
                                <li key={item.isbn}>
                                    {item.name + " by " + item.author.name
                                        + ", genre: " + item.genre
                                        + ", published on: " + item.publishedDate}
                                </li>
                            ))
                    }
                </ul>
            </div>
        );
    }

    loadDown() {
        if(this.state.startIndex + this.state.pageSize < this.state.list.length) {
            const newState = {...this.state};
            newState.list = [...this.state.list];
            newState.startIndex += 100;
            newState.visibleList = newState.list.filter((item, index) => {
                return (index > newState.startIndex 
                    && index < (newState.startIndex + newState.pageSize));
            })

            this.setState(newState);
            console.log(newState);
        } else {
            this.handleScrollEvents = true;
        }
    }

    loadUp() {
        if(this.state.startIndex > 0) {
            const newState = {...this.state};
            newState.list = [...this.state.list];
            newState.startIndex -= 100;
            newState.visibleList = newState.list.filter((item, index) => {
                return (index > newState.startIndex 
                    && index < (newState.startIndex + newState.pageSize));
            })

            this.setState(newState);
            console.log(newState);
        } else {
            this.handleScrollEvents = true;
        }
    }

    handleScroll = event => {
        if(this.handleScrollEvents) {
            // console.log(event);

            var lastLi = document.querySelector("ul > li:last-child");
            var firstLi = document.querySelector("ul > li:first-child");
            var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
            var firstLiOffset = firstLi.offsetTop + firstLi.clientHeight;
            var pageOffset = window.pageYOffset + window.innerHeight;
            if (pageOffset > (lastLiOffset * 0.9)) {
                this.handleScrollEvents = false;
                this.loadDown();
            } else if (pageOffset < (lastLiOffset * 0.1)) {
                this.handleScrollEvents = false;
                this.loadUp();
            }
        }
    }
}

export default List;