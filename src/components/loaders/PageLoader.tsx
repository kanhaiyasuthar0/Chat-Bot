import ScaleLoaderComponent from "./ScaleLoader";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <ScaleLoaderComponent />
    </div>
  );
};

export default PageLoader;
