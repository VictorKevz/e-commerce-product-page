import React from "react";
import "./App.css"
import Product from "./components/Product/Product";
function App() {
 
  return (
    <main>
      <div className={`outer-container`}>
        <div className="inner-container">
          <Product/>
        </div>
      </div>
    </main>
  );
}

export default App;