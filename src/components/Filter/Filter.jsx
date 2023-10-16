import { useState, useEffect } from "react";
import data from "../../utils/data.json";
import { useLocation, useNavigate } from "react-router-dom";

const Filter = () => {
  const [resultData, setResultData] = useState([]);
  const [query, setQuery] = useState("");
  const [firstCompanyArrey, setFirstCompanyArrey] = useState([]);
  const [secondCompanyArrey, setSecondCompanyArrey] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

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
    if (query === "") {
      const currentParams = new URLSearchParams(location.search);
      currentParams.delete("q");
      navigate({ search: currentParams.toString() });
      return;
    }
    const currentParams = new URLSearchParams(location.search);
    currentParams.set("q", query);
    navigate({ search: currentParams.toString() });
  }, [query]);

  console.log(resultData, firstCompanyArrey, secondCompanyArrey);

  const getParams = () => {
    if (resultData.length > 0) {
      const resultArrayFirst = [];
      const resultArraySecond = [];

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

  console.log(query);

  return (
    <div>
      <p>Questions</p>
      <input type="text" name="query" value={query} onChange={onChangeQuery} />
      <ul>
        {resultData.length > 0 &&
          getParams().map((item) => (
            <li key={Math.floor(10000000 + Math.random() * 90000000)}>
              <button
                type="button"
                onClick={() => onChangeParams(item.value, item.key)}
              >
                {item.value}
              </button>
            </li>
          ))}
      </ul>
      <button type="button" onClick={onResetParams}>
        Reset
      </button>
      {resultData.length > 0 &&
        location.search &&
        (resultData[0].title.includes(searchParams.get("q")) ||
          firstCompanyArrey.includes(searchParams.get("tags")) ||
          firstCompanyArrey.includes(searchParams.get("companies")) ||
          firstCompanyArrey.includes(searchParams.get("positions"))) && (
          <p>{resultData[0].title}</p>
        )}
      {resultData.length > 0 &&
        location.search &&
        (resultData[1].title.includes(searchParams.get("q")) ||
          secondCompanyArrey.includes(searchParams.get("tags")) ||
          secondCompanyArrey.includes(searchParams.get("companies")) ||
          secondCompanyArrey.includes(searchParams.get("positions"))) && (
          <p>{resultData[1].title}</p>
        )}
    </div>
  );
};

export default Filter;
