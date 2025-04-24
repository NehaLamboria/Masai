import React from 'react';

const PricingCard = ({ planName, price, features, buttonText, isFree }) => {
  const styles = {
    pricingCard: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      width: '300px',
    },
    planName: {
      fontSize: '1.5em',
      fontWeight: 'bold',
      color: 'black',
      marginBottom: '15px',
    },
    featuresList: {
      listStyle: 'none',
      padding: 0,
      marginBottom: '20px',
    },
    featureItem: {
      color: '#666',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
    },
    checkmark: {
      color: '#27AE60',
      marginRight: '8px',
      fontSize: '1.2em',
    },
    priceContainer: {
      marginBottom: '20px',
    },
    price: {
      fontSize: '2em',
      fontWeight: 'bold',
      color: '#333',
    },
    getStartedButton: {
      backgroundColor: '#9466FF',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 20px',
      cursor: 'pointer',
      fontSize: '1em',
      transition: 'background-color 0.3s ease',
    },
    freeButton: {
      backgroundColor: '#ddd',
      color: '#9466FF',
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '10px 20px',
      cursor: 'pointer',
      fontSize: '1em',
      transition: 'background-color 0.3s ease',
    },
  };

  return (
    <div style={styles.pricingCard}>
      <h3 style={styles.planName}>{planName}</h3>
      <ul style={styles.featuresList}>
        {features.map((feature, index) => (
          <li key={index} style={styles.featureItem}>
            <span style={styles.checkmark}>&#10004;</span> {feature}
          </li>
        ))}
      </ul>
      <div style={styles.priceContainer}>
        <span style={styles.price}>{price}</span>
      </div>
      <button style={isFree ? styles.freeButton : styles.getStartedButton}>
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;
