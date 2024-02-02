import Logo from "../../Pictures/Logo.svg";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={Logo} alt="" />
    </div>
  );
};

export default Header;
