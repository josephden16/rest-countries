<template>
  <div class="main">
    <div class="search-filter">
      <div class="search">
        <i class="fas fa-search search-icon"></i>
        <input
          type="text"
          v-model="searchQuery"
          class="search"
          placeholder="Search for a country..."
        />
      </div>
      <div class="filter">
        <div class="filter-default" @mousedown="openDropDown">
          {{ selectedFilterOption }}
          <i class="fas fa-angle-down angle-down-icon"></i>
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
        <div class="image-content">
          <router-link :to="url(country.name)">
            <img :src="country.flag" class="flag" :alt="country.name" />
          </router-link>
        </div>
        <div class="text-content">
          <p class="head">{{ country.name }}</p>
          <p class="details">Population: {{ numberWithCommas(country.population) }}</p>
          <p class="details">Region: {{ country.region }}</p>
          <p class="details">Capital: {{ country.capital }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      continents: ["Filter By Region", "Africa", "Americas", "Asia", "Europe", "Oceania"],
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
  margin: 60px 30px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  .search {
    input[type="text"] {
      width: 400px;
      height: 37px;
      padding: 8px 20px;
      padding-left: 72px;
      border: none;
      font-size: 16px;
      font-family: NunitoSans;
      box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.078);
      border-radius: 4px;
      outline: none;
    }
  }
  .filter {
    font-weight: 300;
    font-size: 14px;
    .filter-default {
      background-color: white;
      border-radius: 5px;
      cursor: pointer;
      padding: 16px 70px 16px 14px;
    }

    .filter-options {
      background-color: white;
      margin-top: 5px;
      border-radius: 5px;
      z-index: 9999;
      position: fixed;
      ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
        li {
          cursor: pointer;
          margin: 0;
          padding: 8px 121px 8px 14px;

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
  grid-template-columns: 25% 25% 25% 25%;
  margin: 60px 30px;
  gap: auto;
}
.country {
  width: 280px;
  height: 380px;
  border-radius: 5px;
  background-color: #fff;
  margin: 0;
  margin-bottom: 52px;
  display: flex;
  flex-flow: column nowrap;
}

.image-content {
  border-radius: 5px;
  width: 100%;
  height: 200px;
  position: relative;
}

.flag {
  width: 100%;
  height: auto;
  padding: 0;
  margin: 0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.head {
  font-family: NunitoSansBold;
}
.details:first-child {
  margin-top: 24px;
}

.details {
  font-size: 14px;
}

.text-content {
  margin: 30px 22px;
}
.search-icon {
  position: relative;
  left: 50px;
}
.angle-down-icon {
  position: relative;
  left: 50px;
}
@media screen and (max-width: 375px) {
  .angle-down-icon {
    position: relative;
    left: 20px;
  }
  .search-filter {
    flex-flow: column nowrap;
  }
  .search-icon {
    position: relative;
    top: 0px;
    left: 32px;
  }
  .countries {
    display: grid;
    grid-template-columns: 100%;
    gap: 40px;
  }

  .country {
    width: 280px;
    height: 380px;
    border-radius: 5px;
    background-color: #fff;
    margin: auto;
    display: flex;
    flex-flow: column nowrap;
  }
  .search-filter {
    margin: 60px 10px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    .search {
      input[type="text"] {
        width: auto;
        height: 37px;
        padding: 8px 20px;
        padding-left: 52px;
      }
    }
    .filter {
      width: 145px;
      margin-top: 30px;
      margin-left: 16px;
      .filter-default {
        padding: 16px 12px;
        width: 140px;
      }
      .filter-options {
        ul {
          li {
            padding: 8px 91px 8px 14px;
          }
        }
      }
    }
  }
}
</style>
