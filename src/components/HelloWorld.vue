<template>
  <div class="hello">
    <ul class="el-select-dropdown__list"></ul>
    <router-view ref="test"></router-view>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'HelloWorld',
    data(){
        return{
            list:[],
            textarea:'',
            isShowNewLead:0,
            open:true
        }
    },
    created() {
        console.log(process.env)
        this.getList1()
        this.getList()
    },
    mounted() {
        // eslint-disable-next-line no-unused-vars
        let ul=document.getElementsByClassName('el-select-dropdown__list')[0]
        let li = document.createElement('li');
        let xmText = document.createTextNode("nihao");
        li.appendChild(xmText);
        ul.appendChild(li);
    },
    methods:{
        getList1 () {
            return new Promise((resolve, reject) => {
                axios.get("http://localhost:8889" + '/j/subject_abstract?subject_id=' + '3346423').then(result => {
                    if(result.status===200){
                        console.log(result.data)
                        resolve(result.data)
                    }else {
                        reject()
                    }

                })
            })
        },
        getList () {
            const date = new Date()
            const time = date.getTime().toString()
            return new Promise((resolve, reject) => {
                axios.get(process.env.BASE_URL + 'problemData.json?t=' + time).then(result => {
                    if(result.status===200){
                        console.log(result.data)
                        const config = result.data
                        this.list=config
                        resolve(config)
                    }else {
                        reject()
                    }

                })
            })
        }
    }
}
</script>

<style lang="scss">
  .hello{
    &>ul:first-child{
      .el-input__count{
        bottom: -20px;
      }
      li::after{
        content: '\266c';
      }
    }
  }
  ul,li,p{
    padding: 0;
    margin: 0;
    list-style: none;
  }
</style>
