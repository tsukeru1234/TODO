import type { JSX } from "react";

interface FolderListProps<I extends { id: string }> {
  data: I[];
  render: (item: I) => JSX.Element;
  mainClass: string;
}

export const List = <I extends { id: string }>({
  data,
  render,
  mainClass,
}: FolderListProps<I>) => {
  return (
    <>
      {data.map((item) => (
        <span className={mainClass} key={item.id}>
          {render(item)}
        </span>
      ))}
    </>
  );
};

export default List;
