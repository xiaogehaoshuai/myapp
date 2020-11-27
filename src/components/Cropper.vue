
<template>
    <div id="merchantInformation">
        <div class="upData">
            <label class="btn btn-orange" for="uploads">上传LOGO</label>
            <input type="file" id="uploads" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImgg($event, 1)">
            <div class="line" >
                <div class="cropper-content" >
                    <div class="cropper">
                        <vueCropper
                                ref="cropper"
                                :img="option.img"
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
                                @imgLoad="imgLoad"
                        ></vueCropper>
                    </div>
                    <div class="buttonFun">
                        <ul @click="changeScale(1)">放大</ul>
                        <ul @click="changeScale(-1)">缩小</ul>
                        <ul @click="rotateLeft()">左旋转</ul>
                        <ul @click="rotateRight()">右旋转</ul>
                    </div>
<!--                    <div style="margin-left:20px;">-->
<!--                        <div class="show-preview" :style="{'width': '800px', 'height':'800px',  'overflow': 'hidden', 'margin': '5px'}">-->
<!--                            <div :style="previews.div" class="preview">-->
<!--                                <img :src="previews.url" :style="previews.img">-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
                </div>
            </div>
        </div>
        <div @click="AddImg">确定</div>
        <img :src="url"/>
    </div>
</template>

<script>
import { VueCropper }  from 'vue-cropper'
export default {
    name:'Cropper',
    data(){
        return{
            crap: false,
            url:'',
            previews: {},
            option: {
                img: '',
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
                centerBox: false, // 截图框是否被限制在图片里面
                infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
            },
            fileName:'',  //本机文件地址
            imgFile:'',
            imgurl:''
        }
    },
    components: {
        VueCropper
    },
    methods:{
        AddImg(){
            this.$refs.cropper.getCropBlob( data => {   //把裁剪后的数据上传给后台
                console.log(data)
                this.url=window.URL.createObjectURL(data)
            })
        },
        // 实时预览函数
        realTime(data) {
            this.previews = data
            console.log(this.previews)
            this.$refs.cropper.getCropBlob( data => {   //把裁剪后的数据上传给后台
                console.log(data)
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

        // 右旋转
        rotateRight() {
            this.$refs.cropper.rotateRight();
        },

        //选择本地图片
        uploadImgg(e, num) {
            console.log('uploadImg');
            var _this = this;
            //上传图片
            var file = e.target.files[0];
            _this.fileName = file.name;
            if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                this.$message({
                    message: '图片类型必须是.gif,jpeg,jpg,png,bmp中的一种',
                    type: 'warning'
                });
                return false
            }
            var reader = new FileReader();
            reader.onload =(e) => {
                let data;
                if (typeof e.target.result === 'object') {
                    // 把Array Buffer转化为blob 如果是base64不需要
                    data = window.URL.createObjectURL(new Blob([e.target.result]))
                }
                else {
                    data = e.target.result
                }
                if (num === 1) {
                    _this.option.img = data
                } else if (num === 2) {
                    _this.example2.img = data
                }
            }
            // 转化为base64
            // reader.readAsDataURL(file)
            // 转化为blob
            reader.readAsArrayBuffer(file);
        },
        imgLoad (msg) {
            console.log('imgLoad')
            console.log(msg)
        }
    }
}
</script>

<style lang="scss">
    .input_text .el-cascader .el-input .el-input__inner{width: 477px;height: 40px;border: 1px solid #f1f1f1;}
    .input_text .el-select .el-input .el-input__inner{width: 477px;height: 40px;border: 1px solid #f1f1f1;}
    #merchantInformation .upload-demo{display: flex;}
    #merchantInformation .upload-demo li{width: 100px;height: 113px;margin-top: 0px;display: inline-block;}
    #merchantInformation .el-date-editor.el-input, .el-date-editor .el-input__inner{width: 477px;height: 40px;}
    #merchantInformation .upload-demo .el-upload-list{display: none;}
</style>

<style lang="scss">
    #merchantInformation{
        height: 925px;width:100%;box-shadow: 0px 0px 1px #dfdddd;background:#fff;overflow: hidden;
    }
    .uploadingLogo{margin-right: 80px;}
    // .uploadingLogoa{margin-right: 70px;}
    .logoUrl{max-width: 300px;border-radius: 10px;}
    .propagandaUrl{width: 265px;height: 177px;}
    .amendd{position: absolute;right: 90px;top: 12px;cursor: pointer;display: flex;align-items: center;color: #1c8cfa;}
    .uploadImga{width: 100px;height: 90px;margin-top: 10px;}

    .perfect{color: #1c8cfa;font-size: 14px;display: flex;justify-content: center;flex-wrap:wrap;
        p{cursor: pointer;width: 100%;text-align: center;margin-top: 10px;}
    }
    .logo_I{width: 100px;height: 100px;}
    .UploadPictures_IMG{width: 120px;height: 100px;margin-left: 20px;}
    .hintsize{font-size: 12px;color: #343435;}
    .info {
        width: 720px;
        margin: 0 auto;
        .oper-dv {
            height:20px;
            text-align:right;
            margin-right:100px;
            a {
                font-weight: 500;
                &:last-child {
                    margin-left: 30px;
                }
            }
        }
        .info-item {
            margin-top: 15px;
            label {
                display: inline-block;
                width: 100px;
                text-align: right;
            }
            .sel-img-dv {
                position: relative;
                .sel-file {
                    position: absolute;
                    width: 90px;
                    height: 30px;
                    opacity: 0;
                    cursor: pointer;
                    z-index: 2;
                }
                .sel-btn {
                    position: absolute;
                    cursor: pointer;
                    z-index: 1;
                }
            }
        }
    }

    .cropper-content{
        display: flex;
        position: relative;
        .cropper{
            width: 1080px;
            height: 560px;
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
                background: #000000;
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
        }
        .buttonFun{
            position: absolute;bottom: 0;right: 0;display: flex;
            ul{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin: 0 12px;
                background: #67c23a;
            }
        }

        .show-preview{
            flex: 1;
            -webkit-flex: 1;
            display: flex;

            .preview{
                overflow: hidden;
                border-radius: 20px;
                border:1px solid #cccccc;
                background: #cccccc;
                margin-left: 40px;
            }
        }
    }
    .cropper-content .show-preview .preview {margin-left: 0;}
    .btn-orange{width: 100px;height: 40px;display: block;line-height: 40px;background: #1c8cfa;color: #fff;text-align: center;
        border-radius: 10px;margin-right: 30px;
    }
    .upData{display: flex;align-items: center;margin-top: 20px;

    }
    .line{margin-left: 21px;}

</style>
