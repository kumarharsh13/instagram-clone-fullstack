import styles from '../Loader/Loader.module.css'

function Loader() {
  return (
    <div className={styles.loaderConatiner}>
      <div className={styles.loader}></div>
    </div>
  );
}

export default Loader