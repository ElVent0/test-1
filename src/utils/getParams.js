export const getParams = (resultData) => {
  if (!!resultData) {
    const resultParameters = [];
    resultData.forEach((item) => {
      Object.entries(item).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            resultParameters.push({ key: key, value: item });
          });
        }
      });
    });

    const uniqueValues = resultParameters.filter((item, index) => {
      return (
        index ===
        resultParameters.findIndex(
          (resItem) => item.value === resItem.value && item.key === resItem.key
        )
      );
    });

    return uniqueValues;
  }
};
