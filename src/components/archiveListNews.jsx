import React from 'react';

import NewsData from '../firebase-connection';
import NewsItem from './NewsItem.jsx';

export default class ArchiveListNews extends React.Component {
  _removeItem(key) {
    let firebaseRef = NewsData;
    firebaseRef.child(key).remove();
  }
  
  render() {
    const archiveItems = this.props.archiveItems.map((item) => {
      return <NewsItem
        key={item['.key']}
        id={item['.key']}
        title={item.title}
        date={item.date}
        body={item.body}
        buttonClass="btn btn-danger"
        buttonTitle="Remove"
        onClick={this._removeItem.bind(this, item['.key'])}
      />
      }
    );
    
    return (
      <div className="wrapper-list">
        <div className="title archive">Archive news</div>
        <ul>{ archiveItems }</ul>
      </div>
    );
  }
}
