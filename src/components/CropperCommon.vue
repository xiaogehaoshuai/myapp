<template>
    <div class="CropperCommon">
                <vueCropper
                        ref="cropper"
                        :img="img"
                        :outputSize="option.size"
                        :outputType="option.outputType"
                        :info="true"
                        :full="option.full"
                        :canMove="option.canMove"
                        :canMoveBox="option.canMoveBox"
                        :original="option.original"
                        :autoCrop="option.autoCrop"
                        :autoCropWidth="option.autoCropWidth"
                        :autoCropHeight="option.autoCropHeight"
                        :fixedBox="option.fixedBox"
                        @realTime="realTime"
                ></vueCropper>
                <ul class="buttonFun">
                    <li @click="changeScale(1)"><img src="../assets/btn_+_normal.png"/></li>
                    <li @click="changeScale(-1)"><img src="../assets/btn_-_normal.png"/></li>
                    <li @click="rotateLeft()"><img src="../assets/btn_Rotate_normal.png"/></li>
                    <li @click="reset()"><img src="../assets/btn_Reset_normal.png"/></li>
                </ul>
            </div>
</template>

<script>
import { VueCropper }  from 'vue-cropper'
export default {
    name: "CropperCommon",
    props:{img:{type:String}},
    components: {
        VueCropper
    },
    data(){
        return{
            option: {
                canMove: false,
                info: true, // 裁剪框的大小信息
                outputSize: 0.8, // 裁剪生成图片的质量
                outputType: 'png', // 裁剪生成图片的格式
                canScale: false, // 图片是否允许滚轮缩放
                autoCrop: true, // 是否默认生成截图框
                autoCropWidth: 800, // 默认生成截图框宽度
                autoCropHeight: 300, // 默认生成截图框高度
                fixedBox: false, // 固定截图框大小 不允许改变
                fixed: false, // 是否开启截图框宽高固定比例
                fixedNumber: [1, 1], // 截图框的宽高比例
                full: false, // 是否输出原图比例的截图
                canMoveBox: true, // 截图框能否拖动
                original: false, // 上传图片按照原始比例渲染
                centerBox: true, // 截图框是否被限制在图片里面
                infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
                maxImgSize: 3000 // 图片最大像素
            },
        }
    },
    methods:{
        // 实时预览函数
        realTime() {
            this.$refs.cropper.getCropBlob( data => {   //把裁剪后的数据上传给后台
                this.url=window.URL.createObjectURL(data)
            })
        },
        // 放大缩小
        changeScale(num) {
            num = num || 1;
            this.$refs.cropper.changeScale(num);
        },

        // 左旋转
        rotateLeft() {
            this.$refs.cropper.rotateLeft();
        },

        // 重置
        reset() {
            this.$refs.cropper.reload()
            this.$refs.cropper.rotateClear()
        },
    }
}
</script>

<style lang="scss">
    .CropperCommon{
            width: 1080px;
            height: 560px;
            position: relative;
            .crop-point{
                width: 60px;
                height: 60px;
                border: 3px solid #FFFFFF;;
                background-color: rgba(0,0,0,0);
                border-radius: 0;
                opacity: 1;
            }
            .cropper-view-box{
                outline: 1px solid #ffffff;
                outline-color: #ffffff;
                user-select: none;
                opacity: 1;
            }
            .cropper-box{
                background: rgba(0,0,0,.8);
            }
            .point2,.point4,.point5,.point7{
                display: none;
            }
            .point1{
                border-right: none;
                border-bottom: none;
            }
            .point3{
                border-left: none;
                border-bottom: none;
            }
            .point6{
                bottom: -4px;
                border-right: none;
                border-top: none;
            }
            .point8{
                bottom: -4px;
                border-left: none;
                border-top: none;
            }
            .buttonFun{
                position: absolute;bottom: 21px;right: 10px;display: flex;
                li{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    margin: 0 12px;
                    background: #67c23a;
                }
            }
    }
</style>
