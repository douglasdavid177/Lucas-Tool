import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import InputSection from "./inputsectionfrac";
import ResultsSection from "./resultssectionfrac";
import styles from "../../styles/Home.module.css";

const DecToFracSection = (props) => {
  const [decVal, setDecVal] = useState("");
  const [denVal, setDenVal] = useState("");
  const [decimalPlaces, setDecimalPlaces] = useState(2);
  const [resultsVal, setResultsVal] = useState(-1);
  const [resultsSndVal, setResultsSndVal] = useState(-1);
  const [triggerWarning, setTriggerWarning] = useState(false);

  useEffect(
    () => () => {
      props.setAttemptCalculate(false);
      props.setShowResults(false);
    },
    []
  );

  useEffect(() => {
    if (props.attemptCalculate) {
      calculate(decVal, denVal);
    }
  }, [props.attemptCalculate]);

  const calculate = (dec, den) => {
    if (!props.attemptCalculate) return;
    dec = Math.abs(dec);
    den = Math.abs(den);
    if (den == 0 || isNaN(dec) || isNaN(den)) {
      props.setAttemptCalculate(false);
      if (triggerWarning) {
      }
      setTriggerWarning(true);
      props.setShowResults(false);
      return;
    }
    const fractionsArray = new Array(den + 1);
    let n = 0;
    for (n = 0; n <= den; n++) {
      fractionsArray[n] = n / den;
    }
    console.log("fractions: ");
    console.log(fractionsArray);
    const leftOverDec = dec - Math.floor(dec);
    const fractionsArrayCopy = [...fractionsArray];
    const fractionsArrayCopy2 = [...fractionsArray];

    const closest = fractionsArrayCopy.reduce(function (prev, curr) {
      return Math.abs(curr - leftOverDec) < Math.abs(prev - leftOverDec)
        ? curr
        : prev;
    });

    const closestIndex = fractionsArray.indexOf(closest);
    fractionsArrayCopy2.splice(closestIndex, 1);
    const secondClosest = fractionsArrayCopy2.reduce(function (prev, curr) {
      return Math.abs(curr - leftOverDec) < Math.abs(prev - leftOverDec)
        ? curr
        : prev;
    });
    const secondClosestIndex = fractionsArray.indexOf(secondClosest);
    setResultsVal(closestIndex);
    setResultsSndVal(secondClosestIndex);
    props.setShowResults(true);
  };
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={props.showResults ? "results" : "input"}
        initial={{ translateY: 20, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        exit={{ translateY: -20, opacity: 0 }}
        transition={{ duration: 0.35 }}
      >
        {props.showResults ? (
          <ResultsSection
            dec={decVal}
            den={denVal}
            resultsVal={resultsVal}
            resultsSndVal={resultsSndVal}
            decimalPlaces={decimalPlaces}
          />
        ) : (
          <InputSection
            dec={decVal}
            den={denVal}
            setDecFunc={setDecVal}
            setDenFunc={setDenVal}
            triggerW={triggerWarning}
            setTriggerFunc={setTriggerWarning}
            setDecPlacesFunc={setDecimalPlaces}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};
export default DecToFracSection;
