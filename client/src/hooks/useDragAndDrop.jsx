import { useDraggable, useDroppable } from "@dnd-kit/core";

export function Draggable({ children, id }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

export function Droppable({ children, id }) {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return <div ref={setNodeRef}>{children}</div>;
}
