<script>
  import { goto } from "$app/navigation";
  import axios from 'axios'
  $: authState = "None";
  $: username = ""
  $: pwd = ""

  async function login() {
    await axios.post("http://localhost:5000/user/login", {
      "username":username,
      "pwd":pwd
    }) .then((res) => {
      if(res.data.login) {
        goto("./dashboard", {state: {username: username}})
      }
      else {
        alert(res.data.msg)
      }
    }) .catch((err) => {
      console.log(err)
    })
  }

  async function register() {
    await axios.post("http://localhost:5000/user/register", {
      "username":username,
      "pwd":pwd
    }) .then((res) => {
      alert(res.data.msg);
      authState = "None"
      username = ""
      pwd = ""
      authState = "None"
    }) .catch((err) => {
      console.log(err)
    })
  }
  
</script>

<body style="margin: 0">
  <div class="homepage">
    <h1>Hercules Restaurant Management Dashboard</h1>
    <h4>Where efficiency is the food for success!</h4>
    <div class="form-control">
        <button id="returning-user" on:click={() => authState = "Login"}>Returning User ?</button>
        <button id="new-user" on:click={() => authState = "Register"}>New User ?</button>
    </div>
    {#if authState == "None"}
        <span></span>
    {:else if authState == "Login"}
        <label for="username">Username</label>
        <input id="username" name="username" type="text" bind:value={username}>
        <label for="pwd">Password</label>
        <input id="pwd" name="pwd" type="password" bind:value={pwd}>
        <button id="login" on:click={login}>Login</button>
    {:else if authState == "Register"}
        <label for="username">Username</label>
        <input id="username" name="username" type="text" bind:value={username}>
        <label for="pwd">Password</label>
        <input id="pwd" name="pwd" type="password" bind:value={pwd}>
        <button id="login" on:click={register}>Register</button>
    {/if}
  </div>
</body>

<style>
  .homepage {
    font-family: "Montserrat", sans-serif;
    color: white;
    font-size: 24px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
    margin: 0px;
    background: linear-gradient(
      to right,
      rgb(134, 239, 172),
      rgb(59, 130, 246),
      rgb(147, 51, 234)
    );
    margin: 0;
  }

  #login, #returning-user, #new-user {
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

  #login:hover, #returning-user:hover, #new-user:hover {
    background-color: #f3f4f6;
    text-decoration: none;
    transition-duration: 0.1s;
  }

  #login:disabled, #returning-user:disabled, #new-user:disabled {
    background-color: #fafbfc;
    border-color: rgba(27, 31, 35, 0.15);
    color: #959da5;
    cursor: default;
  }

  #login:active, #returning-user:active, #new-user:active {
    background-color: #edeff2;
    box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
    transition: none 0s;
  }

  #login:focus, #returning-user:focus, #new-user:focus {
    outline: 1px transparent;
  }

  #login:before, #returning-user:before, #new-user:before {
    display: none;
  }

  #login:-webkit-details-marker, #returning-user:-webkit-details-marker, #new-user:-webkit-details-marker {
    display: none;
  }

  #username, #pwd {
    margin: 5px;
    border-radius: 20px;
    border: 0px solid;
    padding: 10px;
  }

  #username:focus, #pwd:focus{
    outline: none;
  }
</style>
