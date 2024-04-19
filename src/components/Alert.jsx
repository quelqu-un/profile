const Alert = ({ type, text }) => {
    return (
      <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 bg-${type}-200 text-${type}-800 text-sm px-4 py-2 rounded `}>
        <div
          className={`p-2 ${
            type === "danger" ? "bg-red-800" : "bg-blue-800"
          } items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex`}
          role='alert'
        >
          <p
            className={`flex rounded-full ${
              type === "danger" ? "bg-red-500" : "bg-blue-500"
            } uppercase px-2 py-1 text-xs font-semibold mr-3`}
          >
            {type === "danger" ? "Failed" : "Success"}
          </p>
          <p className='mr-2 text-left'>{text}</p>
        </div>
      </div>
    );
  };
  
  export default Alert;