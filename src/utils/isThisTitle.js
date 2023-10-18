const anyOfParametersIncludes = (companyArray, searchParams) => {
  return (
    (searchParams.get("tags") &&
      companyArray.includes(searchParams.get("tags").split(" ").join("+"))) ||
    (searchParams.get("companies") &&
      companyArray.includes(
        searchParams.get("companies").split(" ").join("+")
      )) ||
    (searchParams.get("positions") &&
      companyArray.includes(searchParams.get("positions").split(" ").join("+")))
  );
};

export const isThisTitle = (
  titleNumber,
  companyArray,
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
      anyOfParametersIncludes(companyArray, searchParams)
    );
  } else if (
    (searchParams.get("tags") ||
      searchParams.get("companies") ||
      searchParams.get("positions")) &&
    searchParams.get("q")
  ) {
    return (
      resultData[titleNumber].title.includes(searchParams.get("q")) &&
      anyOfParametersIncludes(companyArray, searchParams)
    );
  } else if (
    !searchParams.get("tags") &&
    !searchParams.get("companies") &&
    !searchParams.get("positions") &&
    !searchParams.get("q")
  ) {
    return true;
  } else {
    return resultData[titleNumber].title.includes(searchParams.get("q"));
  }
};
