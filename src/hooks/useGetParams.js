import { useState, useEffect } from "react";

const useGetParams = (resultData) => {
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    resultData.forEach((item) => {
      Object.entries(item).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            setFilters((prev) => [...prev, { key: key, value: item }]);
          });
        }
      });
    });
  }, [resultData]);

  const uniqueValues = filters.filter((item, index) => {
    return (
      index ===
      filters.findIndex(
        (resItem) => item.value === resItem.value && item.key === resItem.key
      )
    );
  });

  return uniqueValues;
};

export default useGetParams;
