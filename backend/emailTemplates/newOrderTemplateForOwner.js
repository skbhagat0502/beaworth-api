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
    <head>
    </head>
    <body style={{ 
      backgroundColor: 'tomato',
      padding: '1rem',
      color: 'white',
      fontFamily: 'sans-serif',
      width: '100%',
      height: '100%',
    }}>
      <h1 style={{
        width: '100%',
        height: '50px',
        fontSize: '2rem',
        textAlign: 'center',
        borderBottom: '1px solid white',
      }}>Beaworth</h1>
      <h2 style={{
        textAlign: 'center',
      }}>A new order has been placed!</h2>
      <p>Here are the details:</p>
      <ul>
        ${itemsList}
      </ul>
      <p>Items Price: ₹${itemsPrice}</p>
      <p>Tax: ₹${taxPrice}</p>
      <p>Shipping: ₹${shippingPrice}</p>
      <p>Total Price: ₹${totalPrice}</p>
      <p>Use Beaworth app for more details</p>
    </body>
  </html>
      `,
  };
};

module.exports = newOrderTemplateForOwner;
