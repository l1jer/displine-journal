<template>
  <div>
    <div class="title">Eight Queen</div>

    <div class="grid">
      <div class="row" v-for="(row, r_index) in grids" :key="r_index">
        S
        <div class="cell" v-for="cell in row" :key="cell.key_index">
          <div v-if="cell.ok">Q</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const grids = new Array(8).fill(1).map((_, r) => {
  return new Array(8).fill(1).map((_, c) => {
    return {
      key: `key-${r * 8 + c}`,
      ok: false,
    };
  });
});

// for & if 同时出现的话, 要么for包裹着if, 要么反过来.

export default {
  data() {
    return { grids };
  },
  // render() {
  //   return (
  //     <div>
  //       <div class="title">八皇后问题</div>
  //       <div class="grid">
  //         {this.grids.map((row, r_index) => {
  //           return (
  //             <div class="row" key={r_index}>
  //               {row.map((cell) => {
  //                 return (
  //                   <div class="cell" key={cell.key}>
  //                     {cell.ok && <div>Q</div>}
  //                   </div>
  //                 );
  //               })}
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  // },
};
</script>
