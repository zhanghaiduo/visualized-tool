<template>
  <div class="FooterBox">
    <div class="FooterABox">
      <FooterA />
    </div>
    <div class="FooterABox">
      <FooterB />
    </div>
  </div>
</template>
<script>
import FooterA from "components/footer/A";
import FooterB from "components/footer/B";
export default {
  name: "Footer",
  components: {
    FooterA,
    FooterB
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss">
@import "styles/config.scss";
.FooterBox {
  width: 100%;
  .FooterABox {
    display: inline-block;
    width: 50%;
  }
}
</style>
