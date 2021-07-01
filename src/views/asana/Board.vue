<template>
    <body-wrap/>
</template>

<script>

export default {
    name: 'Home',
    components: {
        BodyWrap: () => import('/src/components/body/asana/Wrap'),
    },
}
</script>