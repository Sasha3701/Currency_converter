import styles from "./Input.module.css";

let Input = (props) => {
  return (
    <div className={styles.Form}>
      <input name={props.name} type="number" value={props.value} onChange={props.onChange}/>
      <select name={props.name} value={props.selectValue} onChange={props.onSelectChange}>
        {props.currency.map((item, index) => (
          <option key={item + index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Input;