import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styles from "./FilterMenu.module.css";
import { handleChecked } from "../../store/ticketSlice";

const FilterMenu = () => {
  const checkList = useSelector((state) => state.checkList);
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Количество пересадок</h2>
      <div className={styles["block-content"]}>
        <Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
          {checkList.map((item) => (
            <FormControlLabel
              key={item.id}
              label={item.text}
              control={
                <Checkbox
                  checked={item.checked}
                  onChange={() => dispatch(handleChecked(item.id))}
                />
              }
            />
          ))}
        </Box>
      </div>
    </div>
  );
};

export default FilterMenu;
