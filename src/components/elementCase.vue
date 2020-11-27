<template>
    <div class="elementCase">
        <el-cascader
                :options="options"
                :show-all-levels="false"
                placeholder="请选择班级教师"
                filterable
                :props="{ multiple: true, checkStrictly: true }"
                clearable></el-cascader>
    </div>
</template>

<script>
export default {
    name: "elementCase",
    data(){
        return{
            options:[
                {
                    value: 'zhinan',
                    label: '指南',
                    children: [
                        {
                            value: 'shejiyuanze',
                            label: '设计原则',
                        }, {
                            value: '1',
                            label: 'tttt',
                        }, {
                            value: '2',
                            label: 'gfff',
                        }, {
                            value: '1',
                            label: 'rrrr',
                        }, {
                            value: '0',
                            label: 'gggg',
                        }]
                },
                {
                    value: '2',
                    label: 'qita',
                    children: [
                        {
                            value: 'shejiyuanze',
                            label: 'rtey',
                        }, {
                            value: '1',
                            label: 'thd',
                        }, {
                            value: '2',
                            label: 'hfgj',
                        }, {
                            value: '3',
                            label: 'dgh',
                        }, {
                            value: '0',
                            label: 'gggg',
                        }]
                }
            ]
        }
    }
}
</script>

<style lang="scss">
.elementCase{
    .el-cascader .el-input .el-input__inner{
        width: 800px;
    }
}
</style>
