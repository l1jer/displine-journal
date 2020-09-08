<template>
  <div>
    <h1>LifeCycle</h1>
    <button @click="a = !a">切换A</button>
    <l-a v-if="a"></l-a>

    <br>

    <h1>LifeCycle & KeepAlive</h1>
    <button @click="ab = !ab">切换A</button>
    <keep-alive>
      <l-a v-if="ab"></l-a>
    </keep-alive>

    <p>⺌丨请打开console, 观察log丨⺌</p>
  </div>
</template>

<script>
import LifeCycle from "./components/LifeCycle";

export default {
  data() {
    return {
      a: true,
      ab: true
    };
  },
  components: {
    "l-a": LifeCycle
  }
};
</script>