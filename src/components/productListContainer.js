const ProductListContainer = ({ children }) => {
  return (
    <div className="my-5 min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-0 place-content-center lg:p-4">{children}</div>
  );
};

export default ProductListContainer;
