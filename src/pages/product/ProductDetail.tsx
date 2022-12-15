import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import repositories from "src/repositories";

const ProductDetail = () => {
  const { productId } = useParams();

  console.log("detail: ", productId);
  useEffect(() => {
    const apiGet = async () => {
      try {
        const res = await repositories.product.getOne(productId!);
        console.log("res: ", res);
      } catch (err) {
        console.log("err: ", err);
      }
    };

    apiGet();
  }, [productId]);

  return <div>ProductDetail</div>;
};

export default ProductDetail;
