import useGetQuestions from "../hooks/useGetQuestion.js";

const AnswerItems = ({ resultData, data, searchParams }) => {
  const questions = useGetQuestions(resultData, data, searchParams);

  return questions.map((item, index) => (
    <li
      className="mt-8 text-blue-900 text-lg bg-gray-50 rounded-md px-4 py-2
          w-60"
      key={index}
    >
      {item && item.title}
    </li>
  ));
};

export default AnswerItems;
