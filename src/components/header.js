
const ProductListHeader = ({ variant, children }) => {
  return <div className={`text-gray-900 flex items-center justify-between text-3xl font-bold ${variant}`}>{children}</div>;
};

export default ProductListHeader;
