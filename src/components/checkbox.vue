<template>
    <div class="checkbox">
        <ul>
            <li class="li-1">
                <span @click="fn('all')" :class="flags?'imgbg2':'imgbg1'"></span>
                <span>姓名</span>
            </li>
            <li class="li-2" style="position: relative">
                <div class="hover-down" @click.stop="isDown()">所属班级</div>
                <div class="select-down" v-if="isSHowDown">
                    <ul>
                        <li>全部班级</li>
                        <el-cascader-panel :options="options"></el-cascader-panel>
                    </ul>
                </div>
            </li>
            <li class="li-3">性别</li>
            <li class="li-4">学号</li>
            <li class="li-5">建立老师</li>
        </ul>
        <ul v-for="item in list" :key="item.id">
            <li class="li-1">
                <span @click="fn(item)" :class="item.flags?'imgbg2':'imgbg1'"></span>
                <span>shjdg\sghjgsfsfv</span>
            </li>
            <li class="li-2">班级</li>
            <li class="li-3">性别</li>
            <li class="li-4">jjjjjj</li>
            <li class="li-5">shjdg\</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "checkbox",
    data(){
        return{
            options: [
                {
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',


                    }, {
                        value: 'daohang',
                        label: '导航',
                    }]
                }
            ],
            isSHowDown:false,
            flags:false,
            list:[{
                name:'333',
                id:'1',
                flags:false
            },{
                name:'333',
                id:'2',
                flags:false
            },{
                name:'333',
                id:'3',
                flags:false
            }]
        }
    },
    // mounted() {
    //     document.addEventListener('click', () => {
    //         this.isSHowDown=false
    //     })
    // },
    // destroyed () {
    //     document.removeEventListener('click', ()=>{
    //
    //     })
    // },
    methods:{
        isDown(){
            this.isSHowDown=!this.isSHowDown
        },
        fn(val){
            if(val==='all'){
                this.flags=!this.flags
                if(this.flags){
                    this.list.forEach(val=>{
                        val.flags=true
                    })
                }else {
                    this.list.forEach(val=>{
                        val.flags=false
                    })
                }

            }else {
                val.flags=!val.flags
                let num=0
                this.list.forEach(val=>{
                    if(val.flags){
                        num++
                    }
                })
                if(num===this.list.length){
                    this.flags=true
                }else {
                    this.flags=false
                }
            }
        }
    }
}
</script>

<style lang="scss">
    .checkbox{
        width: 460px;
        &>ul{
            display: flex;
            height: 40px;
            align-items: center;
            &>li:first-child{
                display: flex;
                align-items: center;
                &>span:first-child{
                    display: inline-block;
                    margin: 0 8px;
                    width: 20px;
                    height: 20px;

                }
                &>span:last-child{
                    width: 75px;
                    display: inline-block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            &>li:not(:first-child):not(:last-child){
                /*overflow: hidden;*/
                /*text-overflow: ellipsis;*/
                /*white-space: nowrap;*/
            }
        }
        &>ul:nth-child(2n){
            background: #F3F3F3;
        }
        .select-down{
            position: absolute;background: red;  display: flex;

        }
        .li-1{
            width: 110px;
        }
        .li-2{
            width: 90px;
        }
        .li-3{
            width: 50px;
        }
        .li-4{
            width: 90px;
        }
        .li-5{
            width: 100px;
        }
        .imgbg1{
            background: url("../assets/icn_empty_normal_20.png") no-repeat;
        }
        .imgbg2{
            background: url("../assets/icn_checked.png") no-repeat;
        }
    }

</style>
