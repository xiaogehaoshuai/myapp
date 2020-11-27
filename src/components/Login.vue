
<template>
    <div>
        <svg-icon icon-class="paper_hand"/>
        <input type="file" id="file" name="file" multiple="multiple" @change="fileCountCheck(this,2,5)">
        <canvas id="canvasEmpty" style="display: none"></canvas>
        <div @click="rote">旋转</div>
        <canvas id="canvas" style="display: none"></canvas>

<!--        <img :src="url" style="width: 300px;height: 200px">-->
        <img :src="url1" style="width: 300px;">
        <viewer :images="fn(url1)" style="width: 300px">
            <img
                    style="width: 300px"
                    v-for="(src,index) in fn(url1)"
                    :src="src"
                    :key="index"
            >
        </viewer>
        <student-upload-pictures :upload="upload"></student-upload-pictures>
        <CropperCommon :img="url"></CropperCommon>
    </div>
</template>

<script>
import StudentUploadPictures from "./studentUploadPictures";
import CropperCommon from "./CropperCommon";
import {distinct} from "./distinct";
export default {
    name: "Login",
    components: {CropperCommon, StudentUploadPictures},
    data(){
        return{
            myImage:'',
            myImageEmpty:'',
            ctxEmpty:'',
            ctx:'',
            img:'',
            degree:0,
            scale:1,
            url:'',
            url1:'',
            photo:[]
        }
    },
    created() {
        // distinct.js

        let arr1 = Array.from(new Array(100000), (x, index)=>{
            return index
        })

        let arr2 = Array.from(new Array(50000), (x, index)=>{
            return index+index
        })

        let start = new Date().getTime()
        console.log('开始数组去重')

        console.log('去重后的长度', distinct(arr1, arr2).length)

        let end = new Date().getTime()
        console.log('耗时', end - start)
    },
    methods:{
        fn(url){
            return [url]
        },
        fileCountCheck(filesObj, minFileNum, maxFileNum) {

            // console.log(filesObj.files); // 文件对象
            console.log(window.File, window.FileList)
            if (window.File && window.FileList) {
                let a=document.getElementById('file').files
                console.log(a)
                var fileCount = a.length;

                if (fileCount < minFileNum || fileCount > maxFileNum) {

                    // 不符合数量的处理

                    return false;

                } else {

                    // 符合数量的处理
                    window.alert('符合规定');

                    return true;

                }

            } else {

                // 不支持FileAPI
                window.alert('抱歉，你的浏览器不支持FileAPI，请升级浏览器！');

                return false;

            }

        },
        upload(url){
            this.imgOnload(url)
        },
        imgOnload(url){
            this.myImage = document.getElementById("canvas");
            this.myImageEmpty=document.getElementById("canvasEmpty")
            this.ctxEmpty = this.myImageEmpty.getContext("2d");
            this.ctx = this.myImage.getContext("2d");
            let thisVue=this
            this.img = new Image();
            this.img.src = url
            this.img.onload = function () {
                if (thisVue.img.width >thisVue.img.height) {
                    thisVue.myImage.width=thisVue.img.width
                    thisVue.myImage.height=thisVue.img.width
                }else {
                    thisVue.myImage.width=thisVue.img.height
                    thisVue.myImage.height=thisVue.img.height
                }
                thisVue.ctx.drawImage(thisVue.img,thisVue.myImage.width / 2 - thisVue.img.width / 2,thisVue.myImage.height / 2 - thisVue.img.height / 2,thisVue.img.width,thisVue.img.height);
                thisVue.ctx.restore();
                thisVue.url = thisVue.myImage.toDataURL('image/png', 0.92)
                thisVue.removeBlanks(thisVue.ctx,thisVue.myImage, thisVue.url)
            };
        },
        rote(){
            this.degree += 90;
            this.degree %= 360;
            this.ctx.save();
            this.ctx.clearRect(0, 0, this.myImage.width, this.myImage.height);
            this.ctx.translate(this.myImage.width / 2, this.myImage.height / 2);
            this.ctx.rotate(this.degree / 180 * Math.PI);
            this.ctx.translate(-this.myImage.width / 2, -this.myImage.height / 2);
            this.ctx.drawImage(this.img,this.myImage.width / 2 - this.img.width / 2, this.myImage.height / 2 - this.img.height/ 2,this.img.width ,this.img.height);
            this.ctx.restore();
            this.url = this.myImage.toDataURL('image/png', 0.92)
            this.removeBlanks(this.ctx,this.myImage, this.url)
        },
        removeBlanks(context,canvas){
            if(this.degree===90||this.degree===270){
                this.myImageEmpty.width=this.img.height
                this.myImageEmpty.height=this.img.width
            }else {
                this.myImageEmpty.width=this.img.width
                this.myImageEmpty.height=this.img.height
            }
            let imgData = context.getImageData(0, 0, canvas.width, canvas.height).data;
            let lOffset = canvas.width, rOffset = 0,tOffset = canvas.height, bOffset = 0;
            for (var i = 0; i < canvas.width; i++) {
                for (var j = 0; j < canvas.height; j++) {
                    var pos = (i + canvas.width * j) * 4
                    if (imgData[pos] == 255 || imgData[pos + 1] == 255 || imgData[pos + 2] == 255 || imgData[pos + 3] == 255) {
                        bOffset = Math.max(j, bOffset); // 找到有色彩的最下端
                        rOffset = Math.max(i, rOffset); // 找到有色彩的最右端

                        tOffset = Math.min(j, tOffset); // 找到有色彩的最上端
                        lOffset = Math.min(i, lOffset); // 找到有色彩的最左端
                    }
                }
            }
            lOffset++;
            rOffset++;
            tOffset++;
            bOffset++;
            let data=context.getImageData(lOffset-1,tOffset-1,rOffset-lOffset,bOffset-tOffset)
            this.ctxEmpty.putImageData(data,0,0);
            this.url1 = this.myImageEmpty.toDataURL('image/png', 0.92)
        }
    }
}
</script>

<style>

</style>
