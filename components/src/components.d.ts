/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface ElasticStarRating {
    }
}
declare global {
    interface HTMLElasticStarRatingElement extends Components.ElasticStarRating, HTMLStencilElement {
    }
    var HTMLElasticStarRatingElement: {
        prototype: HTMLElasticStarRatingElement;
        new (): HTMLElasticStarRatingElement;
    };
    interface HTMLElementTagNameMap {
        "elastic-star-rating": HTMLElasticStarRatingElement;
    }
}
declare namespace LocalJSX {
    interface ElasticStarRating {
    }
    interface IntrinsicElements {
        "elastic-star-rating": ElasticStarRating;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "elastic-star-rating": LocalJSX.ElasticStarRating & JSXBase.HTMLAttributes<HTMLElasticStarRatingElement>;
        }
    }
}
