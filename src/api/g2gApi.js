const defaultHeaders = {
  Accept: "application/json",
};

export async function fetchG2GOffers(apiUrl) {
  if (!apiUrl) {
    throw new Error("Missing API URL");
  }

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: defaultHeaders,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  const results = data?.payload?.results ?? [];

  return results.map((item) => ({
    offerId: item.offer_id,
    username: item.username,
    availableQty: item.available_qty,
    minQty: item.min_qty,
    reservedQty: item.reserved_qty,
    displayPrice: item.display_price,
  }));
}
