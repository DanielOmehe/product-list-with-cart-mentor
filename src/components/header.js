
const ProductListHeader = ({ variant, children }) => {
  return <h1 className={`text-gray-900 text-3xl font-bold ${variant}`}>{children}</h1>;
};

export default ProductListHeader;
