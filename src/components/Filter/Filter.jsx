import { useState, useEffect } from "react";
import data from "../../utils/data.json";
import { useLocation, useSearchParams } from "react-router-dom";
// import useGetParams from "../../hooks/useGetParams";
import {
  isInParams,
  isThisTitle,
  companyArrey,
  getParams,
} from "../../utils/utils";

const Filter = () => {
  // States -----------------------------------------------

  const [resultData, setResultData] = useState([]);
  const [query, setQuery] = useState("");

  // Hooks -----------------------------------------------

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // useEffects -----------------------------------------------

  useEffect(() => {
    // Тут я "типу" беру дані з беку
    setResultData(data);
  }, []);

  useEffect(() => {
    if (query === "") {
      searchParams.delete("q");
    } else {
      searchParams.set("q", query);
    }
    setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // onClick / onChange / onSubmit functions ------------------

  const onChangeParams = (value, key) => {
    searchParams.set(key, decodeURIComponent(value).toLowerCase());
    setSearchParams(searchParams);
  };

  const onResetParams = () => {
    setSearchParams("");
  };

  const onChangeQuery = (e) => {
    setQuery(e.currentTarget.value);
  };

  // -----------------------------------------------------

  return (
    <div className="p-10 h-screen bg-blue-100">
      <p className="text-blue-900 text-2xl font-semibold mb-4">Questions</p>
      <input
        className="w-40 h-8 p-2 border border-blue-500 rounded-lg focus:outline-none focus:ring focus:border-blue-700"
        type="text"
        name="query"
        value={query}
        placeholder="Query"
        onChange={onChangeQuery}
      />
      <ul className="flex flex-wrap gap-2 mt-4">
        {resultData.length > 0 &&
          getParams(resultData).map((item) => (
            <li
              className="text-blue-900 "
              key={Math.floor(10000000 + Math.random() * 90000000)}
            >
              <button
                className={` rounded-lg  ${
                  isInParams(item.value, searchParams)
                    ? "bg-blue-500 text-blue-100 hover:bg-blue-600"
                    : "bg-blue-200 text-blue-900 hover:bg-blue-300"
                } duration-300 py-1 px-3`}
                type="button"
                onClick={() => onChangeParams(item.value, item.key)}
              >
                {item.value}
              </button>
            </li>
          ))}
      </ul>
      <button
        className="mt-4 px-4 py-2 text-blue-900 bg-blue-300 rounded-md hover:bg-blue-500 hover:text-white transition duration-300"
        type="button"
        onClick={onResetParams}
      >
        Reset
      </button>
      {resultData.length > 0 &&
        location.search &&
        resultData.map(
          (item, index) =>
            isThisTitle(
              index,
              companyArrey(data, index),
              searchParams,
              resultData
            ) && (
              <li
                className="mt-8 text-blue-900 text-lg bg-gray-50 rounded-md px-4 py-2
          w-60"
                key={Math.floor(10000000 + Math.random() * 90000000)}
              >
                {resultData[index].title}
              </li>
            )
        )}
    </div>
  );
};

export default Filter;
