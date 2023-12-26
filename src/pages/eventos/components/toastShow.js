const mandarToast = ({text,time}) => {
  let tiempo=time?time:2500
    const toast = document.getElementById("toastEvento");
    toast.style.display = "flex";
    toast.innerHTML += text;
    setTimeout(()=>{
      toast.style.transition = "opacity 0.5s, transform 0.5s";
      toast.style.opacity = 0;
      toast.style.transform= "translatey(-50px)";
      setTimeout(() => {
        toast.style.display = "none";
      }, 500);
    },tiempo);
  }
export { mandarToast };
