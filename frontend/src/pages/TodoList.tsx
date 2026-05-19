import { Suspense, type JSX } from "react";
import FoldersComponent from "../components/Folders/FoldersComponent";
import LoadComponent from "../components/Loaders/LoadComponent";

interface TodoListTypes {
  children: JSX.Element;
}

const TodoList = ({ children }: TodoListTypes) => {
  return (
    <>
      <div className="fixed inset-6 rounded-4xl dark-glass grid grid-cols-5 gap-3">
        <div className="dark-gradient-hard-glass h-full rounded-l-4xl p-5 text-2xl font-bold text-my-dub-400 flex flex-col justify-between gap-1.5">
          <Suspense fallback={<LoadComponent />}>
            <FoldersComponent />
          </Suspense>
        </div>
        <div className="dark-soft-glass rounded-3xl my-5 mr-5 col-span-4">
          {children}
        </div>
      </div>
    </>
  );
};

export default TodoList;
