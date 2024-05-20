import { useEffect, useState } from "react";
import "./App.css";
import { tenureData } from "./utils/constants";
function App() {
  const [tenure, setTenure] = useState(36);
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [emi, setEmi] = useState(0);

  const calculateEmi = (downpayment) => {
    // EMI amount = [P x R x (1+R)^N]/[(1+R)^N-1]

    if (!cost) return;

    const principal = cost - downpayment;
    const rateOfInterest = interest / 100;
    const numberOfYears = tenure / 12;

    const EMI =
      (principal * rateOfInterest * (1 + rateOfInterest) ** numberOfYears) /
      (1 + rateOfInterest) ** (numberOfYears - 1);
    return (EMI / 12).toFixed(0);
  };
  const calculateDP = (emi) => {
    if (!cost) return;

    const downPaymentPercent = 100 - (emi / calculateEmi(0)) * 100;
    console.log(Number((downPaymentPercent / 100) * cost).toFixed(0));
    return Number((downPaymentPercent / 100) * cost).toFixed(0);
  };

  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setEmi(0);
    }

    const emi = calculateEmi(downPayment);
    setEmi(emi);
  }, [tenure, cost]);

  const totalDownPayment = () => {
    // dp+ fee%*(cost-dp)
    return (Number(downPayment) + (cost - downPayment) * (fee / 100)).toFixed(0);
  };
  const totalEmi = () => {
    return (emi * tenure).toFixed(0);
  };

  const updateEMI = (e) => {
    if (!cost) return;

    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));

    const emi = calculateEmi(dp);
    setEmi(emi);
  };
  const updateDP = (e) => {
    if (!cost) return;

    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));

    const dp = calculateDP(emi);
    setDownPayment(dp);
  };

  return (
    <div className="App">
      <span
        className="title"
        style={{ fontSize: 30, marginTop: 5, textAlign: "center" }}
      >
        EMI Calculator
      </span>
      {/* input part */}
      <span className="title">{"Total Cost of Assets"}</span>
      <input
        className="inp"
        type="number"
        placeholder="0"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
      />
      <span className="title">{"Interest Rate(in %)"}</span>
      <input
        className="inp"
        type="number"
        placeholder="0"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
      />
      <span className="title">{"Porcessing Fee(in %)"}</span>
      <input
      type="number"
        className="inp"
        placeholder="0"
        value={fee}
        onChange={(e) => setFee(e.target.value)}
      />
      {/* slider part */}
      <span className="title">{"Down Payment"}</span>
      <span className="title" style={{ textDecoration: "underline" }}>
        {`Total Down Payment -  ${totalDownPayment()}`}
      </span>
      <div>
        <input
          className="slider"
          type="range"
          value={downPayment}
          onChange={updateEMI}
          min={0}
          max={cost}
        />
        <div className="lables">
          <label>0%</label>
          <b>{downPayment}</b>
          <label>100%</label>
        </div>
      </div>
      {/* 
      emi part */}
      <span className="title">{"Loan Per Month"}</span>{" "}
      <span className="title" style={{ textDecoration: "underline" }}>
        {`Total Loan Amount - ${totalEmi()}`}
      </span>
      <div>
        <input
          className="slider"
          type="range"
          value={emi}
          min={calculateEmi(cost)}
          max={calculateEmi(0)}
          onChange={updateDP}
        />
        <div className="lables">
          <label>{calculateEmi(cost)}</label>
          <b>{emi}</b>
          <label>{calculateEmi(0)}</label>
        </div>
      </div>
      {/* 
      tenure part */}
      <span className="title">Tenure</span>
      <div className="tenureContainer">
        {tenureData.map((t) => {
          return (
            <button
              key={t}
              className={`tenure ${t == tenure ? "selected" : ""}`}
              onClick={() => setTenure(t)}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
