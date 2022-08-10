<template>

    <div class ="alinLab" >
        <div class="container">
            <!-- <el-row :gutter="30">
                <el-col
                    v-for="item in menus"
                    :key="item.title"
                    :xs="24" :sm="24" :md="12" :lg="8" :xl="8"
                >
                    <div class="card">
                        <div class="face face1">
                            <div class="content">
                                <img :src="item.img" alt="picture">
                                <h3>{{item.title}}</h3>
                            </div>
                        </div>

                        <div class="face face2">
                            <div class="content">
                                <p>{{item.desc}}</p>
                                    <router-link :to="item.route">冲冲冲</router-link>
                            </div>
                        </div>
                    </div>
                </el-col>        
            </el-row>         -->
              <el-row :gutter="30">
                <el-col
                    v-for="item in menus"
                    :key="item.title"
                    :xs="24" :sm="24" :md="12" :lg="8" :xl="8"
                >
                    <div class="card">
                        <div class="face face1">
                            <div class="content">
                                <img :src="item.img" alt="picture">
                                <h3>{{item.title}}</h3>
                            </div>
                        </div>

                        <div class="face face2">
                            <div class="content">
                                <p>{{item.desc}}</p>
                                    <router-link :to="item.route">冲冲冲</router-link>
                            </div>
                        </div>
                    </div>
                </el-col>  
            </el-row>
        </div>


</div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import fileUploadImg from "src/assets/fileUpload.png"
    import dataBaseImg from "src/assets/dataBase.png"
    import DrugImg from "src/assets/drug.png"
    import URLImg from "src/assets/URL.png"
    // const fileUploadImg =ref("src/assets/fileUpload.png")

    const menus = ref([
        {
            "img":fileUploadImg,
            "title":"文件中转站",
            "desc":"提供一个文件中转的功能,可以在一个地方上传,在另外一个地方下载",
            "route":"/fileBroker"
        },
        {
            "img":dataBaseImg,
            "title":"数据生成器",
            "desc":"提供一个数据生成的功能,自定对应的字段和类型和对应的生成数据条数,生成对应的假数据",
            "route":"/dataFaker"
        },
        {
            "img":DrugImg,
            "title":"毒",
            "desc":"来喝点毒鸡汤吧",
            "route":"/drug"
        },
        {
            "img":URLImg,
            "title":"短链接平台",
            "desc":"将长链接生成对应的短链接",
            "route":"/third/shortUrl"
        },
    ])


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



    .container .card{
        position: relative;
        cursor: pointer;
        margin-left: 30px;
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
        /* margin: 15px 0 0; */
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

