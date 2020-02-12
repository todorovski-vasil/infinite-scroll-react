import React, { Component } from 'react';

class List extends Component {
    constructor(props) {
        super(props);

        const numAuthors = 10000;
        const authors = [];
        for(let i=10000; i>0; i--) {
            authors.push({
                name: "Author " + ((Math.floor(Math.random() * numAuthors) * 1000)),
                gender: Math.floor(Math.random() * 2) ? "M" : "F"
            });
        }
        const genres = ["fiction", "drama", "poetry", "finance", "horror"];
        const list = [];
        for(let i=1000000; i>0; i--) {
            let publishedDate = new Date((Math.floor(Math.random() * 1020) + 1000) +
                "-" + ((Math.floor(Math.random() * 12) + 1)) + 
                "-" + ((Math.floor(Math.random() * 28) + 1))
                );
            const author = authors[Math.floor(Math.random() * authors.length)];
            const genre = genres[Math.floor(Math.random() * genres.length)];
            if(i % 5 === 4 && genre === "horror") {
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
        let genderAllClasses = "btn btn-secondary";
        let genderMClasses = "btn btn-secondary";
        let genderFClasses = "btn btn-secondary";
        if(!this.state.genderFilter) {
            genderAllClasses += " active";
        } else if(this.state.genderFilter === 'M') {
            genderMClasses += " active";
        } else if(this.state.genderFilter === 'F') {
            genderFClasses += " active";
        }
        return (
            <React.Fragment>
                <div>
                    <button onClick={this.orderByBookName} className="btn btn-primary mt-1 ml-1 mb-1">order by book name</button>
                    <button onClick={this.orderByAuthorName} className="btn btn-primary m-1">order by author name</button><br/>
                    <div className="btn-group btn-group-toggle ml-1 mr-1" data-toggle="buttons">
                        <label className={"btn btn-secondary " + (this.state.genreFilter ? "" : "active")}>
                            <input type="radio" name="genres" onClick={this.genreChange} value="all" defaultChecked/>all genres
                        </label>
                        {this.state.genres.map(genre => (
                            <label key={genre} className={"btn btn-secondary " + (this.state.genreFilter === genre ? "active" : "")}>
                                <input type="radio" name="genres" onClick={this.genreChange} value={genre}/>{genre}
                            </label>)
                        )}
                    </div><br/>
                    <div className="btn-group btn-group-toggle m-1" data-toggle="buttons">
                        <label className={genderAllClasses}>
                            <input type="radio" name="gender" onClick={this.genderChange} value="all"/>all genders
                        </label>
                        <label className={genderMClasses}>
                            <input type="radio" name="gender" onClick={this.genderChange} value="M" />male authors
                        </label>
                        <label className={genderFClasses}>
                            <input type="radio" name="gender" onClick={this.genderChange} value="F" />female authors
                        </label>
                    </div>
                </div>
                <div onScroll={this.handleScroll}>
                    <ul className="list-group">
                        {
                            this.state.visibleList
                                .map(item => {
                                    let classes = "list-group-item ";
                                    if(item.genre === "horror" && item.publishedDate.getMonth() === 9 && item.publishedDate.getDate() === 31) {
                                        classes += "halloween";
                                    } else if(item.genre === "finance" && item.publishedDate.getDay() === 5) {
                                        let nextFriday = new Date(item.publishedDate.getTime());
                                        nextFriday.setDate(nextFriday.getDate() + 7);
                                        if(nextFriday.getMonth() !== item.publishedDate.getMonth()) {
                                            classes += "business";
                                        }
                                    }
                                    return (
                                        <li key={item.isbn} className={classes}>
                                            {item.name + " by " + (item.author.gender === "M" ? "Mr. " : "Mrs. ") +  item.author.name
                                                + ", genre: " + item.genre
                                                + ", published on: " + item.publishedDate.toDateString()}
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
        newState.availableList = [...this.state.list];
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
        newState.availableList = [...this.state.list];
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