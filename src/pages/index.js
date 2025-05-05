import { useEffect, useState } from "react";
import { Red_Hat_Text } from "next/font/google";
import ProductList from "@/components/productList";
import ProductListHeader from "@/components/header";
import ProductListContainer from "@/components/productListContainer";
import ProductListItem from "@/components/product";
import CartContainer from "@/components/cart";
import OrderSummary from "@/components/orderSummary";
import { CartItem, CartBodyEmpty, CartBodySelected } from "@/components/cart";

const redHatSans = Red_Hat_Text({
  variable: "--font-red-hat-sans",
  subsets: ["latin"],
});

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const confirmCartOrder = () => setConfirmOrder(true);
  const closeCartOrder = () => setConfirmOrder(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize(); // Set initial image
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startNewOrder = () => {
    setCartItems([]);
    setConfirmOrder(false);
  };

  const addProductToCart = (product, indx) => {
    setCartItems((prevCartItems) => {
      const newCartItems = [
        ...prevCartItems,
        {
          ...product,
          id: indx,
          quantity: 1,
          total_price: product.quantity + product.price,
        },
      ];

      return newCartItems;
    });
  };

  const incrementItemQuantity = (id) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementItemQuantity = (id) => {
    setCartItems((prevCartItems) =>
      prevCartItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

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
  }, []);

  return (
    <main
      className={`${redHatSans.variable} py-8 px-12 py-8 px-20 py-12 px-12 py-8 px-16 gap-8 relative product-list-wrapper py-16 px-32 bg-red-50 min-h-screen items-start flex justify-center w-full box-border 2xl:border-black 2xl:border-2 font-[family-name:var(--font-red-hat-sans)]`}
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
                addToCart={() => addProductToCart(product, indx)}
                cartItems={cartItems}
                increaseProductQuantity={() => incrementItemQuantity(indx)}
                decreaseProductQuantity={() => decrementItemQuantity(indx)}
              />
            );
          })}
        </ProductListContainer>
      </ProductList>
      <CartContainer cartItems={cartItems}>
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
            cartItems={cartItems}
            orderState={closeCartOrder}
            startNewOrder={startNewOrder}
          />
        ) : (
          ""
        )}
      </>
    </main>
  );
}
