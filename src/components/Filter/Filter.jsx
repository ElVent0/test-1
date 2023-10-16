import { useState, useEffect } from "react";
import data from "../../utils/data.json";
import { useLocation, useNavigate } from "react-router-dom";

const Filter = () => {
  // States -----------------------------------------------

  const [resultData, setResultData] = useState([]);
  const [query, setQuery] = useState("");
  const [firstCompanyArrey, setFirstCompanyArrey] = useState([]);
  const [secondCompanyArrey, setSecondCompanyArrey] = useState([]);

  // Hooks -----------------------------------------------

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  // useEffects -----------------------------------------------

  useEffect(() => {
    // Тут я "типу" беру дані з беку
    setResultData(data);
    setFirstCompanyArrey(
      [...data[0].companies, ...data[0].positions, ...data[0].tags].map(
        (item) => item.toLowerCase().replace(/\s/g, "+")
      )
    );
    setSecondCompanyArrey(
      [...data[1].companies, ...data[1].positions, ...data[1].tags].map(
        (item) => item.toLowerCase().replace(/\s/g, "+")
      )
    );
  }, []);

  useEffect(() => {
    const currentParams = new URLSearchParams(location.search);
    if (query === "") {
      currentParams.delete("q");
    } else {
      currentParams.set("q", query);
    }
    navigate({ search: currentParams.toString() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // -----------------------------------------------------

  const getParams = () => {
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

  // Utils -----------------------------------------------

  const onChangeParams = (value, key) => {
    const currentParams = new URLSearchParams(location.search);
    currentParams.set(key, decodeURIComponent(value).toLowerCase());
    navigate({ search: currentParams.toString() });
  };

  const onResetParams = () => {
    navigate({ search: "" });
  };

  const onChangeQuery = (e) => {
    setQuery(e.currentTarget.value);
  };

  const isInParams = (item) => {
    return (
      searchParams.get("tags") === decodeURIComponent(item).toLowerCase() ||
      searchParams.get("companies") ===
        decodeURIComponent(item).toLowerCase() ||
      searchParams.get("positions") === decodeURIComponent(item).toLowerCase()
    );
  };

  const isThisTitle = (titleNumber, companyArrey) => {
    resultData[titleNumber].title.includes(searchParams.get("q")) ||
      companyArrey.includes(searchParams.get("tags")) ||
      companyArrey.includes(searchParams.get("companies")) ||
      companyArrey.includes(searchParams.get("positions"));
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
          getParams().map((item) => (
            <li
              className="text-blue-900 "
              key={Math.floor(10000000 + Math.random() * 90000000)}
            >
              <button
                className={` rounded-lg  ${
                  isInParams(item.value)
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
        isThisTitle(0, firstCompanyArrey) && (
          <p
            className="mt-12 text-blue-900 text-lg bg-gray-50 rounded-md px-4 py-2
          w-60"
          >
            {resultData[0].title}
          </p>
        )}
      {resultData.length > 0 &&
        location.search &&
        isThisTitle(1, secondCompanyArrey) && (
          <p
            className="mt-4 text-blue-900 text-lg bg-gray-50 rounded-md px-4 py-2
          w-60"
          >
            {resultData[1].title}
          </p>
        )}
    </div>
  );
};

export default Filter;
