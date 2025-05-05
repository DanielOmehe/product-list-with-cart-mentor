const ProductListContainer = ({ children }) => {
  return (
    <div className="my-5 min-h-screen grid grid-cols-3 gap-x-4 gap-y-8">{children}</div>
  );
};

export default ProductListContainer;
