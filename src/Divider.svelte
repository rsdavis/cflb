
<script>

    export let direction = 'left'
    export let width = 20;
    export let onLeft = () => {}
    export let onRight = () => {}

    function handleClick () {
        if (direction === 'left') {
            onLeft()
            direction = 'right'
        }
        else {
            onRight()
            direction = 'left'
        }
    }

</script>

<div class="divider" on:click={handleClick} style="width: {width}px">

    { #if direction === 'left' }
        l
    { :else if direction === 'right' }
        r
    { /if }

</div>

<style>

    .divider {
        min-width: 20px;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        cursor: pointer;
    }

</style>