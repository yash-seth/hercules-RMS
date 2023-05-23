<script>
  import Order from "../../lib/Order.svelte";
    $: id = 0
    $: name=""
    let orders = []
    $: completedOrder = []
    function addOrder() {
        id += 1
        orders = [...orders, {name:name, id:id}]
        name = ""
    }
    function handleChange(e) {
        orders = e.detail.orders
    }
    function clearCompletedList() {
        completedOrder = []
    }
</script>

<div class="dashboard">
    <div class="order">
        <div class="create-order">
            <h3>Give Order</h3>
            <textarea bind:value={name}></textarea>
            <button id="add-order" on:click={addOrder}>Add Order</button>
        </div>
    </div>
    <div class="order-details">
        <div class="pending">
            <h3>Pending Orders</h3>
            {#each orders as order}
            <Order name={order.name} id={order.id} bind:completedOrder={completedOrder} orders={orders} on:change={handleChange}/>
            {/each}
        </div>
        <div class="completed">
            <div class="completed-list-controls">
                <h3>Completed Orders</h3>
                <button on:click={clearCompletedList}>Clear List</button>
            </div>
            <ul>
                {#each completedOrder as completed_order}
                <li><Order name={completed_order.name} id={completed_order.id}/></li>
                {/each}
            </ul>
        </div>
    </div>
</div>

<style>
    .dashboard {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
    }

    .order {
        margin: 20px;
        border: 1px black solid;
        padding: 10px;
        width: 400px;
        height: 200px;
    }
    
    .order-details {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        margin: 20px;
    }

    .pending, .completed {
        border: 1px black solid;
        margin: 4px;
        width: 400px;
        height: 100px;
        overflow-y: scroll;
    }

    .create-order {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #add-order {
        margin: 5px;
    }

    .completed-list-controls {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
</style>