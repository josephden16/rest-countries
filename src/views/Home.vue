<template>
  <div id="home">
    <Header></Header>
    <Main :countries="countries"></Main>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: NunitoSans;
  src: url("../assets/NunitoSans.ttf");
}
@font-face {
  font-family: NunitoSansBold;
  src: url("../assets/NunitoSans-Bold.ttf");
}
$veryDarkBlue: hsl(200, 15%, 8%);
$darkGray: hsl(0, 0%, 52%);
$veryLightGray: hsl(0, 0%, 98%);
$white: hsl(0, 0%, 100%);
#app {
  font-family: NunitoSans;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $veryDarkBlue;
}
</style>
<script>
import Header from "../components/Header";
import Main from "../components/Main";
export default {
  components: {
    Header,
    Main
  },
  data() {
    return {
      countries: []
    };
  },
  mounted() {
    fetch("https://restcountries.eu/rest/v2/all")
      .then(res => res.json())
      .then(jsonData => {
        this.countries = jsonData;
      })
      .catch(err => console.log(err));
  }
};
</script>
