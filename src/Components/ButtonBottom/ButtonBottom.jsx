import { Button } from "antd";
import { useDispatch } from "react-redux";
import { handleShowMore } from "../../store/ticketSlice";
import styles from "./ButtonBottom.module.css";

const ButtonBottom = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Button
        className={styles["button-bottom"]}
        onClick={() => {
          dispatch(handleShowMore());
        }}
        size="large"
        type="primary"
      >
        Показать еще 5 билетов!
      </Button>
    </>
  );
};



export default ButtonBottom;
