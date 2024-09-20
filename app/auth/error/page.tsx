import { BsExclamationTriangleFill } from "react-icons/bs";

const ErrorPage = () => {
  return (
    <main className="w-full h-full flex justify-center items-center">
      <div className="card card-compact bg-base-100 w-[400px] shadow-3xl">
        <div className="card-body text-center">
          <h2 className="card-title">🔒 Authentication error</h2>
          <div className="card-actions justify-end">
            <div className="w-full flex items-center justify-center text-error">
              <BsExclamationTriangleFill className="me-2" />
              Oops! Something went wrong :(
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
