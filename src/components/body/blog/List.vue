<template>
    <div class="m-4">

        <div class="d-flex justify-content-between align-items-center mb-3">

            <h2 class="h3 fw-bold m-0">Blog</h2>

            <router-link to="/blog/add" class="btn btn-success" v-text="'Yeni makale ekle'"/>

        </div>

        <table class="table table-bordered">

            <thead>
            <tr>
                <th scope="col" width="10">#</th>
                <th scope="col">Title</th>
                <th scope="col" width="200px">Created at</th>
                <th scope="col" width="30">View</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="(post, i) in postsList" :key="`post-${i}`">

                <th class="align-middle" scope="row">{{ post.id }}</th>

                <td class="align-middle">{{ post.cf_6099a2aea0d0960004268fd8 }}</td>

                <td class="align-middle">{{ post.cf_6099a52ca0d0960004269ca7 }}</td>

                <td class="align-middle">
                    <router-link :to="`/blog/${post.id}`" class="btn btn-light btn-sm rounded-circle">
                        <i class="bi bi-eye" aria-hidden="true"/>
                    </router-link>
                </td>

            </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
export default {
    name: "List",
    data() {
        return {
            postsList: []
        }
    },
    created() {
        this.getData()
    },
    methods: {
        async getData() {
            const {data} = await this.axios.get('http://localhost:3000/posts')
            this.postsList = data
        }
    }
}
</script>