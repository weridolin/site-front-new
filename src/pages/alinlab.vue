<template>

    <div class ="alinLab" >
        <div class="container">
            <div class="card">
                <div class="face face1">
                    <div class="content">
                        <img :src="fileUploadImg" alt="picture">
                        <h3>文件中转站</h3>
                    </div>
                </div>

                <div class="face face2">
                    <div class="content">
                        <p>提供一个文件中转的功能,可以在一个地方上传,在另外一个地方下载</p>
                            <router-link to="/fileBroker">冲冲冲</router-link>
                            <!-- <a href="#">冲冲冲</a> -->
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="face face1">
                    <div class="content">
                        <img :src="dataBaseImg" alt="picture">
                        <h3>数据生成器</h3>
                    </div>
                </div>
                <div class="face face2">
                    <div class="content">
                        <p>提供一个数据生成的功能,自定对应的字段和类型和对应的生成数据条数,生成对应的假数据</p>
                            <router-link to="/dataFaker">冲冲冲</router-link>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="face face1">
                    <div class="content">
                        <img :src="DrugImg" alt="picture">
                        <h3>毒</h3>
                    </div>
                </div>
                <div class="face face2">
                    <div class="content">
                        <p>来喝点毒鸡汤吧</p>
                            <router-link to="/drug">冲冲冲</router-link>
                    </div>
                </div>
            </div>
        </div>
    
</div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import fileUploadImg from "src/assets/fileUpload.png"
    import dataBaseImg from "src/assets/dataBase.png"
    import DrugImg from "src/assets/drug.png"
    // const fileUploadImg =ref("src/assets/fileUpload.png")

</script>

<!-- <style scoped>

</style>> -->
<style scoped>

    .alinLab {
        margin: 0 ;
        padding: 0 ;
        min-height: 100vh ;
        background: #333 ;
        display: flex ;
        justify-content: center ;
        align-items: center;
        font-family: consolas ;
    }

    .card {
        position: relative;
        display: block;
        margin-bottom: 0.75rem;
        background: #333;
        border-radius: 0.25rem;
        box-shadow: inset 0 0 0 0px rgba(0, 0, 0, 0.125);
    }

    @media screen and (min-width:1200px) {
        .container{
        width: 1000px;
        position: relative;
        display: flex;
        justify-content: space-between;
        }
    }

    @media screen and (max-width:768px) {
        .container{
        width: 1000px;
        position: relative;
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        align-items: center;
        }
    }

    .container .card{
        position: relative;
        cursor: pointer;
    }

    .container .card .face{
        width: 300px;
        height: 200px;
        transition: 0.5s;
    }

    .container .card .face.face1{
        position: relative;
        background: #333;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
        transform: translateY(100px);
    }

    .container .card:hover .face.face1{
        background: #ff0057;
        transform: translateY(0);
    }

    .container .card .face.face1 .content{
        opacity: 0.2;
        transition: 0.5s;
    }

    .container .card:hover .face.face1 .content{
        opacity: 1;
    }

    .container .card .face.face1 .content img{
        max-width: 100px;
    }

    .container .card .face.face1 .content h3 {
        margin: 10px 0 0;
        padding: 0;
        color: #fff;
        text-align: center;
        font-size: 1.5em;
    }

    .container .card .face.face2{
        position: relative;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
        transform: translateY(-100px);
    }

    .container .card:hover .face.face2{
        transform: translateY(0);
    }

    .container .card .face.face2 .content p{
        margin: 0;
        padding: 0;
    }

    .container .card .face.face2 .content a{
        margin: 15px 0 0;
        display:  inline-block;
        text-decoration: none;
        font-weight: 900;
        color: #333;
        padding: 5px;
        border: 1px solid #333;
    }

    .container .card .face.face2 .content a:hover{
        background: #333;
        color: #fff;
    }
</style>

