export default function ProductSkeleton({ type = "table", rows = 8 }) {
  if (type === "grid") {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-pulse">
        {[...Array(rows)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow overflow-hidden border"
          >
            {/* Image */}

            <div className="h-56 bg-gray-200" />

            {/* Content */}

            <div className="p-5 space-y-4">
              <div className="h-5 bg-gray-200 rounded w-3/4" />

              <div className="h-4 bg-gray-200 rounded w-1/2" />

              <div className="flex justify-between">
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-12" />
                  <div className="h-5 bg-gray-200 rounded w-20" />
                </div>

                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-12" />
                  <div className="h-5 bg-gray-200 rounded w-12" />
                </div>
              </div>

              <div className="h-2 bg-gray-200 rounded-full" />

              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((btn) => (
                  <div key={btn} className="h-10 bg-gray-200 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow border overflow-hidden animate-pulse">
      {/* Header */}

      <div className="p-5 border-b flex justify-between">
        <div className="space-y-2">
          <div className="h-6 w-40 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>

        <div className="h-5 w-20 bg-gray-200 rounded" />
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              {[
                "",
                "Image",
                "Product",
                "SKU",
                "Category",
                "Brand",
                "Price",
                "Stock",
                "Sales",
                "Rating",
                "Status",
                "Action",
              ].map((_, index) => (
                <th key={index} className="p-4">
                  <div className="h-4 bg-gray-200 rounded" />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {[...Array(rows)].map((_, row) => (
              <tr key={row} className="border-b">
                <td className="p-4">
                  <div className="w-5 h-5 rounded bg-gray-200" />
                </td>

                <td className="p-4">
                  <div className="w-16 h-16 rounded-lg bg-gray-200" />
                </td>

                <td className="p-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-40" />
                    <div className="h-3 bg-gray-200 rounded w-24" />
                  </div>
                </td>

                <td className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-20" />
                </td>

                <td className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-24" />
                </td>

                <td className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-20" />
                </td>

                <td className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-16" />
                </td>

                <td className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-12" />
                </td>

                <td className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-12" />
                </td>

                <td className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-10" />
                </td>

                <td className="p-4">
                  <div className="h-8 w-24 bg-gray-200 rounded-full" />
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    {[1, 2, 3].map((btn) => (
                      <div
                        key={btn}
                        className="w-9 h-9 bg-gray-200 rounded-lg"
                      />
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}

      <div className="p-4 border-t flex justify-between">
        <div className="h-4 bg-gray-200 rounded w-40" />

        <div className="flex gap-2">
          {[1, 2, 3].map((btn) => (
            <div key={btn} className="w-10 h-10 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
