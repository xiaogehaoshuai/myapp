<template>
    <div class="negative">
        <ul v-for="item in list" :key="item.id">
            {{name}}
        </ul>
    </div>
</template>

<script>
export default {
    name: "negative",
    data(){
        return{
            list:[{
                id:3,
                name:'hhhh'
            },{
                id:4,
                name:'hhhh'
            },{
                id:5,
                name:'hhhh'
            },{
                id:6,
                name:'hhhh'
            },{
                id:7,
                name:'hhhh'
            },{
                id:8,
                name:'hhhh'
            },{
                id:9,
                name:'hhhh'
            }]
        }
    }
}
</script>

<style lang="scss">
.negative{
    display: flex;
    width: 1000px;
    margin: 0 auto;
    ul{
        width: 340px;
        height: 190px;
    }
}
</style>
