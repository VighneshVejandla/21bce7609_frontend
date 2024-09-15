import React from "react";
import "./TrademarkCard.css";

const TrademarkCard = ({
  mark,
  company,
  owners,
  number,
  date,
  status,
  statusDate,
  renewalDate,
  className,
  classIcon,
  classCode,
  historyDate,
  viewType,
}) => {
  return (
    <div className={`trademark-card `}>
      <div className="trademark-mark">
        <img src={`https://via.placeholder.com/100?text=${mark}`} alt={mark} />
      </div>
      <div className="trademark-details">
        <div className="trademark-details-mark-owner">
          <h3>{mark}</h3>
          <p className="trademark-owner">{owners}</p>
        </div>
        <div className="trademark-details-mark-number">
          <p className="trademark-number" style={{ fontSize: "1em", fontWeight: "bold", color: "black" }}>{number}</p>
          <p className="trademark-date">{date}</p>
        </div>
      </div>
      <div className="trademark-status">
        <div className="trademark-status-label-date">
          <span
            className={`status-label ${status
              ?.toLowerCase()
              .replace(/\s+/g, "-")}`} style={{ fontSize: "1em", fontWeight: "bold" }}
          >
            {status}
          </span>
          <p className="status-date">on {statusDate}</p>
          {historyDate && <p className="history-date">{historyDate}</p>}
        </div>
        <p className="trademark-renewal">{renewalDate}</p>
      </div>
      <div className="trademark-class">
        <p className="trademark-description">{className}</p>
        <p className="trademark-class-info">
          <span className="class-icon">{classIcon}</span> Class {classCode}
        </p>
      </div>
      <div className="trademark-expand">
        <span className="expand-icon">›</span>
      </div>
    </div>
  );
};

export default TrademarkCard;
