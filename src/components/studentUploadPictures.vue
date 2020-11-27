<template>
    <div class="studentUploadPictures">
        <ul class="fileinput-button">
            <span :class="cssStyle"> <i class="el-icon-plus"></i> ggjfgjfhj</span>
            <input type="file" title='' :id="qid+'x'" class="filepath" @change="uploadFile()" accept="image/jpg,image/jpeg,image/png,image/PNG">
        </ul>
    </div>
</template>

<script>
export default {
    name: 'studentUploadPictures',
    props: ['item', 'qid', 'upload', 'cssStyle'], // item-对象，qid-唯一值，upload-上传函数，cssStyle-样式
    methods: {
        uploadFile() {
            const file = document.getElementById(this.qid + 'x');
            if(['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'].indexOf(file.files[0].type) === -1) {
                return false
            }
            if (file.files && file.files[0]) {
                const reader = new FileReader();
                reader.onload = (evt) => {
                    // this.upload(objItem, evt.target.result, file.files[0].name)
                    this.upload(evt.target.result)
                    file.value = ''
                }
                reader.readAsDataURL(file.files[0]);
            }
        }
    }
}
</script>

<style lang="scss">
    .studentUploadPictures{
        .fileinput-button {
            position: relative;
            display: inline-block;
            overflow: hidden;
        }

        .fileinput-button input{
            position: absolute;
            left: 0px;
            top: 0px;
            opacity: 0;
            padding: 10px 20px;
            height: 36px;
            -ms-filter: 'alpha(opacity=0)';
        }
    }

</style>
