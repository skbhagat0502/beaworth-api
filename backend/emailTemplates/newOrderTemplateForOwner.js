const newOrderTemplateForOwner = (order) => {
  const { orderItems, itemsPrice, taxPrice, shippingPrice, totalPrice } = order;

  const itemsList = orderItems
    .map(
      (item) =>
        `${item.name} - Quantity: ${item.quantity} - Price: $${item.price}`
    )
    .join("\n");

  return {
    text: `
        A new order has been placed!
  
        Here are the details:
  
        ${itemsList}
  
        Items Price: $${itemsPrice}
        Tax: $${taxPrice}
        Shipping: $${shippingPrice}
        Total Price: $${totalPrice}
  
        Thank you for shopping with us!
      `,
    html: `
    <html>
  <body style="background-color: #f2f2f2; padding: 1rem; color: #333; font-family: 'Arial', sans-serif; margin: 0;">
    <header style="background-color: tomato; padding: 1rem; text-align: center; color: white;">
      <h1 style="font-size: 2rem; margin-bottom: 0.5rem;">Beaworth</h1>
    </header>
    <h2 style="text-align: center;">Order Details</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 1rem;">
      <tr>
        <th style="border: 1px solid #ddd; padding: 0.5rem; text-align: left; background-color: #f2f2f2;">Item</th>
        <th style="border: 1px solid #ddd; padding: 0.5rem; text-align: left; background-color: #f2f2f2;">Quantity</th>
        <th style="border: 1px solid #ddd; padding: 0.5rem; text-align: left; background-color: #f2f2f2;">Price</th>
      </tr>
      ${orderItems
        .map(
          (item) => `
        <tr>
          <td style="border: 1px solid #ddd; padding: 0.5rem; text-align: left;">${item.name}</td>
          <td style="border: 1px solid #ddd; padding: 0.5rem; text-align: left;">${item.quantity}</td>
          <td style="border: 1px solid #ddd; padding: 0.5rem; text-align: left;">${item.price}</td>
        </tr>`
        )
        .join("")}
    </table>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 1rem;">
      <tr>
        <th style="border: 1px solid #ddd; padding: 0.5rem; text-align: left; background-color: #f2f2f2;">Price Details</th>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 0.5rem; text-align: left;">Total Items Price:</td>
        <td style="border: 1px solid #ddd; padding: 0.5rem; text-align: left;">₹${itemsPrice}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 0.5rem; text-align: left;">Tax:</td>
        <td style="border: 1px solid #ddd; padding: 0.5rem; text-align: left;">₹${taxPrice}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 0.5rem; text-align: left;">Shipping:</td>
        <td style="border: 1px solid #ddd; padding: 0.5rem; text-align: left;">₹${shippingPrice}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 0.5rem; text-align: left;">Total Price:</td>
        <td style="border: 1px solid #ddd; padding: 0.5rem; text-align: left;">₹${totalPrice}</td>
      </tr>
    </table>
    <p style="margin: 0.5rem 0;">Use Beaworth app for more details</p>
    <footer style="text-align: center; margin-top: 2rem; color: #666;">
      <p>Thank you for shopping with us!</p>
    </footer>
  </body>
</html>
`,
  };
};

export default newOrderTemplateForOwner;
