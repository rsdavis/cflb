
<script>

    import ThreePane from './components/ThreePane.svelte'
    import PaneSearch from './components/PaneSearch.svelte'
    import PaneUsers from './components/PaneUsers.svelte'
    import PaneGraph from './components/PaneGraph.svelte'

</script>

<ThreePane>

    <section slot="a">
        <PaneSearch/>
    </section>

    <section slot="b">
        <PaneUsers/>
    </section>

    <section slot="c">
        <PaneGraph/>
    </section>

</ThreePane>


<style>
    section {
        height: 100%;
    }
</style>