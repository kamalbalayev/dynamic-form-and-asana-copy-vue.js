<template>
    <nav class="side-nav bg-dark h-100">

        <router-link to="/" class="list-group-item text-white">
            <h1 class="h3 text-white fw-bold p-3 m-0">Kamal.DEV</h1>
        </router-link>

        <div class="list-group list-group-flush">

            <router-link to="/tasks" active-class="active" class="list-group-item text-white">
                Task Management
            </router-link>

            <router-link to="/blog" active-class="active" class="list-group-item text-white">
                Blog
            </router-link>

        </div>

    </nav>
</template>

<script>
export default {
    name: "NavSide",
}
</script>

<style lang="scss">
.side-nav{
    .list-group-item{
        &:not(.active){
            background: transparent;
        }
    }
}
</style>