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
        const genres = ["fiction", "drama", "poetry", "finance", "horor"];
        const list = [];
        for(let i=1000000; i>0; i--) {
            let publishedDate = new Date((Math.floor(Math.random() * 1020) + 1000) +
                "-" + ((Math.floor(Math.random() * 12) + 1)) + 
                "-" + ((Math.floor(Math.random() * 28) + 1))
                );
            const author = authors[Math.floor(Math.random() * authors.length)];
            const genre = genres[Math.floor(Math.random() * genres.length)];
            if(i % 5 === 4 && genre === "horor") {
                publishedDate = new Date((Math.floor(Math.random() * 1020) + 1000) + "-10-31");
            }
            list.push({
                isbn: Math.random() * 10000000000,
                name: "Book about " + Math.floor(Math.random() * 1000000),
                author,
                genre,
                publishedDate
            })
        }

        const startIndex = 0, pageSize = 1000;

        this.state = {
            list,
            genres,
            startIndex,
            pageSize,
            genreFilter: null,
            genderFilter: null,
            availableList: [...list],
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
            <React.Fragment>
                <div>
                    <button onClick={this.orderByBookName}>order by book name</button>
                    <button onClick={this.orderByAuthorName}>order by author name</button>
                    <input type="radio" name="genres" onClick={this.genreChange} value="all" />all genres
                    {this.state.genres.map(genre => (<span key={genre}>
                        <input type="radio" name="genres" onClick={this.genreChange} value={genre}/>{genre}
                        </span>)
                    )}
                    <input type="radio" name="gender" onClick={this.genderChange} value="all" />all genders
                    <input type="radio" name="gender" onClick={this.genderChange} value="M" />male authors
                    <input type="radio" name="gender" onClick={this.genderChange} value="F" />female authors
                </div>
                <div onScroll={this.handleScroll}>
                    <ul>
                        {
                            this.state.visibleList
                                .map(item => {
                                    let classes = "";
                                    if(item.genre === "horor" && item.publishedDate.getUTCMonth() === 9 && item.publishedDate.getUTCDate() === 31) {
                                        classes += "halloween";
                                    } else if(item.genre === "finance" && item.publishedDate.getUTCDay() === 5) {
                                        let nextFriday = new Date(item.publishedDate.getTime());
                                        nextFriday.setDate(nextFriday.getDate() + 7);
                                        if(nextFriday.getMonth() === item.publishedDate.getMonth()) {
                                            classes += "business";
                                        }
                                    }
                                    return (
                                        <li key={item.isbn} className={classes}>
                                            {item.name + " by " + item.author.name
                                                + ", genre: " + item.genre
                                                + ", published on: " + item.publishedDate}
                                        </li>
                                    );
                                })
                        }
                    </ul>
                </div>
            </React.Fragment>
        );
    }

    loadDown() {
        if(this.state.startIndex + this.state.pageSize < this.state.list.length) {
            const newState = {...this.state};
            newState.list = [...this.state.list];
            newState.availableList = [...this.state.availableList];
            newState.startIndex += 100;
            newState.visibleList = newState.availableList.filter((item, index) => {
                return (index > newState.startIndex 
                    && index < (newState.startIndex + newState.pageSize));
            })

            this.setState(newState);
            // console.log(newState);
        } else {
            this.handleScrollEvents = true;
        }
    }

    loadUp() {
        if(this.state.startIndex > 0) {
            const newState = {...this.state};
            newState.list = [...this.state.list];
            newState.availableList = [...this.state.availableList];
            newState.startIndex -= 100;
            newState.visibleList = newState.availableList.filter((item, index) => {
                return (index > newState.startIndex 
                    && index < (newState.startIndex + newState.pageSize));
            })

            this.setState(newState);
            // console.log(newState);
        } else {
            this.handleScrollEvents = true;
        }
    }

    handleScroll = event => {
        if(this.handleScrollEvents) {
            var lastLi = document.querySelector("ul > li:last-child");
            var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
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

    orderByBookName = event => {
        const newState = {...this.state};
        newState.list = [...this.state.list];
        newState.startIndex = 0;
        newState.availableList = this.state.list.sort((a, b) => a.name > b.name ? 1 : -1);
        if(newState.genreFilter !== null) {
            newState.availableList = newState.availableList.filter((item, index) => item.genre === newState.genreFilter);
        }
        if(newState.genderFilter !== null) {
            newState.availableList = newState.availableList.filter((item, index) => item.author.gender === newState.genderFilter);
        }
        newState.visibleList = newState.availableList.filter((item, index) => {
            return (index > newState.startIndex 
                && index < (newState.startIndex + newState.pageSize));
        })

        this.setState(newState);
    }

    orderByAuthorName = event => {
        const newState = {...this.state};
        newState.list = [...this.state.list];
        newState.startIndex = 0;
        newState.availableList = this.state.list.sort((a, b) => a.author.name > b.author.name ? 1 : -1);
        if(newState.genreFilter !== null) {
            newState.availableList = newState.availableList.filter((item, index) => item.genre === newState.genreFilter);
        }
        if(newState.genderFilter !== null) {
            newState.availableList = newState.availableList.filter((item, index) => item.author.gender === newState.genderFilter);
        }
        newState.visibleList = newState.availableList.filter((item, index) => {
            return (index > newState.startIndex 
                && index < (newState.startIndex + newState.pageSize));
        })

        this.setState(newState);
    }

    genreChange = event => {
        const newState = {...this.state};
        newState.list = [...this.state.list];
        newState.startIndex = 0;
        if(event.target.value === "all") {
            newState.genreFilter = null;
        } else {
            newState.genreFilter = event.target.value;
        }        
        newState.availableList = this.state.list.sort((a, b) => a.author.name > b.author.name ? 1 : -1);
        if(newState.genreFilter !== null) {
            newState.availableList = newState.availableList.filter((item, index) => item.genre === newState.genreFilter);
        }
        if(newState.genderFilter !== null) {
            newState.availableList = newState.availableList.filter((item, index) => item.author.gender === newState.genderFilter);
        }
        newState.visibleList = newState.availableList.filter((item, index) => {
            return (index > newState.startIndex 
                && index < (newState.startIndex + newState.pageSize));
        });

        this.setState(newState);
    }

    genderChange = event => {
        const newState = {...this.state};
        newState.list = [...this.state.list];
        newState.startIndex = 0;
        if(event.target.value === "all") {
            newState.genderFilter = null;
        } else {
            newState.genderFilter = event.target.value;
        }        
        newState.availableList = this.state.list.sort((a, b) => a.author.name > b.author.name ? 1 : -1);
        if(newState.genreFilter !== null) {
            newState.availableList = newState.availableList.filter((item, index) => item.genre === newState.genreFilter);
        }
        if(newState.genderFilter !== null) {
            newState.availableList = newState.availableList.filter((item, index) => item.author.gender === newState.genderFilter);
        }
        newState.visibleList = newState.availableList.filter((item, index) => {
            return (index > newState.startIndex 
                && index < (newState.startIndex + newState.pageSize));
        });

        this.setState(newState);
    }
}

export default List;