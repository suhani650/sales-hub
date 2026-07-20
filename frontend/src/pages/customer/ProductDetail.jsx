import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  HiOutlineChevronLeft,
  HiOutlineTag,
  HiStar,
  HiOutlineStar,
} from "react-icons/hi2";
import { api } from "../../lib/api.js";
import GlassCard from "../../components/GlassCard.jsx";
import { useToast } from "../../context/ToastContext.jsx";

// Import Modular Sub-Components
import ProductGallery from "./components/ProductGallery.jsx";
import ProductInfo from "./components/ProductInfo.jsx";
import ProductReviews from "./components/ProductReviews.jsx";
import ReviewForm from "./components/ReviewForm.jsx";

export default function ProductDetail() {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  // Review Form States
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(null);
  const [comment, setComment] = useState("");

  // Scroll to top smoothly when slug changes (related product clicks)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedImageIdx(0);
    setQuantity(1);
  }, [slug]);

  // Fetch single product by slug
  const { data: product, isLoading, isError, refetch } = useQuery({
    queryKey: ["customer-product", slug],
    queryFn: () => api.get(`/customer/products/${slug}`).then((r) => r.data),
  });

  // Fetch related products (same category sub-slug)
  const categorySlug = product?.category?.slug;
  const { data: relatedData } = useQuery({
    queryKey: ["customer-related-products", categorySlug, product?.id],
    queryFn: () =>
      api
        .get("/customer/products", {
          params: {
            category: categorySlug,
            limit: 4,
          },
        })
        .then((r) => r.data),
    enabled: !!categorySlug,
  });

  // Add to Cart Mutation
  const addToCartMutation = useMutation({
    mutationFn: (payload) => api.post("/customer/cart", payload),
    onSuccess: () => {
      showToast(`${quantity} item(s) added to your cart.`, "success");
      queryClient.invalidateQueries(["customer-cart"]);
    },
    onError: (err) => {
      console.error("Cart error:", err);
      showToast(err.response?.data?.error || "Failed to add to cart.", "error");
    },
  });

  // Submit Review Mutation
  const submitReviewMutation = useMutation({
    mutationFn: (payload) =>
      api.post(`/customer/products/${product.id}/reviews`, payload),
    onSuccess: () => {
      showToast("Review submitted successfully!", "success");
      setComment("");
      setRating(5);
      refetch(); // Reload product and reviews metrics
    },
    onError: (err) => {
      console.error("Review error:", err);
      showToast(err.response?.data?.error || "Failed to submit review.", "error");
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-6 w-32 bg-white/5 animate-pulse rounded" />
        <div className="grid md:grid-cols-2 gap-8">
          <div className="h-[400px] bg-white/5 animate-pulse rounded-2xl" />
          <div className="space-y-4">
            <div className="h-8 w-2/3 bg-white/5 animate-pulse rounded" />
            <div className="h-6 w-1/3 bg-white/5 animate-pulse rounded" />
            <div className="h-24 w-full bg-white/5 animate-pulse rounded" />
            <div className="h-12 w-1/2 bg-white/5 animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="text-center py-20">
        <p className="text-rose-400 font-semibold text-lg">Product not found.</p>
        <Link to="/dashboard/shop" className="btn-primary mt-4 inline-flex items-center gap-2">
          <HiOutlineChevronLeft size={16} /> Back to Catalog
        </Link>
      </div>
    );
  }

  const hasDiscount = product.mrp && parseFloat(product.mrp) > parseFloat(product.price);
  const discountPercent = hasDiscount
    ? Math.round(
        ((parseFloat(product.mrp) - parseFloat(product.price)) / parseFloat(product.mrp)) * 100
      )
    : 0;

  // Filter out current product from related list
  const relatedProducts = (relatedData?.products || []).filter((p) => p.id !== product.id);

  // Dynamic reviews rating bars calculations
  const totalReviews = product.reviews?.length || 0;
  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = product.reviews?.filter((r) => r.rating === stars).length || 0;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { stars, count, percentage };
  });

  const handleAddToCart = () => {
    addToCartMutation.mutate({ productId: product.id, quantity });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      showToast("Please enter a comment for your review.", "warning");
      return;
    }
    submitReviewMutation.mutate({ rating, comment });
  };

  return (
    <div className="space-y-10">
      {/* Back button */}
      <div>
        <Link
          to="/dashboard/shop"
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-white transition-colors"
        >
          <HiOutlineChevronLeft size={14} /> Back to Catalog
        </Link>
      </div>

      {/* Main product card */}
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
        <ProductGallery
          product={product}
          selectedImageIdx={selectedImageIdx}
          setSelectedImageIdx={setSelectedImageIdx}
          hasDiscount={hasDiscount}
          discountPercent={discountPercent}
        />
        <ProductInfo
          product={product}
          quantity={quantity}
          setQuantity={setQuantity}
          onAddToCart={handleAddToCart}
          isAddingToCart={addToCartMutation.isLoading}
          hasDiscount={hasDiscount}
          discountPercent={discountPercent}
        />
      </div>

      {/* Tabs / detailed sections */}
      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 pt-6 border-t border-white/[0.06]">
        {/* Left 2 Cols: Details and Reviews write form */}
        <div className="lg:col-span-2 space-y-10">
          <div className="space-y-4">
            <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
              Description Details
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              This product is backed by standard vendor specifications. Developed under certified industrial designs to provide high performance and quality output. Features multi-layered coating, lightweight build architecture, and full safety compatibility parameters. Excellent choice for both daily essential use and commercial implementations.
            </p>
          </div>

          <ProductReviews reviews={product.reviews} totalReviews={totalReviews} />

          <ReviewForm
            rating={rating}
            setRating={setRating}
            hoverRating={hoverRating}
            setHoverRating={setHoverRating}
            comment={comment}
            setComment={setComment}
            onSubmit={handleReviewSubmit}
            isSubmitting={submitReviewMutation.isLoading}
          />
        </div>

        {/* Right 1 Col: Rating bars summary stats */}
        <div className="lg:col-span-1 space-y-6">
          <GlassCard tilt={false} className="p-6 space-y-4">
            <h3 className="font-display font-semibold text-sm text-white">Review Summary</h3>
            
            <div className="text-center py-4">
              <span className="text-4xl font-mono font-bold text-white">
                {parseFloat(product.ratingAvg).toFixed(1)}
              </span>
              <span className="text-muted text-xs">/5.0</span>
              <div className="flex justify-center text-amber my-1">
                {Array.from({ length: 5 }).map((_, i) => {
                  const filled = i < Math.round(parseFloat(product.ratingAvg));
                  return filled ? <HiStar key={i} size={16} /> : <HiOutlineStar key={i} size={16} className="text-white/10" />;
                })}
              </div>
              <p className="text-xs text-muted">{totalReviews} customer feedback scores</p>
            </div>

            {/* Distribution bars */}
            <div className="space-y-2">
              {ratingDistribution.map((dist) => (
                <div key={dist.stars} className="flex items-center gap-2 text-xs">
                  <span className="w-12 text-muted font-mono">{dist.stars} Stars</span>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo rounded-full"
                      style={{ width: `${dist.percentage}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-muted font-mono">{dist.count}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Related Products list */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-white/[0.06]">
          <div>
            <h2 className="font-display text-xl font-bold tracking-tight text-white">Related Products</h2>
            <p className="text-xs text-muted mt-1">Discover similar items in {product.category.name}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => {
              const relDiscount = p.mrp && parseFloat(p.mrp) > parseFloat(p.price);
              const relPct = relDiscount
                ? Math.round(((parseFloat(p.mrp) - parseFloat(p.price)) / parseFloat(p.mrp)) * 100)
                : 0;

              return (
                <motion.div
                  key={p.id}
                  whileHover={{ y: -5 }}
                  className="group flex flex-col justify-between h-80 relative cursor-pointer"
                >
                  <Link to={`/dashboard/products/${p.slug}`} className="h-full block">
                    <GlassCard className="p-4 flex flex-col justify-between h-full hover:border-indigo/35 transition-all duration-300">
                      <div className="space-y-3">
                        <div className="h-24 bg-white/[0.02] border border-white/[0.04] rounded-xl flex items-center justify-center text-muted group-hover:text-indigo-soft group-hover:bg-white/[0.04] transition-all relative overflow-hidden">
                          <HiOutlineTag size={28} />
                          {relDiscount && (
                            <span className="absolute top-2 right-2 text-[8px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 px-1.5 py-0.5 rounded">
                              -{relPct}% OFF
                            </span>
                          )}
                        </div>

                        <div className="space-y-0.5">
                          <h4 className="font-display font-semibold text-xs text-white group-hover:text-indigo-soft transition-colors line-clamp-1">
                            {p.name}
                          </h4>
                          <p className="text-[10px] text-muted line-clamp-2">
                            {p.description || "No description provided."}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/[0.05] flex items-center justify-between">
                        <span className="text-sm font-mono font-bold text-white">
                          ₹{parseFloat(p.price).toLocaleString("en-IN")}
                        </span>
                        {p.brand && (
                          <span className="text-[9px] text-muted truncate">
                            by {p.brand.name}
                          </span>
                        )}
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
