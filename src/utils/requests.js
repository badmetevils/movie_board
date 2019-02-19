export const url = `${process.env.API_URL}?s=avengers&apikey=${process.env.API_KEY}`;

export const fetchMovieLists = fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(Error('error'));
  })
  .catch(error => {
    return Promise.reject(Error(error.message));
  });
