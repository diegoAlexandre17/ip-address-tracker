import Swal from "sweetalert2";

const types = ["error", "warning", "info", "success"];

/**
 *
 * @param {string} type
 * @param {string} title
 * @param {string} message
 * @param {string} buttonText
 * @param {function} actionAfter
 * @param {object} options
 * @returns A SweetAlert2 modal
 * @example import { SweetModal } from "@Intelli/utilities"
 * @example SweetModal("success", t("Success"), t("This is a success message"), t("Ok"), () => console.log("example"), {showCancelButton: true. cancelButtonText: t("Cancel")}})
 */

const SweetModal = (
  type,
  title,
  message,
  buttonText,
  actionAfter = () => {},
  options = {},
  closeButton
) => {
  if (!types.includes(type))
    return console.warn(`SweetModal: type must be one of ${types.join(", ")}`);

  let customClass = {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger mx-75",
  };

  return Swal.fire({
    title,
    text: message,
    icon: type,
    confirmButtonText: buttonText,
    showCloseButton: closeButton || false,
    customClass: options.customClass ?? customClass,
    buttonsStyling: false,
    reverseButtons: true,
    ...options,
  }).then(!!actionAfter ? actionAfter : () => {});
};

export default SweetModal;
