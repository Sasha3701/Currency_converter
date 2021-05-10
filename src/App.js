import React from "react";
import styles from "./App.module.css";
import Input from "./components/Input/Input";

let App = () => {
  const [firstValue, setFirstValue] = React.useState(0);
  const [firstCurrency, setFirstCurrency] = React.useState();
  const [secondValue, setSecondValue] = React.useState(0);
  const [secondCurrency, setSecondCurrency] = React.useState("RUB");
  const [currency, setCurrency] = React.useState([]);
  const [data, setData] = React.useState({});
  const [accuracy, setAccuracy] = React.useState(1);

  React.useEffect(() => {
    fetch(
      "http://api.exchangeratesapi.io/v1/latest?access_key=c3f8338eae810ab129b9f8bb887315bc"
    )
      .then((response) => response.json())
      .then((data) => {
        const currency = Object.keys(data.rates);
        setFirstCurrency(data.base);
        setCurrency(currency);
        setData(data);
      });
  }, []);

  let handleValueChange = (event) => {
    const accuracyValue = Math.pow(10, accuracy);
    const secondCurrencyType = secondCurrency;
    const coef = data.rates[secondCurrencyType];
    const forwardValue =
      Math.round(event.target.value * coef * accuracyValue) / accuracyValue;
    const reversValue =
      Math.round((event.target.value / coef) * accuracyValue) / accuracyValue;
    if (event.target.name === "first") {
      setFirstValue(event.target.value);
      setSecondValue(forwardValue);
    } else {
      setSecondValue(event.target.value);
      setFirstValue(reversValue);
    }
  };

  let handleSelectChange = (event) => {
    let coef1, coef2;
    const accuracyValue = Math.pow(10, accuracy);
    if(event.target.name === 'first') {
      coef1 = event.target.value === 'EUR' ? 1 : data.rates[event.target.value]
      coef2 = data.rates[secondCurrency]
      const value =
      Math.round(firstValue * (coef2 / coef1) * accuracyValue) / accuracyValue;
      setFirstCurrency(event.target.value);
      setSecondValue(value);
    } else {
      coef1 = data.rates[firstCurrency] || 1
      coef2 = data.rates[event.target.value] || 1
      const value =
      Math.round(firstValue / (coef1 / coef2) * accuracyValue) / accuracyValue;
      setSecondCurrency(event.target.value);
      setSecondValue(value);
    }
  };

  return (
    <div className={styles.App}>
      <h1 className={styles.Title}>Convert</h1>
      <p>
        A number of simbols after comma:{" "}
        <select
          value={accuracy}
          onChange={(event) => setAccuracy(event.target.value)}
        >
          {[1, 2, 3, 4, 5].map((item, index) => (
            <option key={item + index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </p>
      <Input
        name="first"
        value={firstValue}
        onChange={handleValueChange}
        currency={currency}
        selectValue={firstCurrency}
        onSelectChange={handleSelectChange}
      />
      <div>=</div>
      <Input
        name="second"
        value={secondValue}
        onChange={handleValueChange}
        currency={currency}
        selectValue={secondCurrency}
        onSelectChange={handleSelectChange}
      />
      <p>
        Information on: <span className={styles.Data}>{data.date}</span>
      </p>
    </div>
  );
};

export default App;
