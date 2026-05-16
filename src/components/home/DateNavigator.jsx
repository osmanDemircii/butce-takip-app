import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { MONTHS_TR } from "../../utils/formatDate";
import "../../styles/dateNavigator.css";

const DateNavigator = ({ year, month, onPrev, onNext }) => {
  return (
    <div className="date-nav">
      <button className="date-nav__btn" onClick={onPrev}>
        <HiChevronLeft />
      </button>
      <div className="date-nav__label">
        <span className="date-nav__month">{MONTHS_TR[month]}</span>
        <span className="date-nav__year">{year}</span>
      </div>
      <button className="date-nav__btn" onClick={onNext}>
        <HiChevronRight />
      </button>
    </div>
  );
};

export default DateNavigator;