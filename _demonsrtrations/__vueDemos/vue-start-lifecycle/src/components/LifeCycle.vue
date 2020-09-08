<template>
  <div>
    LifeCycle A {{ test }}
    <input type="number" v-model="test" ref="input">
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  data() {
    return {
      test: 1
    };
  },
  computed: {
    bontest() {
      return this.test * 2;
    }
  },
  methods: {
    getOne() {}
  },
  beforeCreate() {
    console.group("=== 初始化 ===");
    console.log("--- beforeCreate ---");

    console.log(` [data:test] ${this.test} `);
    console.log(` [compute:bontest] ${this.bontest} `);
    console.log(` [method:getOne] ${this.getOne} `);
    console.log(` [ref:input] ${this.$refs.input} `);
    console.log(` [root] ${this.$root} `);
    console.log(` [parent] ${this.$parent} `);

    console.log(``);
  },
  created() {
    console.log("--- created ---");

    console.log(` [data:test] ${this.test} `);
    console.log(` [compute:bontest] ${this.bontest} `);
    console.log(` [method:getOne] ${this.getOne} `);
    console.log(` [ref:input] ${this.$refs.input} `);
    console.log(` [root] ${this.$root} `);
    console.log(` [parent] ${this.$parent} `);

    console.groupEnd();
  },
  beforeMount() {
    console.group("=== 挂载 ===");
    console.log("--- beforeMount ---");
    console.log(` [ref:input] ${this.$refs.input} `);
    console.log(` [root] ${this.$root} `);
    console.log(` [parent] ${this.$parent} `);
  },
  mounted() {
    console.log("--- mounted ---");
    console.log(` [ref:input] ${this.$refs.input} `);
    console.log(` [root] ${this.$root} `);
    console.log(` [parent] ${this.$parent} `);

    console.groupEnd();
  },
  beforeUpdate() {
    console.group("=== 模板更新 ===");

    console.log("--- beforeUpdate ---");

    console.log(` test: ${this.test} `);
  },
  updated() {
    console.log("--- updated ---");

    console.log(` test: ${this.test} `);

    console.groupEnd();
  },
  activated() {
    console.group("=== keepAlive 激活 ===");
    console.log("--- activated ---");
  },
  deactivated() {
    console.log("--- deactivated ---");
    console.groupEnd();
  },
  beforeDestroy() {
    console.group("=== 销毁 ===");
    console.log("--- beforeDestory ---");
  },
  destroyed() {
    console.log("--- destoryed ---");

    console.groupEnd();
  }
};
</script>