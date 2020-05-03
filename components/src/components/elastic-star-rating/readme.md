# elastic-star-rating



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description | Type     | Default |
| ----------- | ------------ | ----------- | -------- | ------- |
| `maxRating` | `max-rating` |             | `number` | `5`     |


## Dependencies

### Depends on

- [elastic-star](../elastic-star)
- [elastic-stars](../elastic-stars)
- [elastic-loader](../elastic-loader)
- [elastic-details](../elastic-details)

### Graph
```mermaid
graph TD;
  elastic-star-rating --> elastic-star
  elastic-star-rating --> elastic-stars
  elastic-star-rating --> elastic-loader
  elastic-star-rating --> elastic-details
  elastic-stars --> elastic-star
  elastic-details --> elastic-loader
  style elastic-star-rating fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
