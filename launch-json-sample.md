Use this file as a starting place for debugging configuration using breakpoints. You may need to tweak this file for your specific environment. It allows you to run the backend, frontend, and browser all at once using the `Full Stack` compound command, but you can also run each configuration independently.

To use this file, copy this code into a file called `launch.json` and place it in a directory named `.vscode` in the root of the project.

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch Chrome",
            "type": "chrome",
            "request": "launch",
            "url": "http://localhost:3000",
            "webRoot": "${workspaceFolder/nextjs",
            "sourceMaps": true
        },
        {
            "name": "Launch NextJS",
            "type": "node-terminal",
            "request": "launch",
            "cwd": "${workspaceFolder}/nextjs",
            "command": "npm run turbo",
            "serverReadyAction": {
                "action": "startDebugging",
                "pattern": "- Local:.+(https?://.+)",
                "name": "Launch Chrome"
            }
        },
        {
            "name": "Launch Flask",
            "type": "debugpy",
            "request": "launch",
            "module": "flask",
            "env": {
                "FLASK_APP": "run.py",
                "FLASK_DEBUG": "1"
            },
            "args": ["run", "--no-debugger", "--no-reload"],
            "justMyCode": true
        }
    ],
    "compounds": [
        {
            "name": "Full Stack",
            "configurations": ["Launch Flask", "Launch NextJS"]
        }
    ]
}
```
