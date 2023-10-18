import { useState, useEffect } from "react";

const useGetQuestion = (resultData, data, searchParams) => {
  const [questions, setQuestions] = useState([]);

  const companyArray = (data, index) => {
    return [
      ...data[index].companies,
      ...data[index].positions,
      ...data[index].tags,
    ].map((dataItem) => dataItem.toLowerCase().replace(/\s/g, "+"));
  };

  const onlyParams =
    (searchParams.get("tags") ||
      searchParams.get("companies") ||
      searchParams.get("positions")) &&
    !searchParams.get("q");

  const neitherParamsNorQuery =
    !searchParams.get("tags") &&
    !searchParams.get("companies") &&
    !searchParams.get("positions") &&
    !searchParams.get("q");

  const bothParamsQuery =
    (searchParams.get("tags") ||
      searchParams.get("companies") ||
      searchParams.get("positions")) &&
    searchParams.get("q");

  const anyOfParametersIncludes = (companyArray, searchParams) => {
    return (
      (searchParams.get("tags") &&
        companyArray.includes(searchParams.get("tags").split(" ").join("+"))) ||
      (searchParams.get("companies") &&
        companyArray.includes(
          searchParams.get("companies").split(" ").join("+")
        )) ||
      (searchParams.get("positions") &&
        companyArray.includes(
          searchParams.get("positions").split(" ").join("+")
        ))
    );
  };

  const isThisTitle = (titleNumber, data, searchParams, resultData) => {
    if (onlyParams) {
      return (
        resultData[titleNumber].title.includes(searchParams.get("q")) ||
        anyOfParametersIncludes(companyArray(data, titleNumber), searchParams)
      );
    } else if (bothParamsQuery) {
      return (
        resultData[titleNumber].title.includes(searchParams.get("q")) &&
        anyOfParametersIncludes(companyArray(data, titleNumber), searchParams)
      );
    } else if (neitherParamsNorQuery) {
      return true;
    } else {
      return resultData[titleNumber].title.includes(searchParams.get("q"));
    }
  };

  useEffect(() => {
    const finalData = resultData.filter((item, index) =>
      isThisTitle(index, data, searchParams, resultData)
    );

    setQuestions(finalData);
  }, [data, resultData, searchParams]);

  return questions;
};

export default useGetQuestion;
