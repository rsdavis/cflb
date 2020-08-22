
<script>

    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    export let pos = 50

    let refs = {}
    let dragging = false

    function setPos (event) {

        console.log('setPos')

        const { top, bottom, left, right} = refs.container.getBoundingClientRect()

        const extents = [left, right]

        const px = event.clientX

        pos = 100 * (px - left) / (right - left)

    }

    function drag (node, callback) {
        console.log('attach drag functionality')

        const mousedown = event => {

            // check that left button was used
            if (event.button !== 0) return

            event.preventDefault()

            dragging = true

            const onmouseup = () => {

                dragging = false;
                window.removeEventListener('mousemove', callback, false)
                window.removeEventListener('mouseup', callback, false)

            }

            window.addEventListener('mousemove', callback, false)
            window.addEventListener('mouseup', onmouseup, false)

        }

        node.addEventListener('mousedown', mousedown, false)

        return {
            destroy () {
                node.removeEventListener('mousedown', onmousedown, false)
            }
        }

    }

</script>

<div class="container" bind:this={refs.container}>

    <div class="pane" style="width: {pos}%">
        <slot name="a"></slot>
    </div>

    <div class="pane" style="width: {100 - pos}%">
        <slot name="b"></slot>
    </div>

    <div class="divider" style="left: {pos}%" use:drag={setPos}></div>

</div>

<style>

    .container {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
     }

    .pane {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .divider {
        position: absolute;
        z-index: 10;
        height: 100%;
        cursor: ew-resize;
        border-left: 1px solid black;
    }

</style>