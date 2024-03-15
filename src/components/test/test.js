import React, { useState } from 'react';

const VerticalTabs = () => {
  const [numTabs, setNumTabs] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const handleInputChange = (e) => {
    setNumTabs(parseInt(e.target.value) || 0);
    setActiveTab(0);
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: '20px' }}>
        <input type="number" value={numTabs} onChange={handleInputChange} />
        {[...Array(numTabs)].map((_, index) => (
          <div
            key={index}
            style={{
              padding: '10px',
              marginBottom: '5px',
              backgroundColor: activeTab === index ? 'lightblue' : 'white',
              cursor: 'pointer',
            }}
            onClick={() => handleTabClick(index)}
          >
            Tab {index + 1}
          </div>
        ))}
      </div>
      <div>
        {activeTab >= 0 && (
          <div style={{ padding: '10px', border: '1px solid black' }}>
            Tab Content {activeTab + 1}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerticalTabs;