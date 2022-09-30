import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default ToastContainer;

export const toastSuccess = (message) => {
  toast.success(message, {
    className: "toast-suceess-color",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const toastError = (message) => {
  toast.error(message, {
    className: "toast-error-color",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
