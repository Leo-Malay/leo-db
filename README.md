# LeoDB

### Lightweight Miniature JSON DB

Hello World, The use of JSON is at its peak and th future of the data being passed and store has a higher potential of also being in JSON format. Thus im presenting you with this module of which makes it extremely easy to perform DB like queries on the JSON data.

```jsx
// Import the module
const leoDB = require("leo-db");
```

<br/>

This module provides following functionality,

1. Loading data from file.
2. Saving the data to a file.
3. Performing a search query.
4. Performing an insert query.
5. Performing a update query.
6. Performing a delete query.

I have tried implementing the module to save save using key replacement method to a general structure. Thus reducing the data size without affecting the runtime efficiency.

```jsx
// Loading an existing DB from the Local disk.
leodb.LoadDB();

// Save the DB to the loacl disk.
leodb.SaveDB();
```

<br/>

Now to make a new DB or remove an existing DB we have the following functions, (DB here means the collection/table)

```jsx
// Create a new DB.
leoDB.NewDB("Enter_DB_Name", ["field_1", "field_2", "field_3"]);

// Delete a particular DB and remove all data.
leoDB.DeleteDB("Enter_DB_Name");
```

<br/>

Select the database you want to perform the query on.

```jsx
// Select the DB. (Only once for multiple query on same DB)
leoDB.SelectDB("Enter_DB_Name");
```

<br/>

Performing Insert Query

```jsx

// Single Data Insert
leoDB.Insert({
    field_1: "value_1",
    field_2: "value_2",
    field_3: "value_3",
});

// Multiple Data Insert
leoDB.Insert([
    {
        field_1: "value_1",
        field_2: "value_2",
        field_3: "value_3",
    },
    {...},
    {...}
]);
```

<br/>

Performing Update Query

```jsx
// Data Update
leoDB.Update(
    {
        search_for_key: "search_for_value",
    },
    {
        update_field: "update_value",
    }
);
```

<br/>

Performing Find Query

```jsx
// Data Find (Returns all data)
leoDB.Find();

// Data Find (Returns all data thats matching)
leoDB.Find({
    search_field_1: "search_value_1",
    OR: {
        // Search for optional values matching.
        search_field_2: [
            "possible_value_1",
            "possible_value_2",
            "possible_value_3",
        ],
        search_field_3: [
            "possible_value_1",
            "possible_value_2",
            "possible_value_3",
        ],
    },
});
```

<br/>

Performing Delete Query

```jsx
// Data Delete
leoDB.Delete({
    search_for_key: "search_for_value",
});

// Delete all data. (Removes all the data);
leoDB.Delete();
```

### Warning: Use with utmost care...its still under development.
