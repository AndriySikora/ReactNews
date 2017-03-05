import React from 'react';
import NewsData from '../firebase-connection';

import NewListNews from './newListNews.jsx';
import ArchiveListNews from './archiveListNews.jsx';

export default class News extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			newItems: [],
			archiveItems: [],
			title: '',
			body: ''
		};

		this.onChangeTitle = this.onChangeTitle.bind(this);
		this.onChangeBody = this.onChangeBody.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		this.firebaseRef = NewsData;
		this.firebaseRef.on('value', (newsList) => {
			let newItems = [],
				archiveItems = [];

			newsList.forEach((newsItem) => {
				const item = newsItem.val();
				item['.key'] = newsItem.key;

				if (!item.archive) {
					newItems.push(item);
				} else {
					archiveItems.push(item);
				}

				this.setState({
					newItems: this.orderByDate(newItems),
					archiveItems: this.orderByDate(archiveItems)
				});
			});
		});
	}

	componentWillUnmount() {
		this.firebaseRef.off();
	}

	orderByDate(list) {
		return list.sort((a, b) => {
			return new Date(a.date).getTime() - new Date(b.date).getTime()
		});
	}

	onChangeTitle(e) {
		this.setState({title: e.target.value});
	}

	onChangeBody(e) {
		this.setState({body: e.target.value});
	}

	_isFormDataValid() {
		return this.state.title
			&& this.state.title.trim().length !== 0
			&& this.state.body
			&& this.state.body.trim().length !== 0
		;
	}

	handleSubmit(e) {
		e.preventDefault();
		if (this._isFormDataValid()) {
			this.firebaseRef.push({
				title: this.state.title,
				body: this.state.body,
				date: (new Date()).toISOString()
			});

			this.setState({
				title: '',
				body: ''
			});
		}
	}

	render() {
		return (
			<div className="container">
        <h3>Create new news</h3>
        <form className="news-form" onSubmit={ this.handleSubmit }>
          <div className="form-group">
            <label htmlFor="title"></label>
            <input id="title" type="text" className="form-control" placeholder="Type title" onChange={ this.onChangeTitle } value={ this.state.title } />
          </div>
          <div className="form-group">
            <label htmlFor="boddy"></label>
            <input id="boddy" type="text" className="form-control" placeholder="Type body" onChange={ this.onChangeBody } value={ this.state.body } />
          </div>
          <button className="btn btn-success">{ 'Add news ' + (this.state.newItems.length + 1) }</button>
        </form>
        <NewListNews newItems={ this.state.newItems } />
        <ArchiveListNews archiveItems={ this.orderByDate(this.state.archiveItems) } />
      </div>
    );
  }
}
