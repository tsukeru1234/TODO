import { Suspense, type JSX } from "react";
import FoldersComponent from "../components/Folders/FoldersComponent";
import LoadComponent from "../components/Loaders/LoadComponent";

interface TodoListTypes {
  children: JSX.Element;
}

const TodoList = ({ children }: TodoListTypes) => {
  return (
    <>
      <div className="fixed inset-6 rounded-4xl dark-glass grid grid-cols-5 gap-3 min-h-0">
        <div className="dark-gradient-hard-glass h-full rounded-l-4xl p-5 text-2xl font-bold text-my-dub-400 flex flex-col justify-between gap-1.5 3xl:gap-3 3xl:text-6xl 3xl:py-15 3xl:px-10">
          <Suspense fallback={<LoadComponent />}>
            <FoldersComponent />
          </Suspense>
        </div>
        <div className="h-full py-5 pr-5 col-span-4 min-h-0 3xl:py-15 3xl:pr-15">
          <div className="dark-soft-glass rounded-3xl h-full">{children}</div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
