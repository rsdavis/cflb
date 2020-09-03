
<script>

    import Icon from 'fa-svelte'
    import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight'
    import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft'

    export let open = true

</script>

<div class="divider" on:click={() => open = !open} >
    <div class="icon">
        { #if open }
            <Icon icon={faChevronLeft}/>
        { :else }
            <Icon icon={faChevronRight}/>
        { /if }
    </div>
</div>

<style>

    .divider {
        height: 100%;
        min-width: 20px;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        cursor: pointer;
        width: 20px;
        position: relative;
    }

    .icon {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        height: 1em;
        width: 1em;
        color: rgb(200,200,200);
    }



</style>