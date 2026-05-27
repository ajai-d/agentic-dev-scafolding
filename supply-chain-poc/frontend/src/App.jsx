import React from "react";

function App() {
  return (
    <main className="app-shell">
      <header>
        <h1>Supply Chain POC</h1>
        <p>Independent domains: Order Management and Inventory Management</p>
      </header>

      <section className="card-grid">
        <article className="card">
          <h2>Order Management Domain</h2>
          <ul>
            <li>Order lifecycle: Draft, Confirmed, Shipped, Cancelled</li>
            <li>Order + line-item management</li>
            <li>Ship-time integration contract</li>
          </ul>
        </article>

        <article className="card">
          <h2>Inventory Management Domain</h2>
          <ul>
            <li>Product catalog and stock tracking</li>
            <li>Inbound/outbound adjustments</li>
            <li>Low-stock threshold alerts</li>
          </ul>
        </article>
      </section>
    </main>
  );
}

export default App;
