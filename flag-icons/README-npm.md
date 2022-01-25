# Onramper flag icons
This package has flag icons exported from SVG as React components.

## Aggregators
Additional components are constructed to render a specific icon based on a given name, which can be an ISO code for a country or a fiat currency. In the case of the fiat currency ISO code, the flag that is rendered is of the country that issues the given currency.  

For example, both of the following components should render the flag of United Kindom: 
````javascript
<CountryIcon name="UK" />
<CurrencyIcon name="GBP" />
````