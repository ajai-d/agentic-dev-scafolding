import React from "react";
import { useEffect, useMemo, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3002";

function parseError(err) {
  if (!err) {
    return "Unknown error";
  }

  if (typeof err === "string") {
    return err;
  }

  if (err.details && Array.isArray(err.details)) {
    return `${err.message} (${err.details.join(", ")})`;
  }

  return err.message || "Unexpected error";
}

function validationMessage(errors, key) {
  return errors[key] ? <p className="field-error">{errors[key]}</p> : null;
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw payload.error || { message: `Request failed (${response.status})` };
  }

  return payload.data;
}

function nextStatuses(current) {
  if (current === "draft") {
    return [
      { value: "confirmed", label: "Confirm Order" },
      { value: "cancelled", label: "Cancel Order" },
    ];
  }

  if (current === "confirmed") {
    return [
      { value: "shipped", label: "Ship Order" },
      { value: "cancelled", label: "Cancel Order" },
    ];
  }

  return [];
}

function newLine() {
  return {
    productId: "",
    quantity: "1",
    unitPrice: "0",
  };
}

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [inventoryNotice, setInventoryNotice] = useState(null);
  const [orderNotice, setOrderNotice] = useState(null);
  const [bootstrapError, setBootstrapError] = useState("");

  const [loadingState, setLoadingState] = useState({
    bootstrap: false,
    createProduct: false,
    adjustInventory: false,
    createOrder: false,
    openOrder: false,
    transitionOrderById: {},
  });

  const [productErrors, setProductErrors] = useState({});
  const [adjustmentErrors, setAdjustmentErrors] = useState({});
  const [orderErrors, setOrderErrors] = useState({});

  const [productForm, setProductForm] = useState({
    sku: "",
    name: "",
    stockOnHand: "0",
    lowStockThreshold: "0",
  });

  const [adjustmentForm, setAdjustmentForm] = useState({
    productId: "",
    type: "inbound",
    quantity: "1",
    reason: "",
  });

  const [orderForm, setOrderForm] = useState({
    orderNumber: "",
    customerName: "",
    orderDate: new Date().toISOString().slice(0, 10),
    lines: [newLine()],
  });

  const lowStockProducts = useMemo(
    () => products.filter((product) => product.stockOnHand <= product.lowStockThreshold),
    [products]
  );

  async function loadProducts() {
    const data = await apiRequest("/products");
    setProducts(data);
  }

  async function loadOrders() {
    const data = await apiRequest("/orders");
    setOrders(data);
  }

  function validateProductInput() {
    const nextErrors = {};

    if (!productForm.sku.trim()) {
      nextErrors.sku = "SKU is required.";
    }

    if (!productForm.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (productForm.stockOnHand === "" || Number.parseInt(productForm.stockOnHand, 10) < 0) {
      nextErrors.stockOnHand = "Stock must be a non-negative integer.";
    }

    if (
      productForm.lowStockThreshold === ""
      || Number.parseInt(productForm.lowStockThreshold, 10) < 0
    ) {
      nextErrors.lowStockThreshold = "Threshold must be a non-negative integer.";
    }

    setProductErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function validateAdjustmentInput() {
    const nextErrors = {};

    if (!adjustmentForm.productId) {
      nextErrors.productId = "Choose a product.";
    }

    if (adjustmentForm.quantity === "" || Number.parseInt(adjustmentForm.quantity, 10) <= 0) {
      nextErrors.quantity = "Quantity must be greater than 0.";
    }

    setAdjustmentErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function validateOrderInput() {
    const nextErrors = {};

    if (!orderForm.orderNumber.trim()) {
      nextErrors.orderNumber = "Order number is required.";
    }

    if (!orderForm.customerName.trim()) {
      nextErrors.customerName = "Customer name is required.";
    }

    if (!orderForm.orderDate) {
      nextErrors.orderDate = "Order date is required.";
    }

    orderForm.lines.forEach((line, index) => {
      if (!line.productId) {
        nextErrors[`line-${index}-productId`] = "Select a product.";
      }

      if (line.quantity === "" || Number.parseInt(line.quantity, 10) <= 0) {
        nextErrors[`line-${index}-quantity`] = "Quantity must be greater than 0.";
      }

      if (line.unitPrice === "" || Number.parseFloat(line.unitPrice) < 0) {
        nextErrors[`line-${index}-unitPrice`] = "Unit price must be 0 or more.";
      }
    });

    setOrderErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function runBootstrap() {
    setLoadingState((previous) => ({ ...previous, bootstrap: true }));
    setBootstrapError("");

    try {
      await Promise.all([loadProducts(), loadOrders()]);
    } catch (err) {
      setBootstrapError(parseError(err));
    } finally {
      setLoadingState((previous) => ({ ...previous, bootstrap: false }));
    }
  }

  useEffect(() => {
    runBootstrap();
  }, []);

  function onProductFieldChange(event) {
    const { name, value } = event.target;
    setProductForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function onAdjustmentFieldChange(event) {
    const { name, value } = event.target;
    setAdjustmentForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function onOrderFieldChange(event) {
    const { name, value } = event.target;
    setOrderForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function onOrderLineChange(index, field, value) {
    setOrderForm((previous) => {
      const nextLines = previous.lines.map((line, lineIndex) => {
        if (lineIndex !== index) {
          return line;
        }

        return {
          ...line,
          [field]: value,
        };
      });

      return {
        ...previous,
        lines: nextLines,
      };
    });
  }

  function addOrderLine() {
    setOrderForm((previous) => ({
      ...previous,
      lines: [...previous.lines, newLine()],
    }));
  }

  function removeOrderLine(index) {
    setOrderForm((previous) => {
      const nextLines = previous.lines.filter((_line, lineIndex) => lineIndex !== index);
      return {
        ...previous,
        lines: nextLines.length > 0 ? nextLines : [newLine()],
      };
    });
  }

  async function submitCreateProduct(event) {
    event.preventDefault();

    if (!validateProductInput()) {
      setInventoryNotice({ type: "error", message: "Please fix product form errors." });
      return;
    }

    setLoadingState((previous) => ({ ...previous, createProduct: true }));
    setInventoryNotice(null);

    try {
      await apiRequest("/products", {
        method: "POST",
        body: JSON.stringify({
          sku: productForm.sku,
          name: productForm.name,
          stockOnHand: Number.parseInt(productForm.stockOnHand, 10),
          lowStockThreshold: Number.parseInt(productForm.lowStockThreshold, 10),
        }),
      });
      await loadProducts();
      setProductForm({
        sku: "",
        name: "",
        stockOnHand: "0",
        lowStockThreshold: "0",
      });
      setProductErrors({});
      setInventoryNotice({ type: "ok", message: "Product created." });
    } catch (err) {
      setInventoryNotice({ type: "error", message: parseError(err) });
    } finally {
      setLoadingState((previous) => ({ ...previous, createProduct: false }));
    }
  }

  async function submitAdjustment(event) {
    event.preventDefault();

    if (!validateAdjustmentInput()) {
      setInventoryNotice({ type: "error", message: "Please fix inventory adjustment errors." });
      return;
    }

    setLoadingState((previous) => ({ ...previous, adjustInventory: true }));
    setInventoryNotice(null);

    try {
      await apiRequest("/inventory/adjustments", {
        method: "POST",
        body: JSON.stringify({
          productId: Number.parseInt(adjustmentForm.productId, 10),
          type: adjustmentForm.type,
          quantity: Number.parseInt(adjustmentForm.quantity, 10),
          reason: adjustmentForm.reason || undefined,
        }),
      });
      await loadProducts();
      setAdjustmentForm((previous) => ({
        ...previous,
        quantity: "1",
        reason: "",
      }));
      setAdjustmentErrors({});
      setInventoryNotice({ type: "ok", message: "Inventory adjusted." });
    } catch (err) {
      setInventoryNotice({ type: "error", message: parseError(err) });
    } finally {
      setLoadingState((previous) => ({ ...previous, adjustInventory: false }));
    }
  }

  async function submitCreateOrder(event) {
    event.preventDefault();

    if (!validateOrderInput()) {
      setOrderNotice({ type: "error", message: "Please fix order form errors." });
      return;
    }

    setLoadingState((previous) => ({ ...previous, createOrder: true }));
    setOrderNotice(null);

    try {
      await apiRequest("/orders", {
        method: "POST",
        body: JSON.stringify({
          orderNumber: orderForm.orderNumber,
          customerName: orderForm.customerName,
          orderDate: orderForm.orderDate,
          lines: orderForm.lines.map((line) => ({
            productId: Number.parseInt(line.productId, 10),
            quantity: Number.parseInt(line.quantity, 10),
            unitPrice: Number.parseFloat(line.unitPrice),
          })),
        }),
      });
      await loadOrders();
      setOrderForm({
        orderNumber: "",
        customerName: "",
        orderDate: new Date().toISOString().slice(0, 10),
        lines: [newLine()],
      });
      setOrderErrors({});
      setOrderNotice({ type: "ok", message: "Order created." });
    } catch (err) {
      setOrderNotice({ type: "error", message: parseError(err) });
    } finally {
      setLoadingState((previous) => ({ ...previous, createOrder: false }));
    }
  }

  async function changeOrderStatus(orderId, status) {
    setLoadingState((previous) => ({
      ...previous,
      transitionOrderById: {
        ...previous.transitionOrderById,
        [orderId]: true,
      },
    }));
    setOrderNotice(null);

    try {
      await apiRequest(`/orders/${orderId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      await Promise.all([loadOrders(), loadProducts()]);

      if (selectedOrder && selectedOrder.id === orderId) {
        const detail = await apiRequest(`/orders/${orderId}`);
        setSelectedOrder(detail);
      }

      setOrderNotice({ type: "ok", message: `Order moved to ${status}.` });
    } catch (err) {
      setOrderNotice({ type: "error", message: parseError(err) });
    } finally {
      setLoadingState((previous) => {
        const nextTransitions = { ...previous.transitionOrderById };
        delete nextTransitions[orderId];
        return {
          ...previous,
          transitionOrderById: nextTransitions,
        };
      });
    }
  }

  async function openOrder(orderId) {
    setLoadingState((previous) => ({ ...previous, openOrder: true }));

    try {
      const detail = await apiRequest(`/orders/${orderId}`);
      setSelectedOrder(detail);
      setOrderNotice({ type: "ok", message: `Loaded order ${orderId}.` });
    } catch (err) {
      setOrderNotice({ type: "error", message: parseError(err) });
    } finally {
      setLoadingState((previous) => ({ ...previous, openOrder: false }));
    }
  }

  return (
    <main className="app-shell">
      <header className="page-hero">
        <h1>Supply Chain POC</h1>
        <p>Independent domains: Order Management and Inventory Management</p>
        <p className="api-hint">API endpoint: {API_BASE_URL}</p>
        {bootstrapError ? <p className="message error">{bootstrapError}</p> : null}
      </header>

      <section className="workflow-strip">
        <div className="flow-step">1. Create product</div>
        <div className="flow-step">2. Add inventory</div>
        <div className="flow-step">3. Create order</div>
        <div className="flow-step">4. Confirm and ship</div>
      </section>

      <section className="card-grid">
        <article className="card">
          <h2>Order Management Domain</h2>
          <p className="section-note">Create orders and move them through status transitions.</p>
          {orderNotice ? <p className={`message ${orderNotice.type}`}>{orderNotice.message}</p> : null}
          <ul className="capability-list">
            <li>Order lifecycle: Draft, Confirmed, Shipped, Cancelled</li>
            <li>Order + line-item management</li>
            <li>Ship-time integration contract</li>
          </ul>

          <form onSubmit={submitCreateOrder} className="form-grid" noValidate>
            <label>
              Order Number
              <input
                name="orderNumber"
                value={orderForm.orderNumber}
                onChange={onOrderFieldChange}
                required
              />
              {validationMessage(orderErrors, "orderNumber")}
            </label>

            <label>
              Customer Name
              <input
                name="customerName"
                value={orderForm.customerName}
                onChange={onOrderFieldChange}
                required
              />
              {validationMessage(orderErrors, "customerName")}
            </label>

            <label>
              Order Date
              <input
                type="date"
                name="orderDate"
                value={orderForm.orderDate}
                onChange={onOrderFieldChange}
                required
              />
              {validationMessage(orderErrors, "orderDate")}
            </label>

            <div className="line-items">
              <h3>Line Items</h3>
              {orderForm.lines.map((line, index) => (
                <div className="line-row" key={`line-${index}`}>
                  <div className="line-field">
                    <select
                      value={line.productId}
                      onChange={(event) => onOrderLineChange(index, "productId", event.target.value)}
                      required
                    >
                      <option value="">Select product</option>
                      {products.map((product) => (
                        <option key={product.id} value={String(product.id)}>
                          {product.sku} ({product.stockOnHand} in stock)
                        </option>
                      ))}
                    </select>
                    {validationMessage(orderErrors, `line-${index}-productId`)}
                  </div>

                  <div className="line-field">
                    <input
                      type="number"
                      min="1"
                      value={line.quantity}
                      onChange={(event) => onOrderLineChange(index, "quantity", event.target.value)}
                      placeholder="Qty"
                      required
                    />
                    {validationMessage(orderErrors, `line-${index}-quantity`)}
                  </div>

                  <div className="line-field">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={line.unitPrice}
                      onChange={(event) => onOrderLineChange(index, "unitPrice", event.target.value)}
                      placeholder="Unit Price"
                      required
                    />
                    {validationMessage(orderErrors, `line-${index}-unitPrice`)}
                  </div>

                  <button
                    type="button"
                    className="ghost"
                    onClick={() => removeOrderLine(index)}
                    disabled={loadingState.createOrder}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="ghost"
                onClick={addOrderLine}
                disabled={loadingState.createOrder}
              >
                Add Line
              </button>
            </div>

            <button type="submit" disabled={loadingState.createOrder}>
              {loadingState.createOrder ? "Creating Order..." : "Create Order"}
            </button>
          </form>

          <h3>Orders</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Order #</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.orderNumber}</td>
                    <td>{order.customerName}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.status}</td>
                    <td className="actions">
                      <button
                        type="button"
                        className="ghost"
                        onClick={() => openOrder(order.id)}
                        disabled={loadingState.openOrder}
                      >
                        {loadingState.openOrder ? "Opening..." : "View Details"}
                      </button>
                      {nextStatuses(order.status).map((action) => (
                        <button
                          type="button"
                          key={`${order.id}-${action.value}`}
                          onClick={() => changeOrderStatus(order.id, action.value)}
                          disabled={Boolean(loadingState.transitionOrderById[order.id])}
                        >
                          {loadingState.transitionOrderById[order.id]
                            ? "Updating..."
                            : action.label}
                        </button>
                      ))}
                    </td>
                  </tr>
                ))}
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      No orders yet. Start by creating an order above after adding at least one product.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          {selectedOrder ? (
            <div className="detail-panel">
              <h3>Order Detail: {selectedOrder.orderNumber}</h3>
              <p>
                Customer: {selectedOrder.customerName} | Status: {selectedOrder.status}
              </p>
              <ul>
                {selectedOrder.lines.map((line) => (
                  <li key={line.id}>
                    Product {line.productId}: qty {line.quantity}, unit price {line.unitPrice}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </article>

        <article className="card">
          <h2>Inventory Management Domain</h2>
          <p className="section-note">Manage products, stock levels, and low-stock alerts.</p>
          {inventoryNotice ? (
            <p className={`message ${inventoryNotice.type}`}>{inventoryNotice.message}</p>
          ) : null}
          <ul className="capability-list">
            <li>Product catalog and stock tracking</li>
            <li>Inbound/outbound adjustments</li>
            <li>Low-stock threshold alerts</li>
          </ul>

          <form onSubmit={submitCreateProduct} className="form-grid" noValidate>
            <label>
              SKU
              <input name="sku" value={productForm.sku} onChange={onProductFieldChange} required />
              {validationMessage(productErrors, "sku")}
            </label>

            <label>
              Name
              <input name="name" value={productForm.name} onChange={onProductFieldChange} required />
              {validationMessage(productErrors, "name")}
            </label>

            <label>
              Stock On Hand
              <input
                type="number"
                min="0"
                name="stockOnHand"
                value={productForm.stockOnHand}
                onChange={onProductFieldChange}
                required
              />
              {validationMessage(productErrors, "stockOnHand")}
            </label>

            <label>
              Low-Stock Threshold
              <input
                type="number"
                min="0"
                name="lowStockThreshold"
                value={productForm.lowStockThreshold}
                onChange={onProductFieldChange}
                required
              />
              {validationMessage(productErrors, "lowStockThreshold")}
            </label>

            <button type="submit" disabled={loadingState.createProduct}>
              {loadingState.createProduct ? "Creating Product..." : "Create Product"}
            </button>
          </form>

          <form onSubmit={submitAdjustment} className="form-grid adjustment-form" noValidate>
            <h3>Inventory Adjustment</h3>
            <label>
              Product
              <select
                name="productId"
                value={adjustmentForm.productId}
                onChange={onAdjustmentFieldChange}
                required
              >
                <option value="">Select product</option>
                {products.map((product) => (
                  <option key={product.id} value={String(product.id)}>
                    {product.sku} ({product.stockOnHand} in stock)
                  </option>
                ))}
              </select>
              {validationMessage(adjustmentErrors, "productId")}
            </label>

            <label>
              Type
              <select name="type" value={adjustmentForm.type} onChange={onAdjustmentFieldChange}>
                <option value="inbound">inbound</option>
                <option value="outbound">outbound</option>
              </select>
            </label>

            <label>
              Quantity
              <input
                type="number"
                min="1"
                name="quantity"
                value={adjustmentForm.quantity}
                onChange={onAdjustmentFieldChange}
                required
              />
              {validationMessage(adjustmentErrors, "quantity")}
            </label>

            <label>
              Reason
              <input
                name="reason"
                value={adjustmentForm.reason}
                onChange={onAdjustmentFieldChange}
              />
            </label>

            <button type="submit" disabled={loadingState.adjustInventory}>
              {loadingState.adjustInventory ? "Applying..." : "Apply Adjustment"}
            </button>
          </form>

          <h3>Products</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>SKU</th>
                  <th>Name</th>
                  <th>Stock</th>
                  <th>Threshold</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.sku}</td>
                    <td>{product.name}</td>
                    <td>{product.stockOnHand}</td>
                    <td>{product.lowStockThreshold}</td>
                  </tr>
                ))}
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5}>
                      No products yet. Create your first SKU above to unlock order creation.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          <div className="detail-panel low-stock">
            <h3>Low Stock</h3>
            {lowStockProducts.length === 0 ? (
              <p>None</p>
            ) : (
              <ul>
                {lowStockProducts.map((product) => (
                  <li key={product.id}>
                    {product.sku}: {product.stockOnHand} (threshold {product.lowStockThreshold})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </article>
      </section>
    </main>
  );
}

export default App;
