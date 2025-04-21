# pandora-admin

## :bug: Debugging

Debugging allows you to inspect the flow of the application, pause execution at breakpoints, and view values in real time. This can greatly improve development efficiency and help identify issues quickly.

While this project is frameworked as a SPA using Vue 3 and Vite, source maps are fully supported, enabling IDEs like VSCode to provide step-by-step debugging with minimal setup.

### :computer: VSCode

This project supports full debugging inside Visual Studio Code, using breakpoints and the DevTools Protocol.

> **_Note: Each developer should create their own debug configuration locally. Do not commit it to the repository._**

#### :wrench: Steps to Enable Debugging in VSCode

1. Open VSCode and go to the **Run and Debug** tab (Ctrl + Shift + D).
2. Click on "**Create a launch.json file**".
3. Choose the environment: **Chrome**.
4. Replace the contents of the generated file with:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug",
      "type": "<web app>",
      "request": "launch",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "runtimeExecutable": "<browser executable>",
      "sourceMaps": true,
      "trace": true
    }
  ]
}
```

In the replaced json, the following fields must be confirmed:

- **\<web app>:** this should be the type of browser to use, the most common options are chrome or firefox
  > **_Note: any chomium-based browser falls under the chrome type._**
- **\<browser ececutable>:** this should be the path of the browser executable.

  > Find it by running:
  >
  > - On Linux: `which chrome`
  > - On Windows: `where chrome` (_PowerShell_)
  >
  > :warning: **Note for Windows**: Sometimes `where chrome` may not return a result, depending on how the browser was installed or your PATH configuration. In that case, you can manually browse to the executable location.
  >
  > Common paths include:
  >
  > - `C:\Program Files\Google\Chrome\Application\chrome.exe`
  > - `C:\Users\<your_username>\AppData\Local\Google\Chrome\Application\chrome.exe`

:rocket: To Start Debugging

1. Run the development server:
   ```bash
   npm run dev
   ```
2. Press F5 in VSCode.
3. A new browser window will open at `http://localhost:5173`.
4. Place breakpoints in your `.ts` or `.vue` files and start debugging.

> :warning: **Important:** After making changes to your code (especially logic or structure), VSCode **does not automatically reload the updated source maps** inside the debug session.
>
> You must **manually stop (Shift + F5)** and **restart (F5)** the debug session to ensure breakpoints and code match properly.
>
> This is a limitation of browser-based debugging and source map caching, not a bug in your setup.

### :wrench: Debugging with Other IDEs

If you configure debugging for another IDE (like WebStorm, Neovim, Emacs, or Eclipse Theia), please feel free to contribute your setup by extending this section in the README. Keep in mind:

- Keep the configuration scoped to your IDE.
- Avoid modify project-specific files.
