App = {
    contracts:{},
    loading: false,
    setLoading: (boolean) =>{
        App.loading = boolean;
        const loader = $('#loader'); 
        const content = $('#content'); 
        if(boolean){
            loader.show();
            content.hide();
        }
        else{
            loader.hide();
            content.show();
        }
    },

    load: async () => {
        // Load app
        try {
            await App.loadWeb3();
            await App.loadAccount();
            await App.loadContracts();
            await App.render();
        } catch (err) {
            console.error("App load failed:", err);
        }
    },
    
    // Detect MetaMask → connect to Ethereum → initialize Web3 → request user permission
    loadWeb3: async () => {
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
            console.log("Ethereum object:",window.ethereum);
        } else {
            console.log('MetaMask is not installed!');
            return;
        }

        try {
           const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
           console.log("Accounts:",accounts);
           App.accounts = accounts;
        } 
        catch (error) {
            console.error('User denied account access');
        }

        window.web3 = new Web3(window.ethereum);
        App.web3provider = window.ethereum;
    },

    loadAccount: async () => {
        console.log("Loading account ...")
        if(!App.accounts || App.accounts.length===0)
        {
            console.error("No accounts found");
            return;
        }
        App.account = App.accounts[0];
        console.log("Active account is",App.account);
    },

    loadContracts: async () => {
        try
        {
            const todoList = await $.getJSON('TodoList.json');
            App.contracts.TodoList = TruffleContract(todoList);
            App.contracts.TodoList.setProvider(App.web3provider);

            App.todoList = await App.contracts.TodoList.deployed();
            console.log("Contracts:",App.todoList);
        }
        catch(err)
        {
            console.log(err);
        }
    },

    render: async () => {
        if(App.loading) return;

        App.setLoading(true);
        $('#account').html(App.account);

        await App.renderTasks();
        App.setLoading(false);
    },

    renderTasks: async () => {
        const tasks = await App.todoList.taskCount(); 
        const $taskTemplate = $('.taskTemplate');

        for(let i=1;i<=tasks;i++)
        {
            const task = await App.todoList.tasks(i);
            const taskId = task[0].toNumber();
            const taskContent = task[1];
            const taskCompleted = task[2];

            const $newTaskTemplate = $taskTemplate.clone();
            $newTaskTemplate.find('.content').html(taskContent);
            $newTaskTemplate.find('.input')
                            .prop('name',taskId)
                            .prop('checkbox',taskCompleted)
                            // .on('click',App.toggleCompleted);
           
           if(taskCompleted)
            $("#completedTaskList").append($newTaskTemplate);
           else
            $("#taskList").append($newTaskTemplate);

           $newTaskTemplate.show();

        }
    }
}

window.addEventListener('load', async () => {
  console.log("App starting...");
  await App.load();
});
// $(()=>{                         // Dom ready
//     $(window).load(()=>{        // All assets load
//         App.load()              // App starts
//     })
// })