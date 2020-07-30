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
            <div class="country__data__main__layer1"></div>
            <div class="country__data__main__layer2"></div>
          </div>
          <div class="country__data__border">
            Border Countries:
            <button
              v-for="(border, index) in countryData.borders"
              :key="index"
              class="border-btn"
            >
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
  margin: 8px 12px;
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
</style>
