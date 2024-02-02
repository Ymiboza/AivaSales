import styles from "./Card.module.css";
import PropTypes from "prop-types";

const Card = ({ price, carrier, segments }) => {
  function formatDateTime(dateTimeString) {
    const time = new Date(dateTimeString);

    const hours = String(time.getUTCHours()).padStart(2, '0');
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}ч ${remainingMinutes}м`;
  }


  function formatStops(segmentsStop) {
    if (segmentsStop.stops.length === 1) {
      return `${segmentsStop.stops.length} пересадка`;
    }
    if (segmentsStop.stops.length > 1) {
      return `${segmentsStop.stops.length} пересадки`;
    }
    return 'без пересадок';
  }
  

  return (
    <div className={styles["card-container"]}>
      <div className={styles["card-title-box"]}>
        <div className={styles["card-title"]}>{price} ₽</div>
        <img
          className={styles["card-logo"]}
          src={`https://pics.avs.io/99/36/${carrier}.png`}
          alt=""
        />
      </div>
      <div className={styles["card-first-info"]}>
        <div className={styles["card-first-one"]}>
          <span className={styles["info-gray"]}>{segments[0].origin}-{segments[0].destination}</span>
          <span className={styles["info-black"]}>{formatDateTime(segments[0].date)}</span>
        </div>
        <div className={styles["card-first-two"]}>
          <span className={styles["info-gray"]}>В ПУТИ</span>
          <span className={styles["info-black"]}>{formatDuration(segments[0].duration)}</span>
        </div>
        <div className={styles["card-first-three"]}>
          <span className={styles["info-gray"]}>{formatStops(segments[0])}</span>
          <span className={styles["info-black"]}>{segments[0].stops.join(', ')}</span>
        </div>
      </div>
      <div className={styles["card-second-info"]}>
        <div className={styles["card-second-one"]}>
          <span className={styles["info-gray"]}>{segments[1].origin}-{segments[1].destination}</span>
          <span className={styles["info-black"]}>{formatDateTime(segments[1].date)}</span>
        </div>
        <div className={styles["card-second-two"]}>
          <span className={styles["info-gray"]}>В ПУТИ</span>
          <span className={styles["info-black"]}>{formatDuration(segments[1].duration)}</span>
        </div>
        <div className={styles["card-second-three"]}>
          <span className={styles["info-gray"]}>{formatStops(segments[1])}</span>
          <span className={styles["info-black"]}>{segments[1].stops.join(', ')}</span>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  price: PropTypes.number.isRequired,
  carrier: PropTypes.string.isRequired,
  segments: PropTypes.array.isRequired,
};

export default Card;