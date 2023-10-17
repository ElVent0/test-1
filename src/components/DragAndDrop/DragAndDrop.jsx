import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  //   DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { SortableItem } from "../../utils/dndUtils";

const DragAndDrop = () => {
  const [items, setItems] = useState({
    numbers: ["First", "Second", "Third", "Fourth", "Fifth"],
    colors: ["Blue", "Yellow", "Red", "Green", "Black"],
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  });
  //   const [activeId, setActiveId] = useState();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // For single list
  //   const handleDragEnd = (event, type) => {
  //     const { active, over } = event;
  //     console.log(active, over);
  //     if (active.id !== over.id) {
  //       if (type === "numbers") {
  //         setNumbers((numbers) => {
  //           const activeIndex = numbers.indexOf(active.id);
  //           const overIndex = numbers.indexOf(over.id);
  //           return arrayMove(numbers, activeIndex, overIndex);
  //         });
  //       } else if ((type = "colors"))
  //         setColors((colors) => {
  //           const activeIndex = colors.indexOf(active.id);
  //           const overIndex = colors.indexOf(over.id);
  //           return arrayMove(colors, activeIndex, overIndex);
  //         });
  //     }
  //   };

  function findContainer(id) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  }

  //   function handleDragStart(event) {
  //     const { active } = event;
  //     const { id } = active;

  //     setActiveId(id);
  //   }

  //   function handleDragStart(event) {
  //     const { active } = event;
  //     const { id } = active;

  //     setActiveId(id);
  //   }

  function handleDragOver(event) {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId);

      let newIndex;
      if (overId in prev) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer].indexOf(active.id);
    const overIndex = items[overContainer].indexOf(overId);

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }
  }

  return (
    <div className="p-10 h-screen bg-blue-100 text-blue-900 select-none flex justify-center">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        // onDragEnd={handleDragEnd}
        // onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <ul className="w-64 mr-4">
          <SortableContext
            id={items.numbers}
            items={items.numbers}
            strategy={verticalListSortingStrategy}
          >
            {items.numbers.map((item) => (
              <SortableItem
                key={Math.floor(10000000 + Math.random() * 90000000)}
                id={item}
              />
            ))}
          </SortableContext>
        </ul>
        <ul className="w-64 mr-4">
          <SortableContext
            id={items.colors}
            items={items.colors}
            strategy={verticalListSortingStrategy}
          >
            {items.colors.map((item) => (
              <SortableItem
                key={Math.floor(10000000 + Math.random() * 90000000)}
                id={item}
              />
            ))}
          </SortableContext>
        </ul>
        <ul className="w-64">
          <SortableContext
            id={items.days}
            items={items.days}
            strategy={verticalListSortingStrategy}
          >
            {items.days.map((item) => (
              <SortableItem
                key={Math.floor(10000000 + Math.random() * 90000000)}
                id={item}
              />
            ))}
          </SortableContext>
        </ul>
        {/* <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay> */}
      </DndContext>
    </div>
  );
};

export default DragAndDrop;
