<template>
    <div>
            <span style="color: red;cursor: pointer" v-clipboard:copy="qrCodeConfig.text"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError">
                复制
            </span>

        <vue-qr  ref="Qrcode"
                 :text="fn(qrCodeConfig.text)"
                 :download="downloadImg"
                 :margin="10"
                 :size="100"
                 :correctLevel="3"
                 :colorDark="qrCodeConfig.colorDark"
        >
        </vue-qr>
        <input type="text" class="share-input"  style="opacity: 0" value="http://www.youtube.com" id="copy-content"/>
        <div @click="myCopy">44444</div>
    </div>

</template>
<script>
import vueQr from 'vue-qr'
export default {
    name:'QrCode',
    components: {
        vueQr
    },
    data(){
        return {
            qrCodeConfig: {
                text: "https://uos.smartedu.lenovo.com/v11/10001/2020/10/23/10001/7132d3c9d4244ca78039af4017c8d8df/3d44743a2c29414cb1756a1c2159766b.pptm?filename=pptm%E7%A8%BF.pptm",
                colorDark: '#663300',
            },
            downloadFilename:''
        }
    },
    methods: {
        fn(val){
            return val.split('?')[0]
        },
        myCopy(){
            console.log(this.qrCodeConfig.text.split('?'))
            var ele = document.getElementById("copy-content");
            ele.select();
            document.execCommand("Copy");
        },
        onCopy () {
            this.$message({
                message: `复制成功！`,
                type: 'success'
            });
            // this.snackBar.info(this.$t('prompt.copySuccess'))
        },
        onError () {
            this.$message.error(this.$t('prompt.copyFail'))
        },
        // 下载渠道二维码图片
        downloadImg (index, item) {
            var oQrcode = document.querySelectorAll('.channelQrcode img')
            var url = oQrcode[index].src
            var a = document.createElement('a')
            var event = new MouseEvent('click')
            // 下载图名字
            a.download = item.channel_name
            a.href = url
            // 合成函数，执行下载
            a.dispatchEvent(event)
        }
    }
}
</script>

