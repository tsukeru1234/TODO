import { Suspense, type JSX } from "react";
import FoldersComponent from "../components/Folders/FoldersComponent";
import LoadComponent from "../components/Loaders/LoadComponent";
import FolderList from "../components/Folders/FolderList";

interface TodoListTypes {
  children: JSX.Element;
}

const TodoList = ({ children }: TodoListTypes) => {
  return (
    <div className="todo-main">
      <div className="todo-folders"><FolderList /></div>
      <div className="todo-children">{children}</div>
      {/* <div className="fixed inset-6 rounded-4xl dark-hard-glass grid grid-cols-5 gap-3 min-h-0">
        <div className="dark-gradient-hard-glass h-full rounded-l-4xl p-5 text-2xl font-bold text-accent flex flex-col justify-between gap-1.5">
          <Suspense fallback={<LoadComponent />}>
            <FoldersComponent />
          </Suspense>
        </div>
        <div className="h-full py-5 pr-5 col-span-4 min-h-0">
          <div className="dark-soft-glass rounded-3xl h-full">{children}</div>
        </div>
      </div> */}
    </div>
  );
};

export default TodoList;
