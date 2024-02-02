import CardBlock from "../CardBlock/CardBlock";
import FilterMenu from "../FilterMenu/FilterMenu";
import styles from "./Content.module.css";

const Content = () => {
  return (
    <div className={styles["flex-content"]}>
      <FilterMenu />
      <CardBlock />
    </div>
  );
};

export default Content;
