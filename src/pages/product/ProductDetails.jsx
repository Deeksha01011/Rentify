import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiconnector } from "../../Services/apiConnector";

// Components
import ProductGallery from "../../components/product/ProductGallery";
import ProductBasicInfo from "../../components/product/ProductBasicInfo";
import RentPricingBox from "../../components/product/RentPricingBox";
import RentalBreakdown from "../../components/product/RentalBreakDown";
import TrustBadges from "../../components/product/TrustBadge";
import SellerInfo from "../../components/product/SellerInfo";
import ReviewsSection from "../../components/product/ReviewsSection";
import QnASection from "../../components/product/QnASection";
import SimilarProducts from "../../components/product/SimilarProducts";
import CTAButtons from "../../components/product/CTAButtons";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [rentalSummary, setRentalSummary] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await apiconnector("GET", `/api/v1/items/${id}`).catch((err) => {
          console.error("API error:", err);
        });
        setProduct(res.data.item);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col gap-10">
      {/* Top Section: Gallery + Info + Pricing */}
      <div className="flex flex-col lg:flex-row gap-8">
        <ProductGallery images={product.images} />
        <div className="flex-1 flex flex-col gap-6">
          <ProductBasicInfo product={product} />
          <RentPricingBox
            product={product}
            setRentalSummary={setRentalSummary}
          />
          <RentalBreakdown summary={rentalSummary} />
          <CTAButtons product={product} summary={rentalSummary} />
        </div>
      </div>

      {/* Trust & Seller */}
      <TrustBadges />
      <SellerInfo seller={product.listedBy} />

      {/* Reviews & QnA */}
      <ReviewsSection productId={id} />
      <QnASection productId={id} />

      {/* Recommended / Similar Products */}
      <SimilarProducts category={product.category} currentId={product._id} />
    </div>
  );
};

export default ProductDetails;
