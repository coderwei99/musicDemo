<template>
<div class="app-left">
    <itemTop></itemTop>
</div>
</template>

<script>
import itemTop from "./left-item/item-top";
export default {
  data() {
      return{}
  },
  components: {
      itemTop
  },
};
</script>

<style scoped>
.app-left{
    float: left;
    width: 16%;
    height: 82%;
    background: white;
    border-right: 1px solid gray;
}
</style>