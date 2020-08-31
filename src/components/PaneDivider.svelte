
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
        min-width: 20px;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        cursor: pointer;
        width: 20px;
        display: flex;
        justify-content: center;
        align-content: center;
    }

    .icon {
        width: 60%;
        color: rgb(200,200,200);
    }



</style>