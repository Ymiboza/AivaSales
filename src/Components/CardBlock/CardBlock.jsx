import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets } from "../../store/ticketSlice";
import ButtonBottom from "../ButtonBottom/ButtonBottom";
import ButtonMenu from "../ButtonMenu/ButtonMenu";
import Card from "../Card/Card";
import styles from "./CardBlock.module.css";

const CardBlock = () => {
  const dispatch = useDispatch();

  const tickets = useSelector((state) => state.ticket);
  const showMoreCards = useSelector((state) => state.count);
  const status = useSelector((state) => state.status);
  const checkList = useSelector((state) => state.checkList);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const filterTickets = () => {
    const checkedBoxes = checkList.filter((item) => item.checked);
    if (!checkedBoxes) return [];
    if (checkedBoxes.find((item) => item.text === "Все")) return tickets;
    if (tickets) {
      return tickets.filter((ticket) =>
        ticket.segments.some((seg) =>
          checkSearch(
            seg.stops.length,
            checkedBoxes.map((box) => box.stops)
          )
        )
      );
    }
    return [];
  };

  function checkSearch(stops, filters) {
    return filters.find((filter) => filter === stops) !== undefined;
  }

  const newTicket = filterTickets().slice(0, showMoreCards);
  
  return (
    <div className={styles.container}>
      <ButtonMenu />
      {status === "pending" ? (
        <div className={styles.loader}>
          <CircularProgress variant="indeterminate" />
        </div>
      ) : (
        newTicket.map((formattedTicket, index) => (
          <Card key={index} {...formattedTicket} />
        ))
      )}
      {showMoreCards < tickets.length && <ButtonBottom />}
    </div>
  );
};

export default CardBlock;
