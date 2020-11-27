<template>
    <div class="EventDelegation">
        <ul @click="fn">
            <li v-for="(item,index) in list" :key="item.id" :data-id="index">{{item.name}}</li>
        </ul>
        <ul>
            <input v-focus/>
        </ul>
    </div>
</template>

<script>
export default {
    name: "EventDelegation",
    data(){
        return{
            list:[
                {id:1,name:'hjdfkhfk'},
                {id:2,name:'hjdfkhfk'},
                {id:3,name:'hjdfkhfk'},
                {id:4,name:'hjdfkhfk'},
                {id:5,name:'hjdfkhfk'},
                {id:6,name:'hjdfkhfk'},
                {id:7,name:'hjdfkhfk'},
                {id:8,name:'Niahk'},
                {id:9,name:'sdjfkzddf'}
            ]
        }
    },
    created() {

    },
    methods:{
        fn(e){
            console.log(e.target,e.target.getAttribute('data-id'))
            console.log(this.list[e.target.getAttribute('data-id')])
        }
    }
}
</script>

<style lang="scss">
.EventDelegation{
    ul{
        display: flex;
        justify-content: space-between;
        li{
            list-style: none;
            padding: 20px;
            background: blue;

        }
    }

}
</style>
