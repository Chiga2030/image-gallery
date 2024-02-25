export const fetchImages = (limit: number) => {
  return fetch(`https://api.slingacademy.com/v1/sample-data/photos?limit=${limit}`, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(result => result.photos)
}
