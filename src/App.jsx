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
    <div style={{ 
      maxWidth: "600px", 
      margin: "0 auto", 
      padding: "2rem",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f9f9f9",
      minHeight: "100vh"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ 
          color: "#333", 
          textAlign: "center", 
          marginBottom: "2rem",
          fontSize: "1.8rem"
        }}>
          UNI-Metal Screw Cost Calculator
        </h1>
        
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "0.5rem", 
            fontWeight: "bold",
            color: "#555"
          }}>
            Façade Size (ft²)
          </label>
          <input
            type="number"
            value={facadeSize}
            onChange={(e) => setFacadeSize(Number(e.target.value))}
            style={{ 
              display: "block", 
              width: "100%", 
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
              boxSizing: "border-box"
            }}
          />
        </div>
        
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "0.5rem", 
            fontWeight: "bold",
            color: "#555"
          }}>
            Fixings per ft²
          </label>
          <input
            type="number"
            value={fixingsPerFt}
            onChange={(e) => setFixingsPerFt(Number(e.target.value))}
            style={{ 
              display: "block", 
              width: "100%", 
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
              boxSizing: "border-box"
            }}
          />
        </div>
        
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "0.5rem", 
            fontWeight: "bold",
            color: "#555"
          }}>
            Select Fastener Type
          </label>
          <select
            value={fastenerType}
            onChange={(e) => setFastenerType(e.target.value)}
            style={{ 
              display: "block", 
              width: "100%", 
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
              boxSizing: "border-box"
            }}
          >
            <option value="uni">UNI-SCREW Bi2 Metal ($0.28)</option>
            <option value="rivetA2">UNI-RIVET A2 ($0.26)</option>
            <option value="rivetALU">UNI-RIVET ALU ($0.23)</option>
          </select>
        </div>
        
        <div style={{ 
          borderTop: "2px solid #eee", 
          paddingTop: "1.5rem", 
          marginTop: "2rem",
          backgroundColor: "#f8f9fa",
          padding: "1.5rem",
          borderRadius: "6px"
        }}>
          <p style={{ margin: "0.5rem 0", fontSize: "1.1rem" }}>
            <strong>Total Fixings Needed:</strong> {totalFixings.toLocaleString()} pcs
          </p>
          <p style={{ margin: "0.5rem 0", fontSize: "1.2rem", color: "#007bff" }}>
            <strong>Total Cost: ${totalCost}</strong>
          </p>
          <p style={{ margin: "0.5rem 0", fontSize: "1.1rem" }}>
            <strong>Cost per ft²:</strong> ${costPerFt2}
          </p>
        </div>
        
        <div style={{ marginTop: "2rem" }}>
          <button 
            onClick={generatePDF}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "4px",
              fontSize: "1rem",
              cursor: "pointer",
              width: "100%",
              marginBottom: "1rem"
            }}
          >
            Download PDF Report
          </button>
        </div>
        
        <div style={{ marginTop: "1.5rem" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "0.5rem", 
            fontWeight: "bold",
            color: "#555"
          }}>
            Send Estimate to Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            style={{ 
              display: "block", 
              width: "100%", 
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
              boxSizing: "border-box",
              marginBottom: "0.5rem"
            }}
          />
          <button 
            onClick={sendEmailReport}
            style={{
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "4px",
              fontSize: "1rem",
              cursor: "pointer",
              width: "100%"
            }}
          >
            Send Email Report
          </button>
        </div>
      </div>
    </div>
  );
}