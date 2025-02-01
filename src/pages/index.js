import { useEffect, useState } from "react";
import { Red_Hat_Text } from "next/font/google";
import ProductList from "@/components/productList";
import ProductListHeader from "@/components/header";
import ProductListContainer from "@/components/productListContainer";
import ProductListItem from "@/components/product";
import CartContainer from "@/components/cart";

const redHatSans = Red_Hat_Text({
  variable: "--font-red-hat-sans",
  subsets: ["latin"],
});

export default function Home() {
  const [selected, setSelected] = useState(false);
  const [products, setProducts] = useState([]);

  const handleOnClick = () => {
    if (!selected) setSelected(true);
  };

  // useEffect(()=>{
  //   const 
  // }, [products])
  return (
    <main
      className={`${redHatSans.variable} product-list-wrapper py-16 px-32 bg-red-50 min-h-screen w-full box-border font-[family-name:var(--font-red-hat-sans)]`}
    >
      <ProductList>
        <ProductListHeader>Desserts</ProductListHeader>
        <ProductListContainer>
          <ProductListItem
            path={"/images/image-waffle-desktop.jpg"}
            name={"Waffle"}
            title={"Waffle with berries"}
            price={6.5}
            clickHandler={handleOnClick}
            itemState={selected}
          />
          <ProductListItem
            path={"/images/image-creme-brulee-desktop.jpg"}
            name={"Creme Brulee"}
            title={"Vanilla Bean Creme Brulee"}
            price={7.00}
            clickHandler={handleOnClick}
            itemState={selected}
          />
          <ProductListItem
            path={"/images/image-macaron-desktop.jpg"}
            name={"Macaron"}
            title={"Macaron Mix of Five"}
            price={8}
            clickHandler={handleOnClick}
            itemState={selected}
          />
          <ProductListItem
            path={"/images/image-tiramisu-desktop.jpg"}
            name={"Tiramisu"}
            title={"Classic Tiramisu"}
            price={5.50}
            clickHandler={handleOnClick}
            itemState={selected}
          />
          <ProductListItem
            path={"/images/image-baklava-desktop.jpg"}
            name={"Baklava"}
            title={"Pistachio Baklava"}
            price={4}
            clickHandler={handleOnClick}
            itemState={selected}
          />
          <ProductListItem
            path={"/images/image-meringue-desktop.jpg"}
            name={"Pie"}
            title={"Lemon Meringue Pie"}
            price={5}
            clickHandler={handleOnClick}
            itemState={selected}
          />
          <ProductListItem
            path={"/images/image-cake-desktop.jpg"}
            name={"Cake"}
            title={"Red Velvet Cake"}
            price={4.5}
            clickHandler={handleOnClick}
            itemState={selected}
          />
          <ProductListItem
            path={"/images/image-brownie-desktop.jpg"}
            name={"Brownie"}
            title={"Salted Caramel Brownie"}
            price={5.50}
            clickHandler={handleOnClick}
            itemState={selected}
          />
          <ProductListItem
            path={"/images/image-panna-cotta-desktop.jpg"}
            name={"Panna Cotta"}
            title={"Vanilla Pana Cota"}
            price={6.5}
            clickHandler={handleOnClick}
            itemState={selected}
          />
        </ProductListContainer>
      </ProductList>
      <CartContainer>

      </CartContainer>
    </main>
  );
}
