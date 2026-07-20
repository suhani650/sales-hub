import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineAdjustmentsHorizontal, HiOutlineChevronDown } from "react-icons/hi2";
import GlassCard from "../../../components/GlassCard.jsx";

export default function ShopFilters({
  categories,
  expandedParents,
  toggleParent,
  selectedCategory,
  handleCategorySelect,
  minPriceInput,
  setMinPriceInput,
  maxPriceInput,
  setMaxPriceInput,
  handleClearFilters,
  hasActiveFilters,
  showMobileFilters,
}) {
  return (
    <div className={`lg:col-span-1 space-y-6 lg:sticky lg:top-6 ${showMobileFilters ? "block" : "hidden lg:block"}`}>
      <GlassCard tilt={false} className="p-6 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
          <span className="font-display font-semibold flex items-center gap-2 text-sm text-white">
            <HiOutlineAdjustmentsHorizontal size={18} className="text-indigo-soft" />
            Filters
          </span>
          <button
            onClick={handleClearFilters}
            disabled={!hasActiveFilters}
            className={`text-xs transition-colors ${
              hasActiveFilters
                ? "text-indigo-soft hover:text-white cursor-pointer"
                : "text-muted opacity-30 cursor-not-allowed"
            }`}
          >
            Clear all
          </button>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted uppercase tracking-wider">Categories</label>
          <div className="flex flex-col gap-1.5 max-h-80 overflow-y-auto pr-1">
            <button
              onClick={() => handleCategorySelect("all")}
              className={`text-left text-xs px-3 py-2 rounded-lg transition-colors w-full ${
                selectedCategory === "all"
                  ? "bg-indigo/15 text-indigo-soft border border-indigo/20 font-medium"
                  : "text-muted hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              All Categories
            </button>
            {categories.filter((c) => !c.parentId).map((parent) => {
              const subcats = categories.filter((c) => c.parentId === parent.id);
              const isExpanded = !!expandedParents[parent.id];
              return (
                <div key={parent.id} className="space-y-1">
                  <div className="flex items-center justify-between w-full group relative">
                    <button
                      onClick={() => handleCategorySelect(parent.slug)}
                      className={`text-left text-xs px-3 py-2 rounded-lg transition-colors flex-1 font-medium truncate pr-8 ${
                        selectedCategory === parent.slug
                          ? "bg-indigo/15 text-indigo-soft border border-indigo/20 font-semibold"
                          : "text-white/80 hover:text-white hover:bg-white/[0.02]"
                      }`}
                    >
                      {parent.name}
                    </button>

                    {subcats.length > 0 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleParent(parent.id);
                        }}
                        className="absolute right-2 p-1 text-muted hover:text-white rounded hover:bg-white/10 transition-colors"
                      >
                        <HiOutlineChevronDown
                          size={14}
                          className={`transform transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Nested subcategories with smooth Framer Motion height slide */}
                  <AnimatePresence initial={false}>
                    {isExpanded && subcats.length > 0 && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pl-3 flex flex-col gap-1 border-l border-white/5 ml-3.5 mt-0.5 pb-1">
                          {subcats.map((child) => (
                            <button
                              key={child.id}
                              onClick={() => handleCategorySelect(child.slug)}
                              className={`text-left text-[11px] px-2.5 py-1.5 rounded-md transition-colors w-full truncate ${
                                selectedCategory === child.slug
                                  ? "text-indigo-soft font-semibold bg-white/[0.02]"
                                  : "text-muted hover:text-white hover:bg-white/[0.01]"
                              }`}
                            >
                              {child.name}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Price Filter */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted uppercase tracking-wider">Price Range</label>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-panel2 border border-white/10 rounded-xl px-3 py-2 focus-within:border-indigo/50 transition-colors">
              <input
                type="number"
                placeholder="Min"
                className="bg-transparent w-full text-xs focus:outline-none text-white font-mono"
                value={minPriceInput}
                onChange={(e) => setMinPriceInput(e.target.value)}
              />
            </div>
            <div className="bg-panel2 border border-white/10 rounded-xl px-3 py-2 focus-within:border-indigo/50 transition-colors">
              <input
                type="number"
                placeholder="Max"
                className="bg-transparent w-full text-xs focus:outline-none text-white font-mono"
                value={maxPriceInput}
                onChange={(e) => setMaxPriceInput(e.target.value)}
              />
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
