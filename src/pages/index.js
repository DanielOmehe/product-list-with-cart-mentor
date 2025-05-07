import { useEffect, useState, useContext, createContext } from "react";
import { Red_Hat_Text } from "next/font/google";
import ProductList from "@/components/productList";
import ProductListHeader from "@/components/header";
import ProductListContainer from "@/components/productListContainer";
import ProductListItem from "@/components/product";
import CartContainer from "@/components/cart";
import OrderSummary from "@/components/orderSummary";
import { CartItem, CartBodyEmpty, CartBodySelected } from "@/components/cart";
import useProductStore from "@/hooks/useProductStore";

const redHatSans = Red_Hat_Text({
  variable: "--font-red-hat-sans",
  subsets: ["latin"],
});

export default function Home() {
  const [isDesktop, setIsDesktop] = useState(false);

  // const confirmCartOrder = () => setConfirmOrder(true);
  // const closeCartOrder = () => setConfirmOrder(false);

  const products = useProductStore((state) => state.products);
  
  const setProducts = useProductStore(({ setProducts }) => setProducts);
  const cartItems = useProductStore(( {cartItems} ) => cartItems);
  
  const confirmOrder = useProductStore((state) => state.confirmOrder);
  const toggleCart = useProductStore((state) => state.toggleCart)

  useEffect(() => {
    const fetchData = () => {
      fetch("/data.json")
        .then((res) => {
          if (!res.ok) throw new Error("Invalid Response");
          return res.json();
        })
        .then((data) => setProducts(data));
    };
    fetchData();

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize(); // Set initial image
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main
      className={`${redHatSans.variable} py-8 px-8 md:px-20 md:py-12 py-12 lg:px-24 gap-8 relative product-list-wrapper bg-red-50 min-h-screen items-center lg:items-start flex flex-col lg:flex-row justify-center w-full box-borderfont-[family-name:var(--font-red-hat-sans)]`}
    >
      <ProductList>
        <ProductListHeader>
          <h1>Desserts</h1>
          <button className="p-3 bg-white rounded block lg:hidden" onClick={()=>toggleCart(true)}>
            <img alt="cart-icon" src="/images/icon-add-to-cart.svg" />
          </button>
        </ProductListHeader>
        <ProductListContainer>
          {products.map((product, indx) => {
            return (
              <ProductListItem
                path={isDesktop ? `${product.image.desktop}` : `${product.image.mobile}`}
                name={product.category}
                title={product.name}
                price={product.price}
                key={indx.toString()}
                indx={indx}
              />
            );
          })}
        </ProductListContainer>
      </ProductList>
      <CartContainer>
        <ProductListHeader variant={"text-red-600 flex items-center justify-between"}>
          <h1>Your Cart (<>{cartItems.length}</>)</h1>
          <button className="p-3 bg-white rounded block lg:hidden" onClick={()=>toggleCart(false)}>
            <img src="/images/icon-remove-item.svg" alt="remove-icon" />
          </button>
        </ProductListHeader>
        <>
          {cartItems.length > 0 ? (
            <CartBodySelected
              confirmOrder={confirmOrder}
              cartItems={cartItems}
            >
              {cartItems.map((item, indx) => {
                return <CartItem item={item} key={indx.toString()} />;
              })}
            </CartBodySelected>
          ) : (
            <CartBodyEmpty />
          )}
        </>
      </CartContainer>
      <>
        {confirmOrder ? (
          <OrderSummary />
        ) : (
          ""
        )}
      </>
    </main>
  );
}
