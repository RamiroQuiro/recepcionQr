const mandarToast = (text) => {
  const toast = document.getElementById("toastEvento");
  toast.innerHTML += "<br/>" + text;
};
export { mandarToast };
