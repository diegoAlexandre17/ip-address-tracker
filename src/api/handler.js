import SweetModal from "../components/SweetModal";

const errorHandler = async (error) => {
  if (error.code)
    SweetModal("warning", "Warning", error.messages, "Accept");
};
 export default errorHandler;