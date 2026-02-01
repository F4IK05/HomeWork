const API_URL = 'https://www.foodrepo.org/api/v3/products';
const API_KEY = '03a53b62c2b6db493e48f14a2a208831';

export async function fetchMilkProducts() {
  const res = await fetch(`${API_URL}?query=milk`, {
    headers: {
      Authorization: `Token ${API_KEY}`,
    },
  });

  const data = await res.json();
  return data.data; // массив продуктов
}
