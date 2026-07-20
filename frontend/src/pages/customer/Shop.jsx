import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineTag,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineChevronDown,
} from "react-icons/hi2";
import { api } from "../../lib/api.js";
import GlassCard from "../../components/GlassCard.jsx";
import SkeletonCard from "../../components/SkeletonCard.jsx";

// Import modular filters subcomponent
import ShopFilters from "./components/ShopFilters.jsx";

export default function Shop() {
  // Main API filter query states
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("newest");

  // Local inputs state for debouncing
  const [searchInput, setSearchInput] = useState("");
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");

  // Hybrid pagination/scroll states
  const [pageBlock, setPageBlock] = useState(1); // 1 block = up to 18 products
  const [subPage, setSubPage] = useState(1); // 1, 2, or 3 sub-pages (6 products each)
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [expandedParents, setExpandedParents] = useState({});

  // Debounce Search Input (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Debounce Min Price Input (400ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinPrice(minPriceInput);
    }, 400);
    return () => clearTimeout(timer);
  }, [minPriceInput]);

  // Debounce Max Price Input (400ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setMaxPrice(maxPriceInput);
    }, 400);
    return () => clearTimeout(timer);
  }, [maxPriceInput]);

  // Reset page block and subpage when filter variables change
  useEffect(() => {
    setPageBlock(1);
    setSubPage(1);
  }, [selectedCategory, search, minPrice, maxPrice, sort]);

  // Reset subpage when switching global Page Block
  useEffect(() => {
    setSubPage(1);
  }, [pageBlock]);

  // Scroll to top smoothly when page block or filters change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageBlock, selectedCategory, search, minPrice, maxPrice, sort]);

  // Fetch Categories
  const { data: categories = [] } = useQuery({
    queryKey: ["customer-categories"],
    queryFn: () => api.get("/customer/categories").then((r) => r.data),
  });

  // Target query page calculated from pageBlock & subPage (6 products per page)
  const apiPage = (pageBlock - 1) * 3 + subPage;

  // Products fetch query
  const { data: queryData, isFetching, isLoading, isError } = useQuery({
    queryKey: [
      "customer-products",
      selectedCategory,
      search,
      minPrice,
      maxPrice,
      sort,
      pageBlock,
      subPage,
    ],
    queryFn: () =>
      api
        .get("/customer/products", {
          params: {
            category: selectedCategory,
            search: search || undefined,
            minPrice: minPrice || undefined,
            maxPrice: maxPrice || undefined,
            sort,
            page: apiPage,
            limit: 6,
          },
        })
        .then((r) => r.data),
    keepPreviousData: true,
  });

  // Append freshly fetched products or reset on subPage 1
  useEffect(() => {
    if (queryData?.products) {
      setTotalItems(queryData.total);
      setLoadedProducts((prev) => {
        if (subPage === 1) {
          return queryData.products;
        }
        const existingIds = new Set(prev.map((p) => p.id));
        const filteredNew = queryData.products.filter((p) => !existingIds.has(p.id));
        return [...prev, ...filteredNew];
      });
    }
  }, [queryData, subPage]);

  // Intersection Observer for scroll loading
  const observerRef = useRef(null);
  const loadMoreRef = useCallback(
    (node) => {
      if (isFetching || isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // If we haven't hit the Page Block limit (18 products) and there is more data
          const totalLoaded = loadedProducts.length;
          if (subPage < 3 && totalLoaded < totalItems) {
            setSubPage((prev) => prev + 1);
          }
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetching, isLoading, subPage, loadedProducts.length, totalItems]
  );

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const toggleParent = (parentId) => {
    setExpandedParents((prev) => ({
      ...prev,
      [parentId]: !prev[parentId],
    }));
  };

  const handleCategorySelect = (catSlug) => {
    setSelectedCategory(catSlug);
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setMinPriceInput("");
    setMaxPriceInput("");
    setSelectedCategory("all");
    setSort("newest");
    setPageBlock(1);
  };

  // Calculate global pagination variables (18 items maximum per Page Block)
  const totalPageBlocks = Math.ceil(totalItems / 18);
  const hasFinishedBlock = subPage === 3 || loadedProducts.length >= totalItems || loadedProducts.length >= 18;

  const hasActiveFilters =
    selectedCategory !== "all" ||
    searchInput ||
    minPriceInput ||
    maxPriceInput ||
    sort !== "newest";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white">Shop Catalog</h1>
        <p className="text-sm text-muted mt-1">Browse, filter, and discover products</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-4 lg:gap-6 items-start">
        <ShopFilters
          categories={categories}
          expandedParents={expandedParents}
          toggleParent={toggleParent}
          selectedCategory={selectedCategory}
          handleCategorySelect={handleCategorySelect}
          minPriceInput={minPriceInput}
          setMinPriceInput={setMinPriceInput}
          maxPriceInput={maxPriceInput}
          setMaxPriceInput={setMaxPriceInput}
          handleClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
          showMobileFilters={showMobileFilters}
        />

        {/* Product Grid area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Horizontal Search & Sort Panel */}
          <GlassCard tilt={false} className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-muted font-medium">
              Showing <span className="text-white font-semibold">{loadedProducts.length}</span> of{" "}
              <span className="text-white font-semibold">{totalItems}</span> products
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              {/* Mobile Filters Toggle Button */}
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden flex items-center justify-center gap-2 px-4 py-2 border border-white/10 rounded-xl bg-panel2 text-xs text-muted hover:text-white hover:border-indigo/35 transition-all w-full sm:w-auto"
              >
                <HiOutlineAdjustmentsHorizontal size={16} className="text-indigo-soft" />
                <span>{showMobileFilters ? "Hide Filters" : "Filters"}</span>
              </button>

              {/* Search bar */}
              <div className="flex items-center gap-2 bg-panel2 border border-white/10 rounded-xl px-3 py-2 focus-within:border-indigo/50 transition-colors w-full sm:w-64">
                <HiOutlineMagnifyingGlass className="text-muted shrink-0" size={16} />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent w-full text-xs focus:outline-none text-white"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              {/* Sort selection */}
              <div className="w-full sm:w-auto">
                <select
                  className="bg-panel2 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none text-white cursor-pointer w-full"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="newest">Newest Releases</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="name_asc">Name: A to Z</option>
                  <option value="name_desc">Name: Z to A</option>
                </select>
              </div>
            </div>
          </GlassCard>

          {isLoading && loadedProducts.length === 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} className="h-80" />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <p className="text-rose-400 font-semibold">Failed to load products.</p>
            </div>
          ) : loadedProducts.length === 0 ? (
            <div className="text-center py-20 text-muted">
              <p className="text-sm">No products found matching your filter criteria.</p>
              <button
                onClick={handleClearFilters}
                className="btn-primary mt-4 inline-flex items-center"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              {/* Responsive Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {loadedProducts.map((p) => {
                  const hasDiscount = p.mrp && parseFloat(p.mrp) > parseFloat(p.price);
                  const discountPercent = hasDiscount
                    ? Math.round(
                        ((parseFloat(p.mrp) - parseFloat(p.price)) / parseFloat(p.mrp)) * 100
                      )
                    : 0;

                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group flex flex-col justify-between h-96 relative cursor-pointer"
                    >
                      <Link to={`/dashboard/products/${p.slug}`} className="h-full block">
                        <GlassCard className="p-5 flex flex-col justify-between h-full hover:border-indigo/35 transition-all duration-300">
                          <div className="space-y-4">
                            {/* Image Placeholder with category icon */}
                            <div className="h-32 bg-white/[0.02] border border-white/[0.04] rounded-xl flex items-center justify-center text-muted group-hover:text-indigo-soft group-hover:bg-white/[0.04] transition-all relative overflow-hidden">
                              {p.images && p.images.length > 0 ? (
                                <img
                                  src={p.images[0].url.startsWith("http") ? p.images[0].url : `http://localhost:5000${p.images[0].url}`}
                                  alt={p.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <HiOutlineTag size={36} />
                              )}
                              {hasDiscount && (
                                <span className="absolute top-2.5 right-2.5 text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded-md">
                                  -{discountPercent}% OFF
                                </span>
                              )}
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo/10 text-indigo-soft px-2 py-0.5 rounded">
                                  {p.category.name}
                                </span>
                                {p.brand && (
                                  <span className="text-[10px] font-medium text-muted">
                                    by {p.brand.name}
                                  </span>
                                )}
                              </div>
                              <h3 className="font-display font-semibold text-sm text-white group-hover:text-indigo-soft transition-colors line-clamp-1">
                                {p.name}
                              </h3>
                              <p className="text-xs text-muted line-clamp-2 mt-1">
                                {p.description || "No description provided."}
                              </p>
                            </div>
                          </div>

                          {/* Price footer */}
                          <div className="mt-4 pt-4 border-t border-white/[0.05] flex items-center justify-between">
                            <div>
                              <span className="text-lg font-mono font-bold text-white">
                                ₹{parseFloat(p.price).toLocaleString("en-IN")}
                              </span>
                              {hasDiscount && (
                                <span className="text-xs font-mono text-muted line-through ml-2">
                                  ₹{parseFloat(p.mrp).toLocaleString("en-IN")}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] font-mono text-muted">
                              SKU: {p.sku}
                            </span>
                          </div>
                        </GlassCard>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Scroll Trigger Target Node (only visible when we can auto-load more) */}
              {subPage < 3 && loadedProducts.length < totalItems && (
                <div
                  ref={loadMoreRef}
                  className="h-20 w-full flex items-center justify-center text-muted text-xs font-medium gap-2 pt-4"
                >
                  {isFetching ? (
                    <div className="w-6 h-6 border-2 border-indigo border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Scroll down to load more products...</span>
                  )}
                </div>
              )}

              {/* Global Page Block Pagination (Only visible when block limits are hit) */}
              {totalPageBlocks > 1 && hasFinishedBlock && (
                <div className="flex items-center justify-center gap-2 pt-10 border-t border-white/[0.04] mt-6">
                  <button
                    disabled={pageBlock === 1}
                    onClick={() => setPageBlock((p) => Math.max(1, p - 1))}
                    className="p-2 border border-white/10 rounded-xl bg-panel/50 hover:bg-panel text-muted hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <HiOutlineChevronLeft size={16} />
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPageBlocks }).map((_, idx) => {
                      const blockNum = idx + 1;
                      return (
                        <button
                          key={blockNum}
                          onClick={() => setPageBlock(blockNum)}
                          className={`w-9 h-9 rounded-xl text-xs font-semibold transition-all border ${
                            pageBlock === blockNum
                              ? "bg-indigo text-white border-indigo shadow-lg"
                              : "bg-panel/40 border-white/10 hover:bg-panel text-muted hover:text-white"
                          }`}
                        >
                          {blockNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    disabled={pageBlock === totalPageBlocks}
                    onClick={() => setPageBlock((p) => Math.min(totalPageBlocks, p + 1))}
                    className="p-2 border border-white/10 rounded-xl bg-panel/50 hover:bg-panel text-muted hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <HiOutlineChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
