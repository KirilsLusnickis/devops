# Task for Junior DevOps Engineer candidate

This task is designed to test your general understanding of web applications, and how to pack and run them in containers using Docker. For implementation of this task please use a programming language of your choice (anything that works well with web and Docker, and which feels comfortable for you). The task consists of multiple parts – feel free to skip any of them if you miss the required skills, but for the best result try to complete all of the parts.

The implementation of this task should consist of your application source code, Dockerfile and docker-compose.yml. Store everything in a git repository on github.com. Please make a separate git commit for each subtask, with a descriptive commit message. When finished, you may either share the repository publicly, or share it privately with github user kaspars. And also notify Linda when it's done.

## 1.1. The application root path may respond with “hello world” or anything like that.

## 1.2. Every computer process inherits from its host system some environment variables. For your web application please create a route /api/environment, in which you iterate through all environment variables of your app and print these key-value pairs in the response body.

## 1.2.1. Please make this output available in 3 different formats – HTML, JSON and XML, which can be switched using the URL query parameters (?format=json for example). Make HTML the default option (without a parameter). You may structure the JSON and XML as you like. Please set the correct content-type for the response of each format.

## 1.2.2. Make the application to respect two environment variables – BGCOLOR and FGCOLOR. Change the background and foreground colors in the HTML output based on the values passed to these variables. Use a regular expression in your code to accept only the hex codes for colors (like “#FF0000”), not color names (“blue” or “red”). Let it accept either full hex pair or short hex (e.g. “#FF6600” and “#F60” are OK). Let it be case-insensitive (“#ff6600” is OK). Invalid input should result in default “black on white” output.

## 1.3. Every web request consists of multiple HTTP headers. Similarly to 1.2., create a route /api/headers, in which you iterate through the request headers and print the key-value pairs in the response body. Provide the output in different formats, just like in 1.2.1.

## 1.4. Create a route /api/post, which should accept only HTTP POST requests. If any other method is tried, the route should respond with “method not allowed” and the corresponding status code. Similarly to 1.2. and 1.3. – please iterate through the post body fields, and print them in the output.

## 1.5. Please prepare a Dockerfile with a build recipe for your project, so the tester can build and run your project in a reproducible manner. Our tester is not required to have any other dependency on his computer than Docker. Please use Linux based images for your project (e.g. alpine, debian or ubuntu variants).

## 1.5.1. Expose your application on the container's TCP port 3000.

## 1.5.2. Please make sure that your application's access log is available via docker logs command.

## 1.5.3. If you chose a “compiled language” (like C++, C#, Java or Go) for your implementation, make the Dockerfile “multi-staged”. For compiled languages the final image should contain the binaries or bytecode only, not source code.

## 1.6. Please prepare a Docker Compose config file, docker-compose.yml, with a service named “web” which starts your application and maps container's TCP port 3000 to the same port on the host computer.

## 2.1. Please put a reverse proxy in front of your application. Here you may choose between nginx and haproxy. Use their official images from docker hub and customize them as needed. Add a service named “proxy” to your docker-compose.yml. The proxy should pass all its requests to the “web” container on port 3000. Make the proxy available on TCP port 8080 on the host computer. Commit all the proxy configuration files to your repository.

## 2.2. Configure a basic access authentication for your application. Add credentials – username “demo” with a password “demo”. You may choose whether to do that at the application level or proxy level.

## 2.3. [optional] Please add a relational database to your stack. You may choose between mysql, postgres or mssql. Please use their official images from docker hub. Make it available to your application by adding a service named “db” to your docker-compose.yml. Define a volume for data persistence.

## 2.4. [optional] Modify your application to store every request information into the attached database. The database table access_log should store the following information – request timestamp, IP address, method, path, user-agent. Database table should be created automatically (if not present) upon the startup of your application.
