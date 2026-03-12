import { API_URL } from "../constants/config";

const defaultHeaders = {
  Accept: "application/json",
};

export async function fetchG2GOffers() {
  const response = await fetch(API_URL, {
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
