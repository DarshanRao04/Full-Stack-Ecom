const API_URL = "http://localhost:4242";

export async function addToCart(product) {
  const response = await fetch(`${API_URL}/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Adding Product to Cart Failed");
  }

  return await response.json();
}

export async function getCart() {
  const response = await fetch(`${API_URL}/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return await response.json();
}

export async function updateQuantity(productID, quantity) {
  const response = await fetch(`${API_URL}/cart/update/quantity`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productID, quantity }),
  });

  if (!response.ok) {
    throw new Error("Updating Cart Quantity Failed");
  }

  return await response.json();
}

export async function removeFromCart(productID) {
  const response = await fetch(`${API_URL}/cart/product/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productID }),
  });

  if (!response.ok) {
    throw new Error("Deleting Product From Cart Failed");
  }

  return await response.json();
}

export async function demoAPi(params) {
  const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=REPLACE_ME",{
    method: "GET",
    
  })
  
}