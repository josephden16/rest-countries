<template>
  <div class="detail">
    <Header></Header>
    <div class="detail-container">
      <div class="btn">
        <i class="fas fa-long-arrow-alt-left fa-2x" id="arrow"></i>
        <button @click="back" class="backBtn">Back</button>
      </div>
      <div class="country-detail">
        <div class="country__flag">
          <img class="country__flag__img" :src="countryData.flag" alt />
        </div>
        <div class="country__data">
          <div class="country__data__head">{{ countryData.name }}</div>
          <div class="country__data__main">
            <div class="country__data__main__layer1">
              <ul>
                <li>
                  <span class="bold">Native Name:</span>
                  {{ countryData.nativeName }}
                </li>
                <li>
                  <span class="bold">Popultation:</span>
                  {{ numberWithCommas(countryData.population) }}
                </li>
                <li>
                  <span class="bold">Region:</span>
                  {{ countryData.region }}
                </li>
                <li>
                  <span class="bold">Sub Region:</span>
                  {{ countryData.subregion }}
                </li>
                <li>
                  <span class="bold">Capital:</span>
                  {{ countryData.capital }}
                </li>
              </ul>
            </div>
            <div class="country__data__main__layer2">
              <ul>
                <li>
                  <span class="bold">Top Level Domain:</span>
                  <span>{{ " " + countryData.topLevelDomain.join(",") }}</span>
                </li>
                <li>
                  <span class="bold">Currencies:</span>
                  <span>{{" " + countryData.currencies[0].name }}</span>
                </li>
                <li>
                  <span class="bold">Languages:</span>
                  <span :key="index" v-for="(lang, index) in countryData.languages">
                    <span v-if="index < countryData.languages.length -1">{{ " " + lang.name + ", "}}</span>
                    <span v-else>{{ lang.name }}</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <span class="bold">Border Countries:</span>
          <div class="country__data__border">
            <button v-for="(border, index) in countryData.borders" :key="index" class="border-btn">
              <a :href="borderLink(index)">{{ border }}</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
export default {
  components: {
    Header
  },
  data() {
    return {
      countryName: "",
      countryData: null,
      allCountriesData: null
    };
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    borderLink(index) {
      let borderCode = this.countryData.borders[index];
      let name = "";
      for (let i = 0; i <= this.allCountriesData.length; i++) {
        if (this.allCountriesData[i].alpha3Code === borderCode) {
          name = this.allCountriesData[i].name;
          break;
        }
      }
      return `/country/${name}`;
    },
    numberWithCommas(x) {
      let parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }
  },
  mounted() {
    this.countryName = this.$route.params.name;
    fetch(`https://restcountries.eu/rest/v2/name/${this.countryName}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(jsonData => (this.countryData = jsonData[0]))
      .catch(err => console.log(err));
    fetch("https://restcountries.eu/rest/v2/all")
      .then(res => res.json())
      .then(jsonData => (this.allCountriesData = jsonData));
  }
};
</script>

<style lang="scss">
$veryLightGray: hsl(0, 0%, 98%);
$veryDarkBlue: hsl(200, 15%, 8%);
@font-face {
  font-family: NunitoSans;
  src: url("../assets/NunitoSans.ttf");
}
@font-face {
  font-family: NunitoSansLight;
  src: url("../assets/NunitoSans-Light.ttf");
}
@font-face {
  font-family: NunitoSansBold;
  src: url("../assets/NunitoSans-Bold.ttf");
}
.btn {
  margin-left: -28px;
}
.detail {
  background-color: $veryLightGray;
  font-family: NunitoSans;
  color: $veryDarkBlue;
}
.detail-container {
  margin: 45px;
}
.country-detail {
  margin-top: 65px;
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 35px;
  .country__flag {
    img {
      width: 95%;
      height: 400px;
    }
  }

  .country__data {
    &__head {
      font-family: NunitoSansBold;
      font-size: 1.6rem;
      font-weight: 700;
    }

    &__main {
      display: flex;
      flex-flow: row nowrap;
      &__layer1 {
        ul {
          list-style-type: none;
          padding: 0;
          margin-right: 52px;
          li {
            margin: 10px 0;
          }
        }
      }
      &__layer2 {
        ul {
          list-style-type: none;
          padding: 0;
          li {
            margin: 10px 0;
          }
        }
      }
    }
    &__border {
      margin: 2px;
      display: inline;
    }
  }
}
#arrow {
  position: relative;
  left: 58px;
  top: 7px;
  padding: 0;
  margin: 0;
}
.backBtn {
  background-color: #fff;
  border: none;
  width: 160px;
  padding: 12px 32px;
  padding-left: 42px;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.068);
  font-family: NunitoSansLight;
}
.border-btn {
  margin: 8px 5px;
  width: 120px;
  padding: 8px 0;
  background-color: #fff;
  outline: none;
  border: none;
  text-align: center;
  border-radius: 3px;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.068);
  cursor: pointer;
  a {
    text-decoration: none;
    color: $veryDarkBlue;
    padding: 8px 46px;
  }
}
.bold {
  font-family: NunitoSansBold;
}
@media screen and (max-width: 375px) {
  .detail-container {
    margin: 20px;
  }
  .country-detail {
    grid-template-columns: 100%;
    .country__flag {
      img {
        width: 95%;
        height: 150px;
      }
    }
    .country__data {
      &__main {
        display: flex;
        flex-flow: column nowrap;
        &__layer1 {
          ul {
            list-style-type: none;
            padding: 0;
            margin-right: 52px;
            li {
              margin: 10px 0;
            }
          }
        }
        &__layer2 {
          ul {
            list-style-type: none;
            padding: 0;
            li {
              margin: 10px 0;
            }
          }
        }
      }
      &__border {
        display: flex;
        flex-flow: row wrap;
        margin: 0;
        .border-btn {
          width: 100px;
          text-align: center;
          margin: 8px 8px 8px 0;
          a {
            padding: 8px 37px;
          }
        }
      }
    }
  }
}
</style>
