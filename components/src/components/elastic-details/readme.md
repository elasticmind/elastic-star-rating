# elastic-details



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description | Type                         | Default     |
| ----------- | ------------ | ----------- | ---------------------------- | ----------- |
| `maxRating` | `max-rating` |             | `number`                     | `undefined` |
| `ratings`   | --           |             | `{ [key: string]: number; }` | `undefined` |


## Dependencies

### Used by

 - [elastic-star-rating](../elastic-star-rating)

### Depends on

- [elastic-loader](../elastic-loader)

### Graph
```mermaid
graph TD;
  elastic-details --> elastic-loader
  elastic-star-rating --> elastic-details
  style elastic-details fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
