Part3: Node Internals:

1. What is the Node.js Event Loop?
   - it is construct in node js Architecture enables asynchronous and non-blocking I/O by sending some tasks to libuv -if needed-
     or returning it to main thread by not blocking main tread.

2. What is LIBUV and What Role Does It Play in Node.js?
   - LIBUV is multi-platform used in node js architecture asynchronous by doing some low level code in reading file or hashing/crypto using c++.
     it binds with javascript by taking instance of the c++ file in background and return the result by callback function to the main thread

3. How Does Node.js Handle Asynchronous Operations Under the Hood?
   - by using event loop: it starts from event queue by taking the task and searching if needed to send to LIBUV to execute or returning it to main thread

4. What is the Difference Between the Call Stack, Event Queue, and Event Loop in Node.js?
   - Call Stack : store main thread operation and execute it synchronously by FILO
   - Event Queue : store asynchronous operations and execute in by Highest priority order by FIFO
   - Event Loop : Handles between main thread and event queue by checking if there asynchronous operations exists

5. What is the Node.js Thread Pool and How to Set the Thread Pool Size?
   - it exists in LIBUV it enables multi threads by default is 4 ,to set the size use in terminal : .env set_thread_size = "number needed"

6. How Does Node.js Handle Blocking and Non-Blocking Code Execution?
   - by using event loop if it find non-block operations it sends it to LIBUV if needed to turing it back to main thread after executing th call stack
