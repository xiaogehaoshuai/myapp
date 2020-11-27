<template>
    <div id='nodeBox' class="content-body" slot="content">
        <div class="body-box">
            <vue-qr
                    :text="downloadData.url"
                    :margin="0"
                    colorDark="#000"
                    colorLight="#fff"
                    :logoSrc="downloadData.icon"
                    :logoScale="0.3"
                    :size="200"></vue-qr>
        </div>
        <img id='downImg' :src="dataurl" alt="">
    </div>
</template>

<script>
import html2canvas from 'html2canvas'
export default {
    name: "htmlCanvas",
    data(){
        return{
            dataurl:''
        }
    },
    methods:{
        //   截取图片
        setImage () {
            let that = this;
            var canvas2 = document.createElement("canvas");
            // let _canvas = document.getElementById('child');
            let _canvas = document.getElementById('nodeBox');
            var w = parseInt(window.getComputedStyle(_canvas).width);
            var h = parseInt(window.getComputedStyle(_canvas).height);
            //将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
            canvas2.width = w * 4;
            canvas2.height = h * 4;
            canvas2.style.width = w + "px";
            canvas2.style.height = h + "px";
            //可以按照自己的需求，对context的参数修改,translate指的是偏移量
            var context = canvas2.getContext("2d");
            context.scale(2, 2);
            html2canvas(document.getElementById('nodeBox'), {
                canvas: canvas2
            }).then(function (canvas) {
                var blob = that.getBlob(canvas);
                var oMyForm = new FormData();
                var fileName = "mobile" + '.jpg'
                oMyForm.append("file", blob, fileName);
                oMyForm.append("fileType", 'image');
                oMyForm.append("user_id", that)
            });
        },
        getBlob (canvas) { //获取blob对象
            var data = canvas.toDataURL("image/jpeg", 1);
            this.dataurl=data
            console.log(this.dataurl)
            data = data.split(',')[1];
            data = window.atob(data);
            var ia = new Uint8Array(data.length);
            for (var i = 0; i < data.length; i++) {
                ia[i] = data.charCodeAt(i);
            }
            return new Blob([ia], {
                type: "image/jpeg"
            });
        },
    }
}
</script>

<style scoped>

</style>
