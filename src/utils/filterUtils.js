export const isInParams = (item, searchParams) => {
  return (
    searchParams.get("tags") === decodeURIComponent(item).toLowerCase() ||
    searchParams.get("companies") === decodeURIComponent(item).toLowerCase() ||
    searchParams.get("positions") === decodeURIComponent(item).toLowerCase()
  );
};

// --------------------------------------------------------

const anyOfParametersIncludes = (companyArrey, searchParams) => {
  return (
    companyArrey.includes(searchParams.get("tags")) ||
    companyArrey.includes(searchParams.get("companies")) ||
    companyArrey.includes(searchParams.get("positions"))
  );
};

export const isThisTitle = (
  titleNumber,
  companyArrey,
  searchParams,
  resultData
) => {
  if (
    (searchParams.get("tags") ||
      searchParams.get("companies") ||
      searchParams.get("positions")) &&
    !searchParams.get("q")
  ) {
    return (
      resultData[titleNumber].title.includes(searchParams.get("q")) ||
      anyOfParametersIncludes(companyArrey, searchParams)
    );
  } else if (
    (searchParams.get("tags") ||
      searchParams.get("companies") ||
      searchParams.get("positions")) &&
    searchParams.get("q")
  ) {
    return (
      resultData[titleNumber].title.includes(searchParams.get("q")) &&
      anyOfParametersIncludes(companyArrey, searchParams)
    );
  } else {
    return resultData[titleNumber].title.includes(searchParams.get("q"));
  }
};

// --------------------------------------------------------

export const companyArrey = (data, index) => {
  return [
    ...data[index].companies,
    ...data[index].positions,
    ...data[index].tags,
  ].map((dataItem) => dataItem.toLowerCase().replace(/\s/g, "+"));
};

// --------------------------------------------------------

export const getParams = (resultData) => {
  if (resultData.length > 0) {
    const resultArrayFirst = [];
    for (const key in resultData[0]) {
      if (key !== "title") {
        const values = resultData[0][key];
        for (const value of values) {
          const obj = {
            key: key,
            value: value,
          };
          resultArrayFirst.push(obj);
        }
      }
    }

    const resultArraySecond = [];
    for (const key in resultData[1]) {
      if (key !== "title") {
        const values = resultData[1][key];
        for (const value of values) {
          const obj = {
            key: key,
            value: value,
          };
          resultArraySecond.push(obj);
        }
      }
    }

    const resultParameters = [...resultArrayFirst, ...resultArraySecond];

    const uniqueValues = [];
    const seenValues = {};

    for (const item of resultParameters) {
      const { key, value } = item;
      if (!seenValues[key]) {
        seenValues[key] = {};
      }
      if (!seenValues[key][value]) {
        seenValues[key][value] = true;
        uniqueValues.push(item);
      }
    }
    return uniqueValues;
  }
};
