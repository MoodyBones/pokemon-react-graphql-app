# React & GraphQL Front-end Pokemon App

## Study Notes & Code by [Mel Jones](https://twitter.com/_moodybones)

### Free Tutorial by [Karl Hadwen](https://www.youtube.com/c/cognitivesurge) on [Scrimba](https://scrimba.com/course/greactgraphql/)

In this tutorial:

- we will hit an existing graphQL server
- that gives us back data for Pokemon character
- how to interact with graphQL queries
- apollo hooks
- container method & components
- styling
- fast application with a limited amount of code

What technologies will we be using?

- React
- GraphQL
- Apollo
- CSS
- [Pokemon open API](https://graphql-pokemon.now.sh/)

How will we we be tackling the work?

- Intial setup (file/folder creation, dependencies)
- Boilerplate code
- Conecting to our GraphQL server
- Creating our components
- Styling our application
- & a bunch of challenges

About [Karl Hadwen](https://www.youtube.com/c/cognitivesurge)

- FT progammer/technical lead
- works on various entertainment websites (video streaming services in the UK)
- does workshops, JS & React in classroom sessions
- teacher, one on one react & JS courses
- huge JS fan & pragmatic programmer
- a feature based developer, if you can ship a feature rather than over engineering, lets do that
- ship something quickly

## Webpack Babel React Setup

I'm going to try and use this with my [webpack babel react](https://github.com/MoodyBones/webpack-react-setup) template, but you could use create-react-app.

To fork it or to [make a duplicate/mirror a repo](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/duplicating-a-repository)

1. Open Terminal.
2. Create a bare clone of the repository.

   ```
   $ git clone --bare https://github.com/exampleuser/old-repository.git
   ```

3. Mirror-push to the new repository.

   ```
   $ cd old-repository.git
   $ git push --mirror https://github.com/exampleuser/new-repository.git
   ```

4. Remove the temporary local repository you created earlier.

   ```
   $ cd ..
   $ rm -rf old-repository.git
   ```

Alright now to load the Node Modules

`$`

```jsx
npm i
```

and to run the server

`$`

```
    npm run serve

```

to compile the project

`$`

```
    npm run build
```

ok back to the tutorial

## Add Dependenicies

- react: 16.13.1
- react-dom: 16.13.1
- @apollo/react-hooks: 3.1.3
- graphql-tag" 2.10.3

`$`

```jsx
npm install @apollo/react-hooks
npm i graphql-tag

//I also had to addp
npm i graphql
npm i apollo-client
npm install --save @types/react

```

## Set up file & folders

`index.js`

```jsx
import React from 'react'
import { render } from 'react-dom'
import { App } from './src/App.js'
import './src/style.scss'

render(<App />, document.getElementById('root'))
```

`App.js`

```jsx
import React from 'react'

export function App() {
  return (
    <div>
      <p>I am a Pokemon</p>
    </div>
  )
}
```

folders:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/529541c6-f3ee-4769-8156-ac419c34ddce/Screen_Shot_2020-04-01_at_13.13.57.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/529541c6-f3ee-4769-8156-ac419c34ddce/Screen_Shot_2020-04-01_at_13.13.57.png)

### import apollo-boost

`$ npm i apollo-boost`

- Apollo allows us to have direct access to the GraphQL server,
- without this, our app has no life, because all the data is stored in the pokemon graphql server
- this allows to hit an external graphql api,
- you can also do this using the regular REST route,
- We want to use the `ApolloClient` as a component
- We want to wrap our application in `ApolloProvider`
- `ApolloProvider` takes a prop called client, and we just created the client, so we will pass the prop through

`App.js`

```jsx
import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

export function App() {
  const client = new ApolloClient({
    url: 'https://graphql-pokemon.now.sh',
  })

  return <ApolloProvider client={client}></ApolloProvider>
}
```

### Importing default or named exports with React

- `import default from 'blah'`
- `import { named } from 'lala'`
- the **{ curly }** braces mean it's **named**
- this done because then you can import multiple in the same line
- `import { named, otherName } from 'lala'`

## GraphQL

- click on 'Docs' which is the Schema Explorer
- the Schema Explorer is mapping out everything that you can request

Docs/Schema Explorer

- shows queries and sometime mutations
- Mutations: allow you to update, edit & delete
- Q**ueries are just requesting information**
- Click on 'Query' to explore the fields we can extract data from
- Here we can see what we can Query for...
- GraphQL is about asking for specific fields on object
- The documentation explorer will tell you all the informa exposed by the server.

Fields

```jsx
query: Query
pokemons(first: Int!): [Pokemon]
pokemon(id: Stringname: String): Pokemon
```

- we are going to use
- `pokemons(first: Int!): [Pokemons]`
- basicially what it's saying is that it needs to take a variable and it has to be an integer, and that this is required
- Int = integer
- ! required
- and then it will return an [array] of Pokemon
- we don't know what Pokemons is yet, so we don't know what sort of fields with can query against yet

### **GraphQL is all about asking for specific fields on an Object**

- that means we can request whatever information we want,
- and we can get that information returned
- whether we want more information, if thats possible,
- or less information
-
- alternatively with something like rest, where we would get all the information back, and sometimes you don't need all the information
- that what is great about GraphQL, it'll tell you want you can request for, and what it will return

### Passing in arguments

```jsx
// pokemons(first: Int!): [Pokemon]
pokemons(first: 9):[Pokemon]
// this will return 9 Pokemons,
//but we dont know what fields will be returned justy yet!?
```

- click on [Pokemon]
- this will display the fields

```jsx
id: ID!
number: String
name: String
weight: PokemonDimension
height: PokemonDimension
classification: String
types: [String]
resistant: [String]
attacks: PokemonAttack
weaknesses: [String]
fleeRate: Float
maxCP: Int
evolutions: [Pokemon]
evolutionRequirements: PokemonEvolutionRequirement
maxHP: Int
image: String
```

- some stuff we need, and some stuff we don't
- remember the cool thing about graphql??
- we cam simply request specific fields we need!

### Building our Query

```jsx
{
  pokemons(first: 9) {
    id
    name
    image
    maxHP
    maxCP
    attacks {
      special {
        name
        damage
      }
    }
  }
}
```

## Using our container component to map over our Pokemens!

- so we've already set up our `ApolloClient` & `ApolloProvider`
- `App.js` is the component we included in the `index.js`
- & we are essentially saying that `App.js` is the main component
- if we think of it like a building block:
  - with the `App.js` at the top, everything else below will have access to the `ApolloProvider`
-

### Queries

- a query is essentially saying this what i'm asking for, please return me the datat
- in graphQL you can have 1 or 2 things returned
  - you could get the data back
  - or an array of errors back (which is ok, we can handle those)

`PokemonContainer.js`

```jsx
const { data: { pokemons = []} = {}}
```

- we will immediately destructure data
- we know data can return pokemon or pokemons
- so lets request pokemons
- we know pokemons returns an [array]
- and if that fails, and no pokemons get returned
- then we will return an empty {object}, this protects us from our application bombing out/breaking
- it's import to always make sure the application is safe!!

```jsx
const { data: { pokemons = [] } = {} } = useQuery(GET_POKEMONS)
```

- useQuery the first argument will be
  - GET_POKEMONS
  - it doesn't exist yet,
  - but it will be a GraphQL string
  - with a query inside
  - saying inside that string we want the Pokemons back
  - then start providing fields
  - fields like: the name of the Pokemon, the health, attributes, etc.

```jsx
const { data: { pokemons = [] } = {} } = useQuery(GET_POKEMONS, {
  variables: { first: 9 },
})
```

- the second argument
  - variables
  - e.g. if you are using pagination, and you want the information from the second page you could put
    - `{ variables: { page: 2 } }`
  - we will request the first 9
  - instead of 100 which would make the app very slow

`<Pokemon />` (component)

```jsx
<div className="container">
  {pokemons &&
    pokemons.map((pokemon) => <Pokemon key={pokemon.id} pokemon={pokemon} />)}
</div>
```

- && means if we have a truthy value, go ahead and do everything on the right hand side, or
  - pokemons ok? ok do this.... (even if it's empty)
- .map() will loop through all the of the pokemons
- and pass each pokemon to the `<Pokemon />` component
- REMEMBER in React you must always pass a key prop
  - so we use pokemons id for this, like `key={pokemon.id}`
  - and we also pass `pokemon={pokemon}` as a prop too

## Adding a GrapQL query and creating our Pokemon component

the below GraphQL query is used to facilitate, data coming back to our Front-end

`/graphql/get-pokemons.js`

```jsx
import gql from 'graphql-tag'
// this is a string

export const GET_POKEMONS = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name
      image
      maxHP
      maxCP
      attacks {
        special {
          name
          damage
        }
      }
    }
  }
`
```

When we start working with variables, we need to do three things:

1. Replace the static value in the query with `$variableName`
2. Declare `$variableName` as one of the variables accepted by the query
3. Pass `variableName: value` in the separate, transport-specific (usually JSON) variables dictionary
4.

Check out [graphql docs](https://graphql.org/learn/queries/#variables) for more info on how it works

next we setup the Pokemon component

```jsx
import React from 'react'

export function Pokemon({ pokemon }) {
  return (
    <div className="pokemon">
      <div className="pokemon__name">
        <h1>{pokemon.name}</h1>
      </div>
      <div className="pokemon__meta">
        <span>{pokemon.maxHP}</span>
        <span>{pokemon.maxCP}</span>
      </div>
      <div className="pokemon__image">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <div className="pokemon__attacks"></div>
    </div>
  )
}
```

and for the attacks we need to map it, i gave it a try first

```jsx
<div className="pokemon__attacks">
  <ul>
    {pokemon.attacks.special.map((attacks, index) => (
      <li key={index}>
        {attacks.name} | {attacks.damage}
      </li>
    ))}
  </ul>
</div>
```

- it worked!
- but lets see some other versions..
- we can make it better with slice() and only request 3 instead of all, and we can use a combination of the attack name and damage to make a key

```jsx
{
  pokemon.attacks.special.slice(0, 3).map((attacks) => (
    <span key={`${attacks.name}-${attacks.damage}`}>
      {attacks.name} | {attacks.damage}
    </span>
  ))
}
```
