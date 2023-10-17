import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableItem = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="text-lg bg-gray-50 rounded-md px-4 py-2 mb-2 last-of-type:mb-0"
    >
      {props.id}
    </li>
  );
};

// --------------------------------------------------------

// export function Item(props) {
//   const { id } = props;

//   const style = {
//     width: "100%",
//     height: 50,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     border: "1px solid black",
//     margin: "10px 0",
//     background: "white",
//   };

//   return <div style={style}>{id}</div>;
// }
