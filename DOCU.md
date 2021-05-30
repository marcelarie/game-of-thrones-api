## Documentation

The Game of Thrones API allows developers to access and manage information about
the Seven Kingdoms.

### Start here

### Endpoints

**HOST** `http://localhost:8080/`

1.1 **User sign up**

`POST` to `http://localhost:8080/user/sign-up`

```json
// sign up request body
{
    "username": "aria",
    "email": "aria@mail.com",
    "password": "pass12345"
}
```

**Correct response with status code `201`:**

```json
// sign up response body
{
    "username": "aria",
    "email": "aria@mail.com",
    "password": "$2b$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa"
}
```

1.2 **User login**

`POST` to `http://localhost:8080/user/login`

```json
// login request body
{
    "username": "aria",
    "password": "pass12345"
}
```

**Correct response with status code `200`:**

```json
// login response body
{
    "message": "Logged In"
}
```

with a cookie token

```
eyJhbGcisOiJIUzI1NiIsInR5cCI6IkpXVC...
```

2.1 **Get all players**

`GET` to `http://localhost:8080/player/all`

**Correct response with status code `200`:**

```json
// get all players response body
[
    {
        "health": 100,
        "bag": [1],
        "_id": 1,
        "name": "Jon Snow",
        "age": 23,
        "__v": 0
    }
]
```

2.2 **Get player by ID**

`GET` to `http://localhost:8080/player/:id`

**Correct response with status code `200`:**

```json
// get all players response body
[
    {
        "health": 100,
        "bag": [1],
        "_id": 1,
        "name": "Jon Snow",
        "age": 23,
        "__v": 0
    }
]
```

2.3 **Create player**

`POST` to `http://localhost:8080/player`

```json
// create player request body
{
    "name": "Jon Snow",
    "age": 23
}
```

**Correct response with status code `200`:**

```json
// create player response body
{
    "response": {
        "health": 100,
        "bag": [],
        "_id": 1,
        "name": "Jon Snow",
        "age": 23,
        "__v": 0
    },
    "message": "Player created"
}
```

2.4 **Add object to player**

`PATCH` to `http://localhost:8080/player/add-object`

or

`PATCH` to `http://localhost:8080/player/add-object/:objectId/to/:id`

The first endpoint needs a request body with the `_id` of the player we want to give
the object, and any key to identify the object we want. Examples: `name`, `_id`,
`aviable: true`, etc...

The second one uses the url parameters. `:id` has to be a player id and
`:objectId` a object id.

If the object is not available the endpoint will return a `404` with a message
`Knife is not available`.

```json
// add object to player request body
{
    "_id": 1,
    "name": "Knife"
}
```

**Correct response with status code `200`:**

```json
// add object to player response body
{
    "response": {
        "health": 100,
        "bag": [],
        "_id": 1,
        "name": "Jon Snow",
        "age": 23,
        "__v": 0
    },
    "message": "Now Jon Snow owns a Knife"
}
```

2.5 **Kill player**

`PATCH` to `http://localhost:8080/player/kill/:id`

Response will return the player with `health` with `0` points and a cool message.

**Correct response with status code `200`:**

```json
// kill player response body
{
    "response": {
        "health": 0,
        "bag": [],
        "_id": 1,
        "name": "Jon Snow",
        "age": 23,
        "__v": 0
    },
    "message": "You killed Jon Snow"
}
```

2.5 **Pick up object without owner**

`PATCH` to `http://localhost:8080/player/pick-up-object/:id`

This endpoint will give a object without owner, for example a Knife, to the given
`:id`. The endpoint will give the ownership of that object to the player.

**Correct response with status code `202`:**

```json
// pick up object with no owner response body
{
    "response": {
        "health": 0,
        "bag": [1],
        "_id": 1,
        "name": "Jon Snow",
        "age": 23,
        "__v": 0
    },
    "message": "Now Jon Snow owns a Knife"
}
```

2.6 **Attack player**

`PATCH` to `http://localhost:8080/player/attack`

The attack endpoint needs the `_id` of the attacker, the id of the object as
`object` and the id of the victim as `victim`. Te victim will recive te value
of the object on his health, if the object has a negative value, for example `-20`,
the player will have 20 points less of health.

The endpoint can have two different messages. One if the player still haves health
points `Jon Snow attack was succesful, now Aria has health points`, or the second
that appears when the victim gets killed, `Jon Snow killed Aria`.

