
<template>
    <div id="cropper">
        <VueCropper ref="cropper"
                    :img='url'
                    :info=option.info
                    :outputSize=option.outputSize
                    :outputType=option.outputType
                    :canMove=option.canMove
                    :autoCrop=option.autoCrop
                    :autoCropWidth=option.autoCropWidth
                    :autoCropHeight=option.autoCropHeight
                    :fixedBox=option.fixedBox
                    :original=option.original
                    :infoTrue=option.infoTrue
                    :centerBox=option.centerBox
                    :canMoveBox=option.canMoveBox
                    :canScale=option.canScale
                    :fixed=option.fixed
                    :fixedNumber=option.fixedNumber
                    @realTime="realTime">
        </VueCropper>
        <a-button type="primary"
                  @click="chooseImg">选择图片</a-button>
        <input type="file"
               @change="getFile"
               accept="image/*"
               ref="imginput"
               id="img-input">
        <a-button type="primary"
                  @click="startCrop">保存截图</a-button>
        <a-button type="primary"
                  @click="scaleBigger">放大</a-button>
        <a-button type="primary"
                  @click="scaleSmaller">缩小</a-button>
        <a-button type="primary"
                  @click="rotateLeft">左旋转</a-button>
        <a-button type="primary"
                  @click="rotateRight">右旋转</a-button>
        <a-button type="primary"
                  @click="reload">重置大小</a-button>
        <a-button type="primary"
                  @click="rotateClear">重置旋转</a-button>
        <a-button type="primary"
                  @click="refresh">重置所有</a-button>
        <a-progress :percentage="percentage"
                    v-show="isShow"></a-progress>
        <!-- 预览图片 -->
        <div v-html="previewHTML"></div>
    </div>

</template>
<script>
import { VueCropper } from 'vue-cropper'

export default {
    name:'textCropper',
    data() {
        return {
            option: {
                outputSize: 1, // 裁剪生成图片的质量 0.1 - 1
                outputType: 'png', //	裁剪生成图片的格式 jpeg || png || webp
                canScale: true, // 图片是否允许滚轮缩放 默认true
                autoCrop: true, // 是否默认生成截图框 默认false
                canMove: true, //上传图片是否可以移动 默认true
                autoCropWidth: 200, //默认生成截图框宽度	容器的80%	0~max
                autoCropHeight: 200, //默认生成截图框高度	容器的80%	0~max
                // fixedBox: true, // 固定截图框大小 不允许改变	false	true | false
                fixed: true, //是否开启截图框宽高固定比例
                original: false, // 上传图片按照原始比例渲染	false	true | false
                infoTrue: false, // 为展示真实输出图片宽高 false 展示看到的截图框宽高	false	true | false
                centerBox: true, // 截图框是否被限制在图片里面	false	true | false
                canMoveBox: true, //截图框能否拖动	true	true | false
                fixedNumber: [1, 1] // 截图框的宽高比例 [宽度, 高度]
            },
            url: '',
            previewHTML: '',
            cropperSrc: '',
            param: {
                // 上传参数
                originalFilename: '',
                contentType: 'image/jpeg',
                cropImgPath: '', // 接口要求传入截图的图片路径格式为blob:http://192.168.0.109:8080/95dbc0cd-5624-4e11-8a45-b7a1a855020d
            },
            flag: true,
            percentage: 0,// 上传进度
            isShow: false
        }
    },
    components: {
        VueCropper
    },
    methods: {
        // 点击选择图片
        chooseImg() {
            this.$refs.imginput.click()
        },
        //保存截图
        startCrop() {
            // if (!this.flag) return false
            // this.flag = false
            // // 获取截图的base64 数据
            // this.$refs.cropper.getCropData(data => {
            //     this.cropperSrc = data;
            //     // base64数据转成图片(用了插件)
            //     base64ToPath(data)
            //         .then(path => {
            //             this.param.cropImgPath = path;
            //             console.log(path);
            //             // 上传到服务器
            //             this.upload(this.param);
            //         })
            //         .catch(error => {
            //             console.error(error)
            //         })
            // })
        },
        // 图片放大
        scaleBigger() {
            this.$refs.cropper.changeScale(1)
        },
        // 图片缩小
        scaleSmaller() {
            this.$refs.cropper.changeScale(-1)
        },
        // 图片左旋转90°
        rotateLeft() {
            this.$refs.cropper.rotateLeft()
        },
        // 图片右旋转90°
        rotateRight() {
            this.$refs.cropper.rotateRight()
        },
        // 重置大小
        reload() {
            this.$refs.cropper.reload()
        },
        // 重置旋转
        rotateClear() {
            this.$refs.cropper.rotateClear()
        },
        // 重置所有
        refresh() {
            // this.$refs.cropper.refresh() ;
            this.$refs.cropper.reload()
            this.$refs.cropper.rotateClear()
        },
        // 进度条展示
        showProgress(res) {
            this.$nextTick(() => {
                this.percentage = Math.floor(res.loaded / res.total * 100)
            })
        },
        // 图片上传
        upload() {
            this.isShow = true;
            // 具体请求不显示
            console.log('上传图片');
        },
        // input选择图片
        getFile(e) {
            var vm = this
            console.log(e);
            // let file = this.$refs.imginput.files[0]
            const file = e.target.files[0]
            if (!/image\/\w+/.test(file.type)) {
                this.$message({
                    message: '请选择图片',
                    type: 'warning'
                })
                // 清空input值
                this.$refs.imginput.value = ''
                return false
            }
            this.param.originalFilename = file.name
            // 创建文件读取对象
            var reader = new FileReader()
            reader.readAsDataURL(file)
            // 文件读取结束
            reader.onload = function () {
                // 此处this === reader
                vm.url = this.result;
                vm.previewUrl = this.result;
            }
        },
        // 图片预览
        realTime(data) {
            console.log(data);
            this.previewHTML = data.html;
        },
    }
}
</script>

<style lang="scss" scoped>
    #cropper {
        margin: 0 auto;
        height: 350px;
        width: 850px;

        .vue-cropper {
            width: 300px;
            height: 300px;
            margin: 0 auto;
            .cropper-crop-box {
                transform: translate3d(0px, 0px, 0px);
            }
        }
    }
    #img-input {
        display: none;
    }
</style>

