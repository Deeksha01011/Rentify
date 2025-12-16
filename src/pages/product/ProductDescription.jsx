import { useParams } from "react-router-dom";
import allProducts from "../../data/products";

import ProductGallery from "../../components/product/ProductGallery";
import ProductBasicInfo from "../../components/product/ProductBasicInfo";
import RentPricingBox from "../../components/product/RentPricingBox";
import ReviewsSection from "../../components/product/ReviewsSection";
import SimilarProducts from "../../components/product/SimilarProducts";

const ProductDescription = () => {
  const { productId } = useParams();

  const product = allProducts.find(
    (item) => item.id === Number(productId)
  );

  if (!product) return <div>Product not found</div>;

  return (
    <div className="w-11/12 mx-auto py-10">

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <ProductGallery images={product.images || [product.image]} />

        <div className="lg:col-span-2">
          <ProductBasicInfo product={product} />
          <RentPricingBox product={product} />
        </div>
      </div>

      {/* BOTTOM SECTIONS */}
      <ReviewsSection productId={product.id} />
      <SimilarProducts category={product.category} />

    </div>
  );
};

export default ProductDescription;