```json
// attack player request body
{
    "_id": 1,
    "object": 2,
    "victim": 3
}
```

**Correct response with status code `200`:**

```json
// attack player response body
{
    "response": {
        "health": 0,
        "bag": [2, 3],
        "_id": 3,
        "name": "Aria",
        "age": 18,
        "__v": 0
    },
    "message": "Jon Snow killed Aria"
}
```

2.7 **Steal from player**

`PATCH` to `http://localhost:8080/player/:id/steal/:victim`

This endpoint will give the objects that are inside the victim on the owner bag.
The `id` parameter its the thief id and the `victim` parameter its the victim id.

The endpoint will change the ownership of all the objects to the thief.

If the victim does not have any objects in the bag the response will be a `404`
with a message, `The victim doesn't have items.`

**Correct response with status code `200`:**

```json
// steal from player response body
{
    "response": {
        "stolen-items": [
            {
                "available": true,
                "owner": 1,
                "_id": 1,
                "name": "Knife",
                "value": -20,
                "__v": 0
            }
        ]
    },
    "message": "Jon Snow stole the bag of Aria"
}
```

2.8 **Resurrect player**

`PATCH` to `http://localhost:8080/player/resurrect/:id`

The response will return the player with `health` with `100` points and a cool message.

**Correct response with status code `202`:**

```json
// kill player response body
{
    "response": {
        "health": 100,
        "bag": [],
        "_id": 1,
        "name": "Jon Snow",
        "age": 23,
        "__v": 0
    },
    "message": "You resurrected Jon Snow"
}
```

3.1 **Create object**

`POST` to `http://localhost:8080/object`

If no value is given when creating an object, a random value between `200` and
`-200` will be given. The name of the object must be unique.

```json
// create object request body
{
    "name": "Kife",
    "value": -20
}
```

**Correct response with status code `200`:**

```json
// create object response body
{
    "available": true,
    "owner": null,
    "name": "Kife",
    "value": -20,
    "_id": 2,
    "__v": 0
}
```

3.2 **Search for an object by ID**

`GET` to `http://localhost:8080/object/:id`

**Correct response with status code `200`:**

```json
// get object by id response body
{
    "available": true,
    "owner": null,
    "name": "Kife",
    "value": -20,
    "_id": 1,
    "__v": 0
}
```

3.3 **Give object a random value**

`PATCH` to `http://localhost:8080/object/value-random/:id`

This endpoint will give the given object a random value between `200` and `-200`.

**Correct response with status code `200`:**

```json
// get object by id response body
{
    "response": {
        "available": true,
        "owner": null,
        "name": "Kife",
        "value": 185,
        "_id": 1,
        "__v": 0
    },
    "message": "Now Knife has a value of 185"
}
```

3.3 **Update object with given value**

`PATCH` to `http://localhost:8080/object/value/:value/to/:id`

This endpoint will give the given object `id` the given `value`.

**Correct response with status code `200`:**

```json
// get object by id response body
{
    "response": {
        "available": true,
        "owner": null,
        "name": "Kife",
        "value": 15,
        "_id": 1,
        "__v": 0
    },
    "message": "Now Knife has a value of 15"
}
```

3.3 **Destroy object**

`PATCH` to `http://localhost:8080/object/destroy/:id`

This endpoint will change the given object aviability to `false`. Destroyed
objects have no owner, so the player that owned that object losts it.

**Correct response with status code `200`:**

```json
// destroy object response body
{
    "response": {
        "available": false,
        "owner": null,
        "name": "Kife",
        "value": 15,
        "_id": 1,
        "__v": 0
    },
    "message": "The obect was destroyed."
}
```

3.3 **Repair object**

`PATCH` to `http://localhost:8080/object/repair/:id`

This endpoint will change the given object aviability to `true`.

**Correct response with status code `200`:**

```json
// repair object response body
{
    "response": {
        "available": true,
        "owner": null,
        "name": "Kife",
        "value": 15,
        "_id": 1,
        "__v": 0
    },
    "message": "The obect was repaired."
}
```

3.4 **Delete object**

`DELETE` to `http://localhost:8080/object/delete/:id`

This endpoint will delete the object from the database.

**Correct response with status code `200`:**

```json
// repair object response body
{
    "response": {
        "value": -20,
        "available": false,
        "owner": 1,
        "_id": 1,
        "name": "Knife",
        "__v": 0
    },
    "message": "The object was removed."
}
```
