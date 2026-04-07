import http from "http";
import { writeFile, readFile } from "./utils.js";

const PORT = 3000;

const server = http
  .createServer(async (req, res) => {
    const { method, url } = req;

    //*  Get All Users
    //! Question 4
    if (method === "GET" && url === "/user") {
      const users = await readFile();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(users));
    }
    //*GET USER BY ID
    //! Question 5
    else if (method === "GET" && url.startsWith("/user/")) {
      const pathSegments = req.url
        .split("/")
        .filter((segment) => segment !== "");
      if (pathSegments[0] === "user" && pathSegments[1]) {
        const userId = pathSegments[1];
        const users = await readFile();
        const user = users.find((ele) => ele.id == userId);
        if (user) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(user));
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.write(JSON.stringify({ message: "User ID not found" }));
          return res.end();
        }
      } else {
        res.end("Invalid Path");
      }
    }
    //* Add new User
    //! Question 1
    else if (method === "POST" && url === "/user") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", async () => {
        try {
          let newData = JSON.parse(body); // let
          const { name, email, age } = newData;
          const users = await readFile();
          const index = users.findIndex((ele) => {
            return ele.email == email;
          });

          if (index !== -1) {
            console.log(email);
            res.writeHead(400, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ message: "Email already exists" }));
            return res.end();
          }
          const lastId = users[users.length - 1].id;
          const newUser = {
            id: lastId + 1,
            name,
            email,
            age,
          };
          users.push(newUser);
          await writeFile({ data: users });
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "User created successfully" }));
        } catch (error) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.write(JSON.stringify({ message: "Invalid JSON" }));
          return res.end();
        }
      });
    }
    //* Delete User By ID
    //! Question 3
    else if (method === "DELETE" && url.startsWith("/user")) {
      let body = "";

      const pathSegments = req.url
        .split("/")
        .filter((segment) => segment !== "");

      if (pathSegments[0] === "user" && pathSegments[1]) {
        const userId = pathSegments[1]; //from url

        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", async () => {
          // const { id } = JSON.parse(body);
          const users = await readFile();
          const index = users.findIndex((ele) => {
            return ele.id == userId;
          });
          if (index !== -1) {
            users.splice(index, 1);
            await writeFile({ data: users });
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ message: "User deleted successfully" }));
            return res.end();
          } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ message: "User ID not found" }));
            return res.end();
          }
        });
      }
    }
    //* UPDATE USER by ID
    //! Question 2
    else if (method === "PATCH" && url.startsWith("/user/")) {
      let body = "";
      // GET ID FROM URL

      const pathSegments = req.url
        .split("/")
        .filter((segment) => segment !== "");

      if (pathSegments[0] === "user" && pathSegments[1]) {
        const userId = pathSegments[1]; //from url
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", async () => {
          try {
            const newData = JSON.parse(body);
            const { name, email, age } = newData; // from client
            const users = await readFile(); // from database
            const idIndex = users.findIndex((ele) => {
              return ele.id == userId;
            });

            if (idIndex !== -1) {
              console.log(userId);
              if (email) {
                const checkEmail = users.findIndex((ele) => {
                  return ele.email == email && ele.id !== userId;
                });
                if (checkEmail !== -1) {
                  res.writeHead(400, { "Content-Type": "application/json" });
                  res.write(
                    JSON.stringify({ message: "Email already exists" }),
                  );
                  return res.end();
                }
                users[idIndex].email = email;
              }
              users[idIndex].name = name || users[idIndex].name;
              users[idIndex].age = age || users[idIndex].age;
              await writeFile({ data: users });
              res.writeHead(200, { "Content-Type": "application/json" });
              res.write(
                JSON.stringify({ message: "User updated successfully" }),
              );
              return res.end();
            } else {
              res.writeHead(404, { "Content-Type": "application/json" });
              res.write(JSON.stringify({ message: "User not found" }));
              return res.end();
            }
          } catch (error) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ message: "Invalid JSON" }));
            return res.end();
          }
        });
      } else {
        res.end("Invalid Path");
      }
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end("User is not found");
    }
  })
  .listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT} ...`);
  });
