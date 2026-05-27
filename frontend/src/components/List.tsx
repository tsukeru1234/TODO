import type { JSX } from "react";

interface FolderListProps<I extends { id: string }> {
  data: I[];
  render: (item: I) => JSX.Element;
}

export const List = <I extends { id: string }>({
  data,
  render,
}: FolderListProps<I>) => {
  return (
    <>
      {data.map((item) => (
        <span key={item.id}>{render(item)}</span>
      ))}
    </>
  );
};

export default List;
