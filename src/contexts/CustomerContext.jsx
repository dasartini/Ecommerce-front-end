import React, { createContext, useState, useContext, useEffect } from "react";

const CustomerDataContext = createContext();

export const CustomerDataProvider = ({ children }) => {
  const [customerData, setCustomerData] = useState({
  });



  useEffect(() => {
    localStorage.setItem("customerData",(customerData));
  }, [customerData]);

  return (
    <CustomerDataContext.Provider
      value={{ customerData, setCustomerData}}
    >
      {children}
    </CustomerDataContext.Provider>
  );
};

export const useCustomerDataContext = () => useContext(CustomerDataContext);
