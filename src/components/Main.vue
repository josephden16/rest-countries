<template>
  <div class="main">
    <div class="search-filter">
      <div class="search">
        <input
          type="text"
          v-model="searchQuery"
          class="search-bar"
          placeholder="Search for a country..."
        />
      </div>

      <div class="filter">
        <div class="filter-selected" @mousedown="openDropDown">
          <span>{{ selectedFilterOption }}</span>
          <span>
            <i class="fas fa-angle-down angle-down-icon"></i>
          </span>
        </div>
        <div class="filter-options" v-if="dropdownOpen">
          <ul>
            <li
              v-for="(continent, index) in continents"
              :key="index"
              @mousedown="selectFilter(index)"
            >{{ continent }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="countries">
      <div class="country" v-for="(country, index) in countriesArr" :key="index">
        <div class="country__img">
          <router-link :to="url(country.name)">
            <img :src="country.flag" class="flag" :alt="country.name" />
          </router-link>
        </div>
        <div class="country__text-content">
          <p class="head">{{ country.name }}</p>
          <p class="details">
            <span class="bold">Population:</span>
            {{ numberWithCommas(country.population) }}
          </p>
          <p class="details">
            <span class="bold">Region:</span>
            {{ country.region }}
          </p>
          <p class="details">
            <span class="bold">Capital:</span>
            {{ country.capital }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      continents: [
        "Filter By Region",
        "Africa",
        "Americas",
        "Asia",
        "Europe",
        "Oceania"
      ],
      dropdownOpen: false,
      selectedFilter: "",
      selectedFilterOption: "Filter By Region",
      searchQuery: ""
    };
  },
  props: {
    countries: {
      type: Array,
      required: true
    }
  },
  methods: {
    openDropDown() {
      if (this.dropdownOpen === false) {
        this.dropdownOpen = true;
      } else {
        this.dropdownOpen = false;
        this.selectedFilter = "";
      }
    },
    selectFilter(index) {
      if (index === 0) {
        this.selectedFilter = "";
        this.selectedFilterOption = this.continents[index];
        this.dropdownOpen = false;
      } else {
        this.selectedFilter = this.continents[index];
        this.dropdownOpen = false;
        this.selectedFilterOption = this.continents[index];
      }
    },
    capitalize(value) {
      let textArray = value.split(" ");
      let capitalizedText = "";
      let conjunctions = ["the", "of", "a"];
      for (var i = 0; i < textArray.length; i++) {
        if (conjunctions.includes(textArray[i])) {
          continue;
        }
        capitalizedText +=
          textArray[i].charAt(0).toUpperCase() + textArray[i].slice(1) + " ";
      }
      return capitalizedText.trim();
    },
    numberWithCommas(x) {
      let parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
    url(country) {
      return "/country/" + country;
    }
  },
  computed: {
    countriesArr() {
      let arr = this.countries;
      if (this.searchQuery) {
        arr = arr.filter(
          count => count.name.indexOf(this.capitalize(this.searchQuery)) > -1
        );
        return arr;
      } else if (this.selectedFilter) {
        arr = arr.filter(count => count.region === this.selectedFilter);
        return arr;
      } else if (this.selectFilter && this.searchQuery) {
        arr = arr.filter(
          count =>
            count.region === this.selectedFilter &&
            count.name.indexOf(this.capitalize(this.searchQuery)) > -1
        );
      }
      return arr;
    }
  }
};
</script>

<style lang="scss">
$veryLightGray: hsl(0, 0%, 98%);
.main {
  margin: 0;
  padding: 0;
}

.search-filter {
  display: flex;
  flex-flow: column nowrap;
  margin: 38px 18px;
  .search {
    width: 90%;
    &-bar {
      border-radius: 6px;
      padding: 18px 12px;
      text-align: center;
      width: 99%;
      outline: none;
      box-shadow: -3px 2px 7px rgba(0, 0, 0, 0.078),
        3px 2px 7px rgba(0, 0, 0, 0.078);
      border: none;
      font-size: 15px;
      color: hsl(200, 15%, 8%);
      font-family: NunitoSans;
      background-image: url("../assets/icons8-search.svg");
      background-repeat: no-repeat;
      background-size: 22px;
      background-position-y: 16px;
      background-position-x: 12px;
    }
  }

  .filter {
    margin-top: 14px;

    .filter-selected {
      background-color: #fff;
      width: 140px;
      padding: 15px 18px;
      border-radius: 4px;
      font-size: 15px;
      cursor: pointer;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
    }

    .filter-options {
      background-color: #fff;
      width: 177px;
      margin-top: 12px;
      border-radius: 4px;
      font-size: 15px;
      position: fixed;
      ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
        li {
          padding: 6px 18px;
          &:last-child {
            padding-bottom: 12px;
          }
          transition: background 0.5s;
          cursor: pointer;

          &:hover {
            background-color: #eee;
          }
        }
      }
    }
  }
}

.countries {
  display: grid;
  grid-template-columns: 100%;
  margin: 40px 50px;
  gap: 28px;
  .country {
    background-color: #fff;
    border-radius: 6px;
    &__img {
      .flag {
        width: 100%;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
      }
    }

    &__text-content {
      font-weight: 300;
      margin: 18px 28px 38px 28px;
      font-size: 15px;
      .head {
        font-weight: bold;
        font-family: NunitoSansBold;
        font-size: 19px;
      }
    }
  }
}

.angle-down-icon {
  margin-left: 4px;
}

.bold {
  font-family: NunitoSansBold;
}

// media queries

@media screen and (min-width: 500px) {
  .countries {
    .country {
      width: 330px;
      margin: auto;
    }
  }
}

@media screen and (min-width: 720px) {
  .search-filter {
    .search {
      width: 65%;
    }
  }
  .countries {
    display: grid;
    grid-template-columns: 50% 50%;
    margin: 40px 0;
    gap: 0;
    .country {
      margin: 20px auto;
      width: 300px;
    }
  }
}

@media screen and (min-width: 995px) {
  .search-filter {
    .search {
      width: 60%;
      &-bar {
        text-align: left;
        padding-left: 80px;
      }
    }
  }
  .countries {
    display: grid;
    grid-template-columns: 33% 33% 33%;
    margin: 40px 0;
    gap: 0;
    .country {
      margin: 20px auto;
      width: 280px;
    }
  }
}
@media screen and (min-width: 1280px) {
  .main {
    margin: 0 40px;
  }
  .search-filter {
    flex-flow: row nowrap;
    justify-content: space-between;
    margin: 38px 0;
    .search {
      width: 30%;
      &-bar {
        text-align: left;
        padding-left: 80px;
      }
    }
    .filter {
      position: relative;
      top: -15px;
      right: 30px;
      .filter-selected {
        padding: 18px 18px;
      }
    }
  }
  .countries {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    margin: 40px auto;
    margin: 40px 0;
    gap: 0;
    .country {
      margin: 20px  0;
      margin-right: auto;
      width: 280px;
      // &:nth-of-type()
    }
  }
}
</style>
