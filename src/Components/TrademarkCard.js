import React from 'react';
import './TrademarkCard.css';

const TrademarkCard = ({ 
  mark, 
  owners,
  number, 
  date, 
  status, 
  statusDate, 
  className, 
  classIcon, 
  historyDate, 
  viewType 
}) => {
  return (

    <div className={`trademark-card ${viewType}-view`}>
  <div className="trademark-mark">
    <img src={`https://via.placeholder.com/100?text=${mark}`} alt={mark} />
  </div>
  <div className="trademark-details">
    <h3>{mark}</h3>
    <p className="trademark-owner">{owners}</p>
    <p className="trademark-number">{number}</p>
    <p className="trademark-date">{date}</p>
  </div>
  <div className="trademark-status">
    <span className={`status-label ${status?.toLowerCase().replace(/\s+/g, '-')}`}>
      {status}
    </span>
    <p className="status-date">on {statusDate}</p>
    {historyDate && (
      <p className="history-date">{historyDate}</p>
    )}
  </div>
  <div className="trademark-class">
    <p className="trademark-description">{className}</p>
    <p className="trademark-class-info">
      <span className="class-icon">{classIcon}</span> Class {className}
    </p>
  </div>
  <div className="trademark-expand">
    <span className="expand-icon">›</span>
  </div>
</div>
  );
};

export default TrademarkCard;
