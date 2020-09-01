// 父子组件传参, data 的使用, prop的使用, 和 this.$set

<template>
  <div>
    <button @click="addPerson">Add one more person</button>
    <div>class:{{ name }}</div>
    <div v-for="(p, index) in classmates" :key="p.id">
      {{ `${index}.${p.name}` }}:{{ p.count }}{{ " -- " }}
      <button @click="add(index)">ADD</button>
      <button @click="del(index)">DEL</button>
    </div>
    <div>count:{{ count() }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "A1",
      classmates: [
        {
          id: 1,
          name: "A",
          count: 0,
        },
        {
          id: 2,
          name: "B",
          count: 0,
        },
        {
          id: 3,
          name: "C",
          count: 0,
        },
      ],
    };
  },
  // 计算属性
  // computed: {
  //   count() {
  //     return this.classmates.reduce((p, c) => {
  //       p = p + c.count;
  //       return p;
  //     }, 0);
  //   },
  // },
  methods: {
    count() {
      // 计算属性
      return this.classmates.reduce((p, c) => {
        p = p + c.count;
        return p;
      }, 0);
    },
    addPerson() {
      this.$set(this.classmates, 3, {
        id: 4,
        name: "D",
        count: 0,
      });
      // 下面 push 可直接代替上面的方法
      //   this.classmates.push({
      //   id: 4,
      //   name: "D",
      //   count: 0,
      // });
    },
    add(i) {
      this.classmates[i].count += 1;
    },
    del(i) {
      this.classmates[i].count -= 1;
    },
  },
};
</script>
