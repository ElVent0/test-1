import { isThisTitle, companyArray } from "../utils/index.js";

const AnswerItem = ({ resultData, data, searchParams }) => {
  return (
    <>
      {resultData.map(
        (item, index) =>
          isThisTitle(
            index,
            companyArray(data, index),
            searchParams,
            resultData
          ) && (
            <li
              className="mt-8 text-blue-900 text-lg bg-gray-50 rounded-md px-4 py-2
          w-60"
              key={index}
            >
              {item.title}
            </li>
          )
      )}
    </>
  );
};

export default AnswerItem;
