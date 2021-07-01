<template>
    <blog-form/>
</template>

<script>

export default {
    name: 'BlogForm',
    components: {
        blogForm: () => import('/src/components/body/blog/Form'),
    },
}
</script>