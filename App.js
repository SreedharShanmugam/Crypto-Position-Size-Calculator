import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PositionSizeCalculator() {
  const [accountSize, setAccountSize] = useState(50000);
  const [riskPercentage, setRiskPercentage] = useState(1.2);
  const [stopLoss, setStopLoss] = useState(50);
  const [ethPrice, setEthPrice] = useState(3000);
  const [leverage, setLeverage] = useState(5);
  const [result, setResult] = useState(null);

  const calculatePositionSize = () => {
    const riskAmount = (accountSize * riskPercentage) / 100;
    const positionSize = riskAmount / stopLoss;
    const positionValue = positionSize * ethPrice;
    const requiredMargin = positionValue / leverage;

    setResult({ positionSize, requiredMargin });
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">ETHUSDT Position Size Calculator</h2>
      <Input
        type="number"
        placeholder="Account Size ($)"
        value={accountSize}
        onChange={(e) => setAccountSize(Number(e.target.value))}
      />
      <Input
        type="number"
        placeholder="Risk Percentage (%)"
        value={riskPercentage}
        onChange={(e) => setRiskPercentage(Number(e.target.value))}
      />
      <Input
        type="number"
        placeholder="Stop-Loss ($ per ETH)"
        value={stopLoss}
        onChange={(e) => setStopLoss(Number(e.target.value))}
      />
      <Input
        type="number"
        placeholder="ETH Price ($)"
        value={ethPrice}
        onChange={(e) => setEthPrice(Number(e.target.value))}
      />
      <Input
        type="number"
        placeholder="Leverage"
        value={leverage}
        onChange={(e) => setLeverage(Number(e.target.value))}
      />
      <Button onClick={calculatePositionSize} className="w-full bg-blue-500 text-white">
        Calculate
      </Button>
      {result && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p><strong>Position Size:</strong> {result.positionSize.toFixed(2)} ETH</p>
          <p><strong>Required Margin:</strong> ${result.requiredMargin.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
