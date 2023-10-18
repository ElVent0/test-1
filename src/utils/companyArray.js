export const companyArray = (data, index) => {
  return [
    ...data[index].companies,
    ...data[index].positions,
    ...data[index].tags,
  ].map((dataItem) => dataItem.toLowerCase().replace(/\s/g, "+"));
};
