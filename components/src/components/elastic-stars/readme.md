# elastic-stars



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description | Type     | Default     |
| ----------- | ------------ | ----------- | -------- | ----------- |
| `maxRating` | `max-rating` |             | `number` | `undefined` |
| `value`     | `value`      |             | `number` | `undefined` |


## Events

| Event  | Description | Type                  |
| ------ | ----------- | --------------------- |
| `rate` |             | `CustomEvent<number>` |


## Dependencies

### Used by

 - [elastic-star-rating](../elastic-star-rating)

### Depends on

- [elastic-star](../elastic-star)

### Graph
```mermaid
graph TD;
  elastic-stars --> elastic-star
  elastic-star-rating --> elastic-stars
  style elastic-stars fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
