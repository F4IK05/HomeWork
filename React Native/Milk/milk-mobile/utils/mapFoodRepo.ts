export function mapFoodRepoProduct(item: any) {
  return {
    id: item.id.toString(),
    title: item.name,
    description: item.ingredients_text || 'Natural dairy product',
    price: '$' + (Math.random() * 3 + 2).toFixed(2), // mock цена
    volume: '1L',
    image: { uri: item.image_url },
  };
}