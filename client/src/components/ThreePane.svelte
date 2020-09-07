
<script>

    import PaneDivider from './PaneDivider.svelte'

    let paneA
    let paneB

</script>

<div class="container">

    { #if paneA }
        <div class="pane" >
            <slot name='a'></slot>
        </div>
    { /if }

    <PaneDivider bind:open={paneA} />

    { #if paneB }
        <div class="pane middle">
            <slot name='b'></slot>
        </div>
    { /if }

    <PaneDivider bind:open={paneB} />

    <div class="pane">
        <slot name='c'></slot>
    </div>

    <slot/>
</div>

<style>

    .container {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
    }

    .pane {
        height: 100%;
        color: white;
     }

    .pane:first-child {
        min-width: 300px;
        max-width: 300px;
    }

    .middle {
        min-width: 400px;
        max-width: 400px;
    }

    .pane:last-child {
        width: 100%;
        min-width: 300px;
    }

</style>