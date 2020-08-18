
<script>

    import ThreePane from './ThreePane.svelte'
    import UserList from './UserList.svelte'
    import Graph from './Graph.svelte'

</script>

<ThreePane>

    <section slot="a">
        <UserList/>
    </section>

    <section slot="b">
        Pane B
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