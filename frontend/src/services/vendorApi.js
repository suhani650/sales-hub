import { api } from "./api";

export const vendorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Dashboard

    getVendorDashboard: builder.query({
      query: () => ({
        url: "/seller/dashboard",
        method: "GET",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Analytics"],
    }),

    // Products

    getCatalogMeta: builder.query({
      query: () => ({
        url: "/seller/products/meta/catalog",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Products"],
    }),

    getProducts: builder.query({
      query: (params) => ({
        url: "/seller/products",

        params,
      }),

      providesTags: ["Products"],
    }),

    createProduct: builder.mutation({
      query: (body) => ({
        url: "/seller/products",

        method: "POST",

        body,
      }),

      invalidatesTags: ["Products"],
    }),

    getProduct: builder.query({
      query: (id) => ({
        url: `/seller/products/${id}`,
      }),

      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/seller/products/${id}`,

        method: "PUT",

        body,
      }),

      invalidatesTags: (result, error, { id }) => [
        { type: "Products", id },
        "Products",
      ],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/seller/products/${id}`,

        method: "DELETE",
      }),

      invalidatesTags: ["Products"],
    }),

    // Orders

    getOrders: builder.query({
      query: () => ({
        url: "/seller/orders",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Orders"],
    }),

    getOrderAnalytics: builder.query({
      query: () => ({
        url: "/seller/orders/analytics",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Orders"],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/seller/orders/${id}/status`,

        method: "PUT",

        body: { status },
      }),

      invalidatesTags: ["Orders"],
    }),

    // Customers

    getCustomers: builder.query({
      query: () => ({
        url: "/seller/customers",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Customers"],
    }),

    getCustomerProfile: builder.query({
      query: (id) => ({
        url: `/seller/customers/${id}`,
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: (result, error, id) => [{ type: "Customers", id }],
    }),

    getCustomerAnalytics: builder.query({
      query: () => ({
        url: "/seller/customers/analytics",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Customers"],
    }),

    getCustomerSegments: builder.query({
      query: () => ({
        url: "/seller/customers/segments",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Customers"],
    }),

    getCoupons: builder.query({
      query: () => ({
        url: "/seller/coupons",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Marketing"],
    }),

    createCoupon: builder.mutation({
      query: (body) => ({
        url: "/seller/coupons",

        method: "POST",

        body,
      }),

      invalidatesTags: ["Marketing"],
    }),

    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/seller/coupons/${id}`,

        method: "DELETE",
      }),

      invalidatesTags: ["Marketing"],
    }),

    getActiveCoupons: builder.query({
      query: () => ({
        url: "/seller/coupons/active",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Marketing"],
    }),

    getCouponAnalytics: builder.query({
      query: () => ({
        url: "/seller/coupons/analytics",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Marketing"],
    }),

    // Finance

    getFinanceAnalytics: builder.query({
      query: () => ({
        url: "/seller/finance/analytics",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Finance"],
    }),

    getTransactions: builder.query({
      query: () => ({
        url: "/seller/finance/transactions",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Finance"],
    }),

    getPayouts: builder.query({
      query: () => ({
        url: "/seller/finance/payouts",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Finance"],
    }),

    getRefunds: builder.query({
      query: () => ({
        url: "/seller/finance/refunds",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Finance"],
    }),

    updateRefundStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/seller/finance/refunds/${id}/status`,
        method: "PATCH",
        body: { status },
      }),

      invalidatesTags: ["Finance"],
    }),

    getTaxReports: builder.query({
      query: () => ({
        url: "/seller/finance/tax-reports",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Finance"],
    }),

    // Vendor Profile (used for real bank account / GST details)

    getSellerProfile: builder.query({
      query: () => ({
        url: "/seller/profile",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Finance"],
    }),

    updateSellerProfile: builder.mutation({
      query: (body) => ({
        url: "/seller/profile",

        method: "PUT",

        body,
      }),

      transformResponse: (response) => response?.data ?? response,

      invalidatesTags: ["Finance"],
    }),

    updateBranding: builder.mutation({
      query: (body) => ({
        url: "/seller/profile/branding",

        method: "PUT",

        body,
      }),

      transformResponse: (response) => response?.data ?? response,

      invalidatesTags: ["Finance"],
    }),

    updatePolicies: builder.mutation({
      query: (body) => ({
        url: "/seller/profile/policies",

        method: "PUT",

        body,
      }),

      transformResponse: (response) => response?.data ?? response,

      invalidatesTags: ["Finance"],
    }),

    updateSEO: builder.mutation({
      query: (body) => ({
        url: "/seller/profile/seo",

        method: "PUT",

        body,
      }),

      transformResponse: (response) => response?.data ?? response,

      invalidatesTags: ["Finance"],
    }),

    // Analytics

    getMonthlyRevenue: builder.query({
      query: () => ({
        url: "/seller/analytics/revenue",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Analytics"],
    }),

    getTopProducts: builder.query({
      query: () => ({
        url: "/seller/analytics/products",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Analytics"],
    }),

    getConversionAnalytics: builder.query({
      query: () => ({
        url: "/seller/analytics/conversion",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Analytics"],
    }),

    // Inventory

    getInventoryAnalytics: builder.query({
      query: () => ({
        url: "/seller/inventory/analytics",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Inventory"],
    }),

    getLowStockItems: builder.query({
      query: () => ({
        url: "/seller/inventory/low-stock",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Inventory"],
    }),

    // Warehouses

    getWarehouses: builder.query({
      query: () => ({
        url: "/seller/warehouses",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Inventory"],
    }),

    getWarehouseAnalytics: builder.query({
      query: () => ({
        url: "/seller/warehouses/analytics",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Inventory"],
    }),

    createWarehouse: builder.mutation({
      query: (body) => ({
        url: "/seller/warehouses",

        method: "POST",

        body,
      }),

      invalidatesTags: ["Inventory"],
    }),

    updateWarehouse: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/seller/warehouses/${id}`,

        method: "PUT",

        body,
      }),

      invalidatesTags: ["Inventory"],
    }),

    deleteWarehouse: builder.mutation({
      query: (id) => ({
        url: `/seller/warehouses/${id}`,

        method: "DELETE",
      }),

      invalidatesTags: ["Inventory"],
    }),

    // Brands

    getBrands: builder.query({
      query: (params) => ({
        url: "/seller/brands",

        params,
      }),

      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: "Brands", id })),
              { type: "Brands", id: "LIST" },
            ]
          : [{ type: "Brands", id: "LIST" }],
    }),

    getBrandStats: builder.query({
      query: () => ({
        url: "/seller/brands/stats",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: [{ type: "Brands", id: "STATS" }],
    }),

    getBrand: builder.query({
      query: (id) => ({
        url: `/seller/brands/${id}`,
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: (result, error, id) => [{ type: "Brands", id }],
    }),

    createBrand: builder.mutation({
      query: (body) => ({
        url: "/seller/brands",

        method: "POST",

        body,
      }),

      invalidatesTags: [
        { type: "Brands", id: "LIST" },
        { type: "Brands", id: "STATS" },
      ],
    }),

    updateBrand: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/seller/brands/${id}`,

        method: "PUT",

        body,
      }),

      invalidatesTags: (result, error, { id }) => [
        { type: "Brands", id },
        { type: "Brands", id: "LIST" },
        { type: "Brands", id: "STATS" },
      ],
    }),

    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/seller/brands/${id}`,

        method: "DELETE",
      }),

      invalidatesTags: [
        { type: "Brands", id: "LIST" },
        { type: "Brands", id: "STATS" },
      ],
    }),

    // Categories

    getCategories: builder.query({
      query: (params) => ({
        url: "/seller/categories",

        params,
      }),

      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: "Categories", id })),
              { type: "Categories", id: "LIST" },
            ]
          : [{ type: "Categories", id: "LIST" }],
    }),

    getCategoryStats: builder.query({
      query: () => ({
        url: "/seller/categories/stats",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: [{ type: "Categories", id: "STATS" }],
    }),

    getCategory: builder.query({
      query: (id) => ({
        url: `/seller/categories/${id}`,
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: (result, error, id) => [{ type: "Categories", id }],
    }),

    createCategory: builder.mutation({
      query: (body) => ({
        url: "/seller/categories",

        method: "POST",

        body,
      }),

      invalidatesTags: [
        { type: "Categories", id: "LIST" },
        { type: "Categories", id: "STATS" },
      ],
    }),

    updateCategory: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/seller/categories/${id}`,

        method: "PUT",

        body,
      }),

      invalidatesTags: (result, error, { id }) => [
        { type: "Categories", id },
        { type: "Categories", id: "LIST" },
        { type: "Categories", id: "STATS" },
      ],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/seller/categories/${id}`,

        method: "DELETE",
      }),

      invalidatesTags: [
        { type: "Categories", id: "LIST" },
        { type: "Categories", id: "STATS" },
      ],
    }),

    // Shipment

    getShipments: builder.query({
      query: () => ({
        url: "/seller/shipments",
      }),

      providesTags: ["Orders"],
    }),

    // Returns

    getReturns: builder.query({
      query: () => ({
        url: "/seller/orders/returns",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Orders"],
    }),

    // Reviews

    getReviewAnalytics: builder.query({
      query: () => ({
        url: "/seller/reviews/analytics",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Reviews"],
    }),

    getReviewBreakdown: builder.query({
      query: () => ({
        url: "/seller/reviews/breakdown",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Reviews"],
    }),

    // Support

    getTickets: builder.query({
      query: () => ({
        url: "/seller/support",
      }),

      providesTags: ["Support"],
    }),

    createTicket: builder.mutation({
      query: (body) => ({
        url: "/seller/support",

        method: "POST",

        body,
      }),

      invalidatesTags: ["Support"],
    }),

    getTicket: builder.query({
      query: (id) => ({
        url: `/seller/support/${id}`,
      }),

      providesTags: (result, error, id) => [{ type: "Support", id }],
    }),

    updateTicketStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/seller/support/${id}/status`,

        method: "PUT",

        body: { status },
      }),

      invalidatesTags: (result, error, { id }) => [
        { type: "Support", id },
        "Support",
      ],
    }),

    deleteTicket: builder.mutation({
      query: (id) => ({
        url: `/seller/support/${id}`,

        method: "DELETE",
      }),

      invalidatesTags: ["Support"],
    }),

    getTicketAnalytics: builder.query({
      query: () => ({
        url: "/seller/support/analytics",
      }),

      providesTags: ["Support"],
    }),

    // Uploads

    uploadFile: builder.mutation({
      query: (formData) => ({
        url: "/seller/uploads/single",

        method: "POST",

        body: formData,
      }),

      transformResponse: (response) => response?.data ?? response,
    }),

    // Activity

    getActivities: builder.query({
      query: () => ({
        url: "/seller/activities",
      }),

      providesTags: ["Analytics"],
    }),

    // Marketing

    getCampaigns: builder.query({
      query: () => ({
        url: "/seller/marketing",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Marketing"],
    }),

    getMarketingOverview: builder.query({
      query: () => ({
        url: "/seller/marketing/overview",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Marketing"],
    }),

    createCampaign: builder.mutation({
      query: (body) => ({
        url: "/seller/marketing",

        method: "POST",

        body,
      }),

      invalidatesTags: ["Marketing"],
    }),

    getCampaign: builder.query({
      query: (id) => ({
        url: `/seller/marketing/${id}`,
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["Marketing"],
    }),

    updateCampaign: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/seller/marketing/${id}`,

        method: "PUT",

        body,
      }),

      invalidatesTags: ["Marketing"],
    }),

    deleteCampaign: builder.mutation({
      query: (id) => ({
        url: `/seller/marketing/${id}`,

        method: "DELETE",
      }),

      invalidatesTags: ["Marketing"],
    }),

    // Audience Segmentation

    getAudienceOverview: builder.query({
      query: () => ({
        url: "/seller/audience-segments/overview",
      }),

      transformResponse: (response) => response?.data ?? response,

      providesTags: ["AudienceSegments"],
    }),

    previewAudienceSegment: builder.mutation({
      query: (body) => ({
        url: "/seller/audience-segments/preview",

        method: "POST",

        body,
      }),

      transformResponse: (response) => response?.data ?? response,
    }),

    createAudienceSegment: builder.mutation({
      query: (body) => ({
        url: "/seller/audience-segments",

        method: "POST",

        body,
      }),

      invalidatesTags: ["AudienceSegments"],
    }),

    deleteAudienceSegment: builder.mutation({
      query: (id) => ({
        url: `/seller/audience-segments/${id}`,

        method: "DELETE",
      }),

      invalidatesTags: ["AudienceSegments"],
    }),
  }),
});

export const {
  useGetVendorDashboardQuery,

  useGetProductsQuery,

  useGetCatalogMetaQuery,

  useCreateProductMutation,

  useGetProductQuery,

  useUpdateProductMutation,

  useDeleteProductMutation,

  useGetOrdersQuery,

  useGetOrderAnalyticsQuery,

  useUpdateOrderStatusMutation,

  useGetCustomersQuery,
  useGetCustomerProfileQuery,

  useGetCustomerAnalyticsQuery,

  useGetCustomerSegmentsQuery,

  useGetActiveCouponsQuery,
  useGetCouponsQuery,
  useCreateCouponMutation,
  useDeleteCouponMutation,
  useGetCouponAnalyticsQuery,

  useGetMonthlyRevenueQuery,

  useGetTopProductsQuery,

  useGetConversionAnalyticsQuery,

  useGetInventoryAnalyticsQuery,

  useGetLowStockItemsQuery,

  useGetActivitiesQuery,

  useGetFinanceAnalyticsQuery,

  useGetTransactionsQuery,

  useGetPayoutsQuery,
  useGetRefundsQuery,
  useUpdateRefundStatusMutation,
  useGetTaxReportsQuery,

  useGetSellerProfileQuery,
  useUpdateSellerProfileMutation,
  useUpdateBrandingMutation,
  useUpdatePoliciesMutation,
  useUpdateSEOMutation,

  useGetShipmentsQuery,
  useGetReturnsQuery,
  useGetReviewAnalyticsQuery,
  useGetReviewBreakdownQuery,

  useGetTicketsQuery,

  useCreateTicketMutation,

  useGetTicketQuery,

  useUpdateTicketStatusMutation,

  useDeleteTicketMutation,

  useGetTicketAnalyticsQuery,

  useUploadFileMutation,

  useGetCampaignsQuery,
  useGetMarketingOverviewQuery,

  useCreateCampaignMutation,
  useGetCampaignQuery,
  useUpdateCampaignMutation,
  useDeleteCampaignMutation,

  useGetAudienceOverviewQuery,
  usePreviewAudienceSegmentMutation,
  useCreateAudienceSegmentMutation,
  useDeleteAudienceSegmentMutation,

  useGetWarehousesQuery,
  useGetWarehouseAnalyticsQuery,
  useCreateWarehouseMutation,
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation,

  useGetBrandsQuery,
  useGetBrandStatsQuery,
  useGetBrandQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,

  useGetCategoriesQuery,
  useGetCategoryStatsQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = vendorApi;
