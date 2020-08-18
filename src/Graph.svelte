
<script>

    import { onMount } from 'svelte'
    import * as d3 from 'd3'

    import Graph from './graph.js'
    import user from './user.json'

    let ref = null
    let graph = null

    

    function init (node) {

        graph = new Graph('graph')

        if ('ResizeObserver' in window) {

            const observer = new ResizeObserver(entries => {

                for (const entry of entries) {
                    const width = entry.borderBoxSize[0].inlineSize
                    const height = entry.borderBoxSize[0].blockSize
                    graph.resize({ width, height })
                }

            })

            observer.observe(node)

        }
        else {

            console.warn('ResizeObserver not available')
            const { width, height } = node.getBoundingClientRect()
            graph.resize({ width, height })

        }

        graph.addUser(user)

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