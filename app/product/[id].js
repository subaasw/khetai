import React from "react";
import { useLocalSearchParams } from "expo-router";
import ProductDetails from "../(components)/productDetails";
import { products } from "../../constants/data";

const ProductPage = () => {
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return null; // Or handle the error state
  }

  return <ProductDetails product={product} />;
};

export default ProductPage;
