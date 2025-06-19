
import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function App() {
  const [facadeSize, setFacadeSize] = useState(10000);
  const [fixingsPerFt, setFixingsPerFt] = useState(8);
  const [fastenerType, setFastenerType] = useState("uni");
  const [email, setEmail] = useState("");

  const unitCosts = {
    uni: 0.28,
    rivetA2: 0.26,
    rivetALU: 0.23
  };

  const totalFixings = facadeSize * fixingsPerFt;
  const selectedCost = unitCosts[fastenerType];
  const totalCost = (totalFixings * selectedCost).toFixed(2);
  const costPerFt2 = (fixingsPerFt * selectedCost).toFixed(2);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("EQUITONE Fastener Cost Estimate", 14, 20);
    doc.autoTable({
      startY: 30,
      head: [["Item", "Value"]],
      body: [
        ["Façade Size (ft²)", facadeSize],
        ["Fixings per ft²", fixingsPerFt],
        ["Total Fixings", totalFixings.toLocaleString()],
        ["Fastener Type", fastenerType],
        ["Unit Cost", `$${selectedCost}`],
        ["Total Cost", `$${totalCost}`],
        ["Cost per ft²", `$${costPerFt2}`]
      ]
    });
    doc.save("equitone-fastener-estimate.pdf");
  };

  const sendEmailReport = () => {
    alert(`Report sent to ${email}`);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h1>UNI-Metal Screw Cost Calculator</h1>
      <div style={{ marginBottom: "1rem" }}>
        <label>Façade Size (ft²)</label>
        <input
          type="number"
          value={facadeSize}
          onChange={(e) => setFacadeSize(Number(e.target.value))}
          style={{ display: "block", width: "100%", marginTop: "0.5rem" }}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Fixings per ft²</label>
        <input
          type="number"
          value={fixingsPerFt}
          onChange={(e) => setFixingsPerFt(Number(e.target.value))}
          style={{ display: "block", width: "100%", marginTop: "0.5rem" }}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Select Fastener Type</label>
        <select
          value={fastenerType}
          onChange={(e) => setFastenerType(e.target.value)}
          style={{ display: "block", width: "100%", marginTop: "0.5rem" }}
        >
          <option value="uni">UNI-SCREW Bi2 Metal ($0.28)</option>
          <option value="rivetA2">UNI-RIVET A2 ($0.26)</option>
          <option value="rivetALU">UNI-RIVET ALU ($0.23)</option>
        </select>
      </div>
      <div style={{ borderTop: "1px solid #ccc", paddingTop: "1rem", marginTop: "1rem" }}>
        <p><strong>Total Fixings Needed:</strong> {totalFixings.toLocaleString()} pcs</p>
        <p><strong>Total Cost:</strong> ${totalCost}</p>
        <p><strong>Cost per ft²:</strong> ${costPerFt2}</p>
      </div>
      <div style={{ marginTop: "1.5rem" }}>
        <button onClick={generatePDF}>Download PDF</button>
      </div>
      <div style={{ marginTop: "1.5rem" }}>
        <label>Send Estimate to Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", width: "100%", marginTop: "0.5rem" }}
        />
        <button onClick={sendEmailReport} style={{ marginTop: "0.5rem" }}>Send Email</button>
      </div>
    </div>
  );
}
