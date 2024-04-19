(async()=>{
        const storage = await chrome.storage.local.get(["todos"]);
    
        if(storage.todos?.length === 0 || storage.todos === undefined){
            return;
        }
        else{
            alert("You have left over tasks. Please complete it");
        }
})()