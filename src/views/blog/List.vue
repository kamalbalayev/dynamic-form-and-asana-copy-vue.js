<template>
    <blog-list/>
</template>

<script>

export default {
    name: 'BlogList',
    components: {
        blogList: () => import('/src/components/body/blog/List'),
    },
}
</script>