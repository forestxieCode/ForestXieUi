<template>
    <div class="home">
        <router-link to="/form">1 from表单</router-link>
        <router-link to="/display">2 disply</router-link>
        <router-link to="/alert">3 alert</router-link>
        <router-link to="/table">4 table</router-link>
        <router-link to="/test">test</router-link>
    </div>
</template>
<script>
export default {
}
</script>
<style>
.home {
    width: 100%;
    display: flex;
    flex-direction: column;
}
a{
    margin-bottom: 20px;
}
</style>
