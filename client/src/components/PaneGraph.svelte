
<script>

    import Graph from './graph.js'

    import store from '../store/store.js'
    import derived from '../store/derived.js'

    let graph = null
    let width = 0
    let height = 0
    let popover = null
    let left = 100
    let top = 100
    let closest = null

    $: graph && graph._draw($derived.items, width, height, $store.contest.id)

    function init (node) {

        graph = new Graph('graph', store.selectContest, onFocus)

        if ('ResizeObserver' in window) {

            const observer = new ResizeObserver(entries => {

                for (const entry of entries) {
                    if (entry.borderBoxSize && entry.borderBoxSize.length > 0) {
                        width = entry.borderBoxSize[0].inlineSize
                        height = entry.borderBoxSize[0].blockSize
                    }
                    else {
                        width = entry.contentRect.width
                        height = entry.contentRect.height
                    }
                }

                if (graph) graph._draw($derived.items, width, height)

            })

            observer.observe(node)

        }
        else {

            console.warn('ResizeObserver not available')
            const r = node.getBoundingClientRect()
            if (graph) graph._draw($derived.items, r.width, r.height)

        }

    }

    function onFocus(_) {
        closest = _
    }

</script>

<!-- use container for ResizeObserver -->
<figure class='container' use:init>
    <svg id='graph' />
    { #if closest }
        <div class='popover' bind:this={popover}>
            <p class='popover-item ellipsis'>{ closest.handle }</p>
            <p class='popover-item ellipsis'>{ closest.contestName }</p>
        </div>
    { /if }
</figure>

<style>

    figure {
        display: block;
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        position: relative;
    }

    svg {
        display: block;
        width: 100%;
        height: 100%;
    }

    .popover {
        position: absolute;
        color: white;
        top: 0;
        left: 0;
        background: rgb(70,70,70);
        border-radius: 5px;
        padding: 0.5em;
        margin: 0.5em;
        width: 20em;
    }

    .popover-item {
        margin: 0;
        padding: 0;
    }

</style>