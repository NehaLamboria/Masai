import React, { useState } from 'react';

function ShoppingList() {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  // Handle adding an item
  const addItem = () => {
    if (!item || !quantity || quantity < 1) {
      alert('Please provide a valid item and quantity greater than 0.');
      return;
    }

    setShoppingList([...shoppingList, { item, quantity }]);
    setItem('');
    setQuantity('');
  };

  // Handle removing an item
  const removeItem = (index) => {
    const updatedList = shoppingList.filter((_, i) => i !== index);
    setShoppingList(updatedList);
  };

  // Handle clearing all items
  const clearAll = () => {
    setShoppingList([]);
  };

  return (
    <div>
      <h2>Shopping List</h2>

      {/* Input for item and quantity */}
      <div>
        <input
          type="text"
          placeholder="Item name"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>
      </div>

      {/* Display shopping list */}
      <ul>
        {shoppingList.map((entry, index) => (
          <li key={index}>
            {entry.item} - {entry.quantity} 
            <button onClick={() => removeItem(index)}>Remove</button>
          </li>
        ))}
      </ul>

      {/* Clear All button */}
      {shoppingList.length > 0 && (
        <button onClick={clearAll}>Clear All</button>
      )}
    </div>
  );
}

export default ShoppingList;
