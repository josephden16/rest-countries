<template>
  <div class="header">
    <div class="title">Where in the world?</div>
  </div>
</template>

<style lang="scss">
$veryLightGray: hsl(0, 0%, 98%);
$darkGray: hsl(0, 0%, 52%);
@font-face {
  font-family: NunitoSansBold;
  src: url("../assets/NunitoSans-Bold.ttf");
}
.header {
  display: flex;
  background-color: white;
  height: 50px;
  padding: 14px 0;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.068);
  .title {
    font-weight: bolder;
    font-size: 24px;
    margin: auto 0;
    margin-left: 42px;
    font-family: NunitoSansBold;
  }
}

@media screen and (max-width: 375px) {
  .header {
    .title {
      margin-left: 25px;
    }
  }
}
</style>
