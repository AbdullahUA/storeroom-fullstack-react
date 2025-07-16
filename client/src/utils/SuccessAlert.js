const SuccessAlert = (title) => {
  const alert = Swal.fire({
    icon: "success",
    title: title,
  });

  return alert
};


export default SuccessAlert