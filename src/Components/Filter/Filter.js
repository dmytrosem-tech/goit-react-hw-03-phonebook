import styles from "./Filter.module.css";

export default function Filter({ filter, onChange }) {
  const { box, input } = styles;
  return (
    <div className={box}>
      {" "}
      Find contacts by name:
      <input
        className={input}
        type="text"
        name="filter"
        value={filter}
        onChange={onChange}
      />
    </div>
  );
}
