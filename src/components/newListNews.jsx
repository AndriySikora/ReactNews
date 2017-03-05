import React from 'react';

import NewsData from '../firebase-connection';
import NewsItem from './NewsItem.jsx';

export default class NewListNews extends React.Component {
  _archiveItem(key) {
    let firebaseRef = NewsData;
    firebaseRef.child(key).update({archive: true});
  }
  
  render() {
    const newsItems = this.props.newItems.map((item) => {
      return <NewsItem
        key={item['.key']}
        id={item['.key']}
        title={item.title}
        date={item.date}
        body={item.body}
        buttonClass="btn btn-warning"
        buttonTitle="Archive"
        onClick={this._archiveItem.bind(null, item['.key'])}
      />
      }
    );
    
    return (
      <div className="wrapper-list">
        <div className="title">New news</div>
        <ul>{ newsItems }</ul>
      </div>
    );
  }
}
