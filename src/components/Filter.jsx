import { useState, useEffect } from "react";
import data from "../api/data.json";
import { useSearchParams } from "react-router-dom";
import { isInParams, getParams } from "../utils/index.js";
import useGetParams from "../hooks/useGetParams";
import AnswerItem from "./AnswerItem.jsx";

const Filter = () => {
  const [resultData, setResultData] = useState([]);
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setResultData(data);
  }, []);

  useEffect(() => {
    if (query === "") {
      searchParams.delete("q");
    } else {
      searchParams.set("q", query);
    }
    setSearchParams(searchParams);
  }, [query]);

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

  const params = useGetParams(resultData);
  console.log(params);

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
        {!!resultData &&
          params.map((item, index) => (
            <li className="text-blue-900 " key={index}>
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
      {!!resultData && (
        <AnswerItem
          resultData={resultData}
          data={data}
          searchParams={searchParams}
        />
      )}
    </div>
  );
};

export default Filter;
