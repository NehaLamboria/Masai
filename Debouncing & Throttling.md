What is Debouncing?

Debouncing is a technique used to delay the execution of a function
until a certain amount of idle time has passed since the last time the
function was invoked.

Example:

Imagine you are typing in a search box that sends a request to fetch
suggestions. If a request is sent every time, you press a key, you will
overload the server.

Instead, with debouncing, the app waits until you stop typing (say for
300ms), and then sends the fetch request once. This prevents unnecessary
requests.

Common Use Cases:

-   Search input suggestions (Google search bar)
-   Auto-saving form data
-   Window resize events
-   Filtering as you type in a list or table


What is Throttling?

Throttling is a technique where a function is allowed to run at regular
intervals, no matter how often it is triggered. It limits the function
execution to once per X milliseconds.

Example:

Think of how the scroll event fires continuously as you scroll a page.
If you trigger a function on every scroll, it could crash your app.

With throttling, you allow the function to run only once every 100ms or
200ms, no matter how fast the scroll event is firing.

Common Use Cases:

-   Scroll-based animations or lazy loading
-   Resizing window elements
-   API polling at fixed intervals
-   Button click spamming prevention (like \"Add to Cart\")

Key Differences Between Debouncing and Throttling:

  --------------- ------------------------------------------------------------- ----------------------------------------------
  Timing          Executes after a delay from the last call                     Executes at regular intervals no matter what
  Use Case        Best when you want to wait until user stops doing something   Best when you want to limit executions
  Example         Search bar input                                              Scroll event
  Function call   Happens once, after idle time                                 Happens at fixed intervals
  --------------- ------------------------------------------------------------- ----------------------------------------------


Summary:

-   Use debouncing when you want to wait and then act (after no
    activity).
-   Use throttling when you want to act repeatedly, but in a controlled
    manner.

Both help reduce unnecessary calls, optimize performance, and save
server resources --- making them crucial for building efficient
applications.
