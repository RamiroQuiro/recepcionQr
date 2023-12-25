const mandarToast = (text) => {
    const toast = document.getElementById("toastEvento");
    toast.style.display = "flex";
    toast.innerHTML += "<br/>" + text;
    setTimeout(()=>{
        toast.style.display = "none";
    },2000);
  }
export { mandarToast };
