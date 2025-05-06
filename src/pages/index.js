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

  const confirmCartOrder = () => setConfirmOrder(true);
  const closeCartOrder = () => setConfirmOrder(false);

  const products = useProductStore((state) => state.products);
  console.log(products);
  
  const setProducts = useProductStore(({ setProducts }) => setProducts);
  const cartItems = useProductStore(( {cartItems} ) => cartItems);
  console.log(cartItems);
  
  const confirmOrder = useProductStore((state) => state.confirmOrder);

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
      className={`${redHatSans.variable} py-8 px-8 md:px-20 md:py-12 gap-8 relative product-list-wrapper py-16 lg:px-32 bg-red-50 min-h-screen items-center lg:items-start flex flex-col lg:flex-row justify-center w-full box-borderfont-[family-name:var(--font-red-hat-sans)]`}
    >
      <ProductList>
        <ProductListHeader>Desserts</ProductListHeader>
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
                // addToCart={() => addProductToCart(product, indx)}
                // cartItems={cartItems}
                // increaseProductQuantity={() => incrementItemQuantity(indx)}
                // decreaseProductQuantity={() => decrementItemQuantity(indx)}
              />
            );
          })}
        </ProductListContainer>
      </ProductList>
      <CartContainer>
        <ProductListHeader variant={"text-red-600"}>
          Your Cart (<>{cartItems.length}</>)
        </ProductListHeader>
        <>
          {cartItems.length > 0 ? (
            <CartBodySelected
              confirmOrder={confirmCartOrder}
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
          <OrderSummary
            // cartItems={cartItems}
            // orderState={closeCartOrder}
            // startNewOrder={startNewOrder}
          />
        ) : (
          ""
        )}
      </>
    </main>
  );
}
