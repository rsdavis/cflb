
<script>

    import ThreePane from './ThreePane.svelte'
    import UserList from './UserList.svelte'
    import UserInfo from './UserInfo.svelte'
    import Graph from './Graph.svelte'

</script>

<ThreePane>

    <section slot="a">
        <UserList/>
    </section>

    <section slot="b">
        <UserInfo/>
    </section>

    <section slot="c">
        <Graph/>
    </section>

</ThreePane>


<style>
    section {
        height: 100%;
    }
</style>