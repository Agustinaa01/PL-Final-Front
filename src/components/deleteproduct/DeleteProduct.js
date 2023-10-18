const DeleteProduct = {
  showWarning: (message, callback) => {
    if (window.confirm(message)) {
      callback(true);
    } else {
      callback(false);
    }
  },
};

export default DeleteProduct;
