import { useState } from "react";
import Button from "./Button";

const Calculator = () => {
  const [currentNumber, setCurrentNumber] = useState("");
  const [currentOperator, setCurrentOperator] = useState("");
  const [clicked, setClicked] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [answer, setAnswer] = useState("");
  const [count, setCount] = useState(0);
  const [prevOp, setPrevOp] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [prevNumb, setPrevNumb] = useState("");

  const specialOp = (operator) => {
    switch (operator) {
      case "AC":
        reset();
        break;
      case "+/-":
        negative();
        break;
      case "%":
        modulus();
        break;
      default:
        return "";
    }
  };
  const modulus = () => setCurrentNumber((prev) => prev / 100);
  const negative = () => setCurrentNumber((prev) => -prev);
  const getOperator = (operator, number) => {
    setCount(0);
    switch (operator) {
      case "/":
        setCurrentOperator("/");
        break;
      case "x":
        setCurrentOperator("*");
        break;
      case "-":
        setCurrentOperator("-");
        break;
      case "+":
        setCurrentOperator("+");
        break;
      case "=":
        setCurrentOperator("=");
        result();
        break;
      default:
        return "";
    }
    setClicked(number);
    if (clicked !== undefined && secondNumber === "") {
      setSecondNumber(currentNumber);
      setCurrentNumber("");
    } else if (currentNumber !== "" && secondNumber !== "" && count === 0) {
      setSecondNumber(
        eval(`(${secondNumber} ${currentOperator} ${currentNumber})`)
      );

      setPrevNumb(currentNumber);
      setCurrentNumber("");
    }
  };
  const result = () => {
    setCount((prev) => prev + 1);
    if (count === 0) {
      setPrevOp(currentOperator);
      setAnswer(eval(`(${secondNumber} ${currentOperator} ${currentNumber})`));
    } else {
      setAnswer(eval(`(${answer} ${prevOp} ${prevNumb})`));
    }
  };
  const getNumber = (number) => {
    setCurrentNumber((currentNumber) => currentNumber + number);
    if (clicked !== undefined) {
      setClicked("");
    }
    if (number === ".") {
      setIsDisabled(true);
    }
  };

  const reset = () => {
    setAnswer("");
    setCurrentNumber("");
    setCurrentOperator("");
    setSecondNumber("");
    setCount(0);
    setIsDisabled(false);
    setPrevOp("");
    setPrevNumb("");
    setClicked("");
  };
  return (
    <div className="w-1/4 h-auto rounded-sm grid grid-rows-6 grid-cols-4">
      <div className=" col-start-1 col-end-5 bg-gray-500 py-3 px-5 items-center flex justify-end text-white font-medium text-lg">
        {count !== 0 ? answer : currentNumber}
      </div>
      <div className="grid grid-cols-4 col-start-1 col-end-5 row-start-2 row-end-7 items-center">
        <div className="grid col-start-1 col-end-4 bg-gray-300">
          <div className="grid grid-cols-3 grid-rows-1 row-start-1 row-end-1">
            {["AC", "+/-", "%"].map((el, index) => {
              return (
                <Button
                  children={el}
                  key={index}
                  onClick={() => specialOp(el, index)}
                />
              );
            })}
          </div>
          <div className="grid grid-cols-3 grid-rows-4">
            {["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."].map(
              (el, index) => {
                return (
                  <Button
                    children={el}
                    large={el === "0" ? true : false}
                    onClick={() => getNumber(el)}
                    key={index}
                    className="border-gray-500"
                    clicked={clicked}
                    isDisabled={isDisabled}
                  />
                );
              }
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 col-start-4 col-end-5 bg-orange-500">
          {["/", "x", "-", "+", "="].map((el, index) => {
            return (
              <Button
                children={el}
                key={index}
                onClick={() => getOperator(el, index)}
                clicked={clicked}
                index={index}
                className="text-2xl font-semibold"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
