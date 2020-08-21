
<script>

    import { onMount } from 'svelte'

    import Divider from './Divider.svelte'

    let leftOpen
    let rightOpen
    let innerWidth
    let mpanes = 1
    let panes = [true, true, true]

    onMount(() => {

    })

    function handleDivider (divider) {

        const npanes = panes[0] + panes[1] + panes[2]

        if (panes[divider]) {
            panes[divider] = false
        }
        else {
            panes[divider] = true
        }

    }

</script>

<div class="container">

    { #if panes[0] }
        <div class="pane" >
            <slot name='a'></slot>
        </div>
    { /if }

    <div class="divider" on:click={() => handleDivider(0)} >
    </div>

    { #if panes[1] }
        <div class="pane middle">
            <slot name='b'></slot>
        </div>
    { /if }

    <div class="divider" on:click={() => handleDivider(1)} >
    </div>

    { #if panes[2] }
        <div class="pane">
            <slot name='c'></slot>
        </div>
    { /if }

</div>

<style>

    .container {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        overflow-x: hidden;
    }

    .pane {
        height: 100%;
        color: white;
     }

    .pane:first-child {
        width: 300px;
    }

    .middle {
        min-width: 400px;
        max-width: 400px;
    }

    .pane:last-child {
        width: 100%;
        min-width: 300px;
    }

    .divider {
        min-width: 20px;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        cursor: pointer;
        width: 20px;
    }

</style>