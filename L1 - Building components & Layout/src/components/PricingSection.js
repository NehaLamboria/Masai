import React from 'react';
import PricingCard from './PricingCard';

const PricingSection = () => {
  const styles = {
    pricingSection: {
      fontFamily: 'sans-serif',
      padding: '40px',
    },
    header: {
      marginBottom: '30px',
      textAlign: 'left',
    },
    mainHeading: {
      fontSize: '2em',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '5px',
    },
    highlight: {
      color: '#9466FF',
    },
    subHeading: {
      color: '#777',
      lineHeight: '1.6',
    },
    plansContainer: {
      display: 'flex',
      gap: '20px',
    },
  };

  return (
    <div style={styles.pricingSection}>
      <div style={styles.header}>
        <h2 style={styles.mainHeading}>
          The Right Plan for <span style={styles.highlight}>Your Business</span>
        </h2>
        <p style={styles.subHeading}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
          quod in iure vero. Facilis magnam, sed officiis commodi labore odit.
        </p>
      </div>
      <div style={styles.plansContainer}>
        <PricingCard
          planName="Starter"
          price="Free"
          features={['1 lorem ipsum', 'Lorem, ipsum dolor.', 'Monthly Updates']}
          buttonText="Get Started"
          isFree={true}
        />
        <PricingCard
          planName="Lorem Plus"
          price="$32.00"
          features={['1 lorem ipsum', 'Lorem, ipsum dolor.', 'Monthly Updates']}
          buttonText="Get Started"
        />
        <PricingCard
          planName="Lorem Pro"
          price="$50.00"
          features={['1 lorem ipsum', 'Lorem, ipsum dolor.', 'Monthly Updates']}
          buttonText="Get Started"
        />
      </div>
    </div>
  );
};

export default PricingSection;
