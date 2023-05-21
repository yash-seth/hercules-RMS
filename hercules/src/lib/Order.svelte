<script>
    import { createEventDispatcher } from 'svelte';
    export let name;
    export let id;
    export let completedOrder;
    export let orders;
    const dispatch = createEventDispatcher()
    function completeOrder() {
        alert(id + " order was completed")
        completedOrder = [...completedOrder, {name: name, id: id}]
        for(let i=0; i<orders.length; i++) {
            if(orders[i].id == id && orders[i].name == name) {
                orders.splice(i,1);
                break;
            }
        }
        dispatch('change', {orders: orders});
    }
</script>

<button on:click={completeOrder}>ID: {id}, Name: {name}</button>