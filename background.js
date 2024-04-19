setInterval(async()=>{
    let currentTab = await chrome.tabs.query({currentWindow: true, active: true});
    if(currentTab[0].url.includes("chrome://extensions")){
        return;
    }
    else{
        await chrome.scripting.executeScript({
        target: {
          tabId: currentTab[0]?.id,
        },
        files: ["contentScript.js"],
      });
    }
},3600000);


setInterval(()=>{
    console.log("Working");
},60000)