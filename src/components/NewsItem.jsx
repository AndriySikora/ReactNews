import React from 'react';

export default class NewsItem extends React.Component {
  render() {
    const {id, title, date, body, buttonClass, onClick, buttonTitle} = this.props;
    
    return (
      <li key={ id }>
        <div>
          { title }  <i>{ date }</i>
        </div>
        <div>
          { body }
        </div>
        <button className={buttonClass} onClick={onClick}>
          {buttonTitle}
        </button>
      </li>
    );
  }
}
