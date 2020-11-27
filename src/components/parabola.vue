<template>
    <div class="parabola">
        <ul>
            <li v-for="item in list" :key="item.id" @click="fn(item)" :id="item.id">{{item.id}}</li>
        </ul>
        <ul id="hh">jjjj</ul>
        <ul id="div2">{{count}}</ul>
    </div>
</template>

<script>
export default {
    name: "parabola",
    data(){
        return {
            count:0,
            list:[{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11},{id:12},{id:13},{id:14},{id:15},{id:16},{id:17},{id:18},{id:19},{id:20}],
            oDiv3:''
        }
    },
    methods:{
        fn(item){
            this.count++
            let oDiv1 = document.getElementById(item.id)
            this.oDiv3=''
            // 获取目标元素
            let oDiv2 = document.getElementById("div2")
            this.oDiv3 = document.getElementById("hh")

            // 获取初始元素的位置
            let elX = oDiv1.getBoundingClientRect().left
            let elY = oDiv1.getBoundingClientRect().top
            // 获取初始元素到目标元素的偏移总量
            let diffX = oDiv2.getBoundingClientRect().left - oDiv1.getBoundingClientRect().left
            let diffY = oDiv2.getBoundingClientRect().top - oDiv1.getBoundingClientRect().top

            let a = diffY/(diffX * diffX)

            // 定义一个定时器，用来执行抛物线动画
            let timer = null;

            // 执行的时间
            let duration = 1000
            this.start(timer,duration,a,diffX,diffY,elX,elY,oDiv1)
        },
        start(timer,duration,a,diffX,diffY,elX,elY) {
            // 执行的开始时间
            let beginTime = new Date()
            // 结束的时间
            let endTime = +beginTime + duration
            // 定时器，执行抛物线动画
            this.timer = setInterval(() => {
                let now = new Date()
                this.step(now,endTime,diffX,diffY,beginTime,duration,elX,elY,timer,a);
            }, 13);
        },
        step(now,endTime,diffX,diffY,beginTime,duration,elX,elY,timer,a) {
            let x, y;
            if (now > endTime) {
                // 运行结束
                x = diffX;
                y = diffY;
                clearInterval(timer);
                //this.oDiv3.style.cssText = `position:absolute;left:0;top:0px`
            } else {
                // 计算每一步的X轴的位置
                x = diffX * ((now - beginTime) / duration);

                y = a * x * x
                this.oDiv3.style.cssText = `position:absolute;left:${elX + x}px;top:${elY + y}px`
            }

        }
    }
}
</script>
<style lang="scss">
  .parabola{
      ul:first-child{
          li{
              margin: 10px 0;
              background: #cccccc;
              color: red;
              width: 40px;
          }
      }
      ul:last-child{
          position: fixed;
          right: 20px;
          bottom: 20px;
          background: red;
      }
  }
</style>
