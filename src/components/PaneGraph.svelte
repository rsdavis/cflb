
<script>

    import Graph from './graph.js'

    import store from '../store/store.js'
    import derived from '../store/derived.js'

    let ref = null
    let graph = null
    let width = 0
    let height = 0

    $: graph && graph._draw($derived.handles, $derived.items, width, height)

    function init (node) {

        graph = new Graph('graph', store.selectContest)

        if ('ResizeObserver' in window) {

            const observer = new ResizeObserver(entries => {

                for (const entry of entries) {
                    width = entry.borderBoxSize[0].inlineSize
                    height = entry.borderBoxSize[0].blockSize
                }

                if (graph) graph._draw($derived.handles, $derived.items, width, height)

            })

            observer.observe(node)

        }
        else {

            console.warn('ResizeObserver not available')
            const r = node.getBoundingClientRect()
            if (graph) graph._draw($derived.handles, $derived.items, r.width, r.height)

        }

    }



</script>

<!-- use container for ResizeObserver -->
<figure class='container' use:init>
    <svg id='graph' />
</figure>

<style>

    figure {
        display: block;
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
    }

    svg {
        display: block;
        width: 100%;
        height: 100%;
    }

</style>