<template>
    <div class="m-5 p-4">
        <div class="p-3 text-center">
            <h1>ユーザーID ログイン</h1>
        </div>
        <div class="border border-secondary rounded p-3 mx-auto" style="width:30em">
            <form class="row g-3 needs-validation" novalidate>
            <div class="bg-danger bg-gradient text-white" v-if="loginFailed">
                入力内容に誤りがあります。<br/>
                ユーザIDとパスワードを入力しなおしてください。
            </div>
            <div>
                <label for="userIdForm" class="form-label">ユーザーID</label>
                <input class="form-control" v-model="userId" type="text" id="userIdForm" required>
            </div>
            <div>
                <label for="passwordForm" class="form-label">パスワード</label><br/>
                <input class="form-control" v-model="password" type="password" id="passwordForm" required>
            </div>
            <div class="text-center">
                <button class="btn btn-success" v-on:click="login">ログイン</button>
            </div>
            </form>
        </div>
        <div class="mt-5 text-center">
            <button class="btn btn-success w-50" v-on:click="signup">新規登録はこちらから</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default{
    name: 'LoginForm',
    data(){
        return {
            userId:"",
            password:"",
            loginFailed:false
        };
    },
    methods:{
        login(){
            let sendId=this.userId;
            let sendPass=this.password;
            const vue = this;//important
            const option={responseType: "blob"};
            axios.get('/index/login',{
                params:{
                    userId:sendId,
                    password:sendPass
                }
            },option).then(response=>{
                console.log(response.data);
                //response.data.then(str=>{vue.init(str);});
                vue.init(response.data);
            }).catch(err=>{
                alert("ログインエラーが発生しました");
                console.log(err);
            });
        },
        init(str){
            
            // let jlist=JSON.parse(str).companyMemo;
            // let name=JSON.parse(str).userName;
            let name = str.userName;
            let jlist = str.companyMemo;

            console.log(str);
            console.log(name);
            console.log(jlist);
            this.$store.dispatch("userLogin/saveUserId",this.userId);
            this.$store.dispatch("jobList/saveUserName",name);
            this.$store.dispatch("jobList/saveJList",jlist);
            let check=this.$store.getters["jobList/getUserName"];
            if(check==""){//認証失敗(ユーザ名の中身が空)
                this.loginFailed=true;
            }else{
                this.$store.dispatch("userLogin/changeIsLogged");
                this.$router.push({name:'HomeView'});
            }
        },
        signup(){
            this.$router.push({name:"SignUp"});
        }
    }
}
</script>
