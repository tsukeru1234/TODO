const DetailFolderLoaderComponent = () => {
  return (
    <>
      <div className="p-4 grid grid-cols-6 grid-rows-[1fr_15fr_4fr] h-full font-bold gap-2 text-my-dub-400">
        <span className="col-span-6 px-20">
          <div className="w-full h-full rounded-xl load-glass"></div>
        </span>
        <div className="w-full pt-2 flex flex-col gap-2">
          <span className="inline-flex justify-between w-full load-glass rounded-xl text-gray-800 h-7"></span>
          <span className="inline-flex justify-between w-full load-glass rounded-xl text-gray-800 h-7"></span>
          <span className="inline-flex justify-between w-full load-glass rounded-xl text-gray-800 h-7"></span>
          <span className="inline-flex justify-between w-full load-glass rounded-xl text-gray-800 h-7"></span>
          <span className="inline-flex justify-between w-full load-glass rounded-xl text-gray-800 h-7"></span>
          <span className="inline-flex justify-between w-full load-glass rounded-xl text-gray-800 h-7"></span>
          <span className="inline-flex justify-between w-full load-glass rounded-xl text-gray-800 h-7"></span>
          <span className="inline-flex justify-between w-full load-glass rounded-xl text-gray-800 h-7"></span>
          <span className="inline-flex justify-between w-full load-glass rounded-xl text-gray-800 h-7"></span>
          <span className="inline-flex justify-between w-full load-glass rounded-xl text-gray-800 h-7"></span>
          <span className="inline-flex justify-between w-full load-glass rounded-xl text-gray-800 h-7"></span>
          <span className="inline-flex justify-between w-full load-glass rounded-xl text-gray-800 h-7"></span>
          <span className="inline-flex justify-between w-full load-glass rounded-xl text-gray-800 h-7"></span>
          <span className="inline-flex justify-between w-full load-glass rounded-xl text-gray-800 h-7"></span>
          <span className="inline-flex justify-between w-full load-glass rounded-xl text-gray-800 h-7"></span>
        </div>
        <div className="col-span-5 p-2">
          <div className="load-glass w-full h-full rounded-2xl"></div>
        </div>
        <div className="col-span-6">
          <hr className="border-dashed border-2 border-my-dub-500 mb-2" />
          <span>Описание:</span>
          <div className="w-full h-36 rounded-2xl load-glass"></div>
        </div>
      </div>
    </>
  );
};

export default DetailFolderLoaderComponent;
