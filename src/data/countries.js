let countries = [];
fetch("https://restcountries.eu/rest/v2/all")
  .then(res => res.json())
  .then(jsonData => (countries = jsonData))
  .catch(err => {
    console.log(err);
  });
export default {
  countries
};
