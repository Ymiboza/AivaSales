import { Button, ButtonGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleChange } from "../../store/ticketSlice";
import styles from "./ButtonMenu.module.css";

const ButtonMenu = () => {
  const buttonSelector = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  return (
    <div className={styles["button-group-container"]}>
      <ButtonGroup
        className={styles["button-group"]}
        color="primary"
        size="large"
        aria-label="large button group"
      >
        {buttonSelector.map((btn) => (
          <Button
            className={styles.button}
            key={btn.id}
            onClick={() => {
              dispatch(handleChange(btn.id));
            }}
            variant={btn.active}
          >
            {btn.text}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default ButtonMenu;
