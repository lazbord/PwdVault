document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.querySelector('.content');

    function loadTemplate(templateId) {
        const template = document.getElementById(templateId);
        contentDiv.innerHTML = '';
        contentDiv.appendChild(template.content.cloneNode(true));
    }

    function loadScript(scriptPath, initFunction) {
        import(scriptPath)
          .then(module => {
            if (initFunction) {
                module[initFunction]();
            }
          })
          .catch(error => console.error(`Failed to load ${scriptPath}`, error));
    }

    loadTemplate('tab');
    loadScript('../component/tab.js', 'initTab');

    const menuButtons = document.querySelectorAll('.menu button');
    const scripts = [
        { template: 'tab', script: '../component/tab.js', function: 'initTab' },
        { template: 'vault', script: '../component/vault.js', function: 'initVault' },
        { template: 'parameters', script: '../component/parameters.js', function: 'initParameters' }
    ];

    menuButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            loadTemplate(scripts[index].template);
            loadScript(scripts[index].script, scripts[index].function); 
        });
    });
});


