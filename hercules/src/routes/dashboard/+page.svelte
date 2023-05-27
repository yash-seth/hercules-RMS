<script>
    // imports
  import Order from "../../lib/Order.svelte";
  import { goto } from '$app/navigation'
  import axios from 'axios'
  import { onMount } from 'svelte';

    $: id = 0
    $: name=""
    let orders = []
    $: completedOrder = []

	let username = "";

	onMount(async () => {
		username = history.state.username;
	});

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

    // logout user
    async function logout() {
      await axios.post("http://localhost:5000/user/logout", {
      "username":history.state.username,
    }) .then((res) => {
      if(!res.data.logout) {
        alert(res.data.msg)
      } else {
          goto("./");
      }
    }) .catch((err) => {
      console.log(err)
    })
    }
</script>

<div class="dashboard">
    <div id="header">Order Management Dashboard</div>
    <div class="dashboard-main">
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
    <div>
        <button id = "logoutBtn" on:click={logout}>Logout</button>
    </div>
</div>

<style>
    .dashboard {
        font-family: "Montserrat", sans-serif;
        display: flex;
        flex-direction: column;;
        justify-content: center;
        align-items: center;
        background: linear-gradient(
        to right,
        rgb(134, 239, 172),
        rgb(59, 130, 246),
        rgb(147, 51, 234)
        );
        height: 100vh;
        margin: 0px;
    }

    #header {
        font-size: 24px;
    }

    .order {
        background: white;
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
        background: white;
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

    .dashboard-main {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    #logoutBtn {
    appearance: none;
    background-color: #fafbfc;
    border: 1px solid rgba(27, 31, 35, 0.15);
    border-radius: 6px;
    box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0,
      rgba(255, 255, 255, 0.25) 0 1px 0 inset;
    box-sizing: border-box;
    color: #24292e;
    cursor: pointer;
    display: inline-block;
    font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
      sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    list-style: none;
    padding: 6px 16px;
    position: relative;
    transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    white-space: nowrap;
    word-wrap: break-word;
  }

  #logoutBtn:hover {
    background-color: #f3f4f6;
    text-decoration: none;
    transition-duration: 0.1s;
  }

  #logoutBtn:disabled {
    background-color: #fafbfc;
    border-color: rgba(27, 31, 35, 0.15);
    color: #959da5;
    cursor: default;
  }

  #logoutBtn:active {
    background-color: #edeff2;
    box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
    transition: none 0s;
  }

  #logoutBtn:focus {
    outline: 1px transparent;
  }

  #logoutBtn:before {
    display: none;
  }

  #logoutBtn:-webkit-details-marker {
    display: none;
  }
</style>