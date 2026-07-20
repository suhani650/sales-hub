const API_BASE = "/api/marketplace";

export async function fetchProducts({
  page = 1,
  limit = 12,
  q,
  categoryId,
  vendorId,
} = {}) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  if (q) params.set("q", q);
  if (categoryId) params.set("categoryId", String(categoryId));
  if (vendorId) params.set("vendorId", String(vendorId));

  const res = await fetch(`${API_BASE}/products?${params.toString()}`);
  if (!res.ok) throw new Error(`Fetch products failed: ${res.status}`);
  return res.json();
}

export async function fetchProduct(id) {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) throw new Error(`Fetch product failed: ${res.status}`);
  return res.json();
}

export async function fetchVendorProfile(id) {
  const res = await fetch(`${API_BASE}/vendors/${id}`);
  if (!res.ok) throw new Error(`Fetch vendor failed: ${res.status}`);
  return res.json();
}

export async function fetchVendorProducts(id, { page = 1, limit = 12 } = {}) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));

  const res = await fetch(
    `${API_BASE}/vendors/${id}/products?${params.toString()}`,
  );
  if (!res.ok) throw new Error(`Fetch vendor products failed: ${res.status}`);
  return res.json();
}
